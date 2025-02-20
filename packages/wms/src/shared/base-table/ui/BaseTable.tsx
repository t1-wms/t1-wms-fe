import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
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
import { BaseTableContent } from "./BaseTableContent";

interface BaseTableProps<TData> {
  data?: PageResponse<TData>;
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
  hasMinHeight?: boolean;
  isPending: boolean;
}

export const BaseTable = <TData extends unknown>({
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
  hasMinHeight,
  isPending,
}: BaseTableProps<TData>) => {
  const table = useReactTable<TData>({
    data: data ? data.content : [],
    columns,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
    rowCount: data ? data.totalElements : 0,
    pageCount: data ? data.totalPages : 0,
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
      <div
        className={`${styles["table-wrapper"]} ${
          hasMinHeight ? styles["min-height"] : ""
        }`}
      >
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
          <BaseTableContent table={table} isPending={isPending} />
        </table>
      </div>

      <div className={styles["pagination-wrapper"]}>
        <Pagination
          currentPage={pagination.pageIndex + 1}
          size={2}
          maxPage={table.getPageCount()}
          onClickPrev={() => table.previousPage()}
          onClickNext={() => table.nextPage()}
          onClickPage={(page: number) => table.setPageIndex(page)}
        />
      </div>
    </div>
  );
};
