import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import styles from "./BaseTable.module.css";
import { Dispatch, SetStateAction } from "react";
import SortAscIcon from "@assets/sort-asc.svg?react";
import SortDescIcon from "@assets/sort-desc.svg?react";
import { Pagination } from "@shared/pagination";
import { PageResponse } from "@shared/model";

interface BaseTableProps<TData> {
  serverSide: boolean;
  data: PageResponse<TData>;
  columns: ColumnDef<TData, any>[];
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  sorting: SortingState;
  setSorting: Dispatch<SetStateAction<SortingState>>;
  rowSelection: RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
  noPagination?: boolean;
}

export const BaseTable = <TData extends unknown>({
  serverSide,
  data,
  columns,
  columnFilters,
  setColumnFilters,
  pagination,
  setPagination,
  sorting,
  setSorting,
  rowSelection,
  setRowSelection,
}: BaseTableProps<TData>) => {
  const table = useReactTable<TData>({
    data: data ? data.data : [],
    columns,
    manualPagination: serverSide,
    manualSorting: serverSide,
    manualFiltering: serverSide,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: !serverSide ? getPaginationRowModel() : undefined,
    getSortedRowModel: !serverSide ? getSortedRowModel() : undefined,
    getFilteredRowModel: !serverSide ? getFilteredRowModel() : undefined,
    rowCount: serverSide ? data.pagination.totalItems : undefined,
    pageCount: serverSide ? data.pagination.totalPages : undefined,
    state: {
      pagination,
      sorting,
      rowSelection,
      columnFilters,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    autoResetPageIndex: false,
    enableMultiRowSelection: false,
  });

  return (
    <div className={styles.container}>
      <table>
        <thead className="font-r-md">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <div
                    className={`${styles["th-button"]} font-b-sm`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getCanSort() &&
                      (header.column.getIsSorted() === "asc" ? (
                        <div className={styles["icon-wrapper"]}>
                          <SortAscIcon />
                        </div>
                      ) : header.column.getIsSorted() === "desc" ? (
                        <div className={styles["icon-wrapper"]}>
                          <SortDescIcon />
                        </div>
                      ) : undefined)}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={row.getIsSelected() ? styles["selected-row"] : ""}
              onClick={row.getToggleSelectedHandler()}
            >
              {row.getAllCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={pagination.pageIndex + 1}
        size={2}
        maxPage={table.getPageCount()}
        onClickPrev={() => table.previousPage()}
        onClickNext={() => table.nextPage()}
        onClickPage={(page: number) => table.setPageIndex(page - 1)}
      />
    </div>
  );
};
