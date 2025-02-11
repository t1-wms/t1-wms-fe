import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import styles from "./BaseTable.module.css";
import { PageResponse } from "@shared/api/TestApi";
import { Dispatch, SetStateAction } from "react";
import SortAscIcon from "@assets/sort-asc.svg?react";
import SortDescIcon from "@assets/sort-desc.svg?react";
import { Pagination } from "@shared/pagination";

interface BaseTableProps<TData> {
  serverSide?: boolean;
  data?: PageResponse<TData>;
  columns: ColumnDef<TData, any>[];
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  sorting: SortingState;
  setSorting: Dispatch<SetStateAction<SortingState>>;
  rowSelection: RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
}

export const BaseTable = <TData extends unknown>({
  serverSide = false,
  data,
  columns,
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
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: !serverSide ? getPaginationRowModel() : undefined,
    getSortedRowModel: !serverSide ? getSortedRowModel() : undefined,
    rowCount: data && serverSide ? data.pagination.totalItems : undefined,
    pageCount: data && serverSide ? data.pagination.totalPages : undefined,
    state: {
      pagination,
      sorting,
      rowSelection,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    enableMultiRowSelection: false,
  });

  console.log(sorting);

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
