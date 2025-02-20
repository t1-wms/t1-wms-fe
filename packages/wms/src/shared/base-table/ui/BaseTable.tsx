import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styles from "./BaseTable.module.css";
import SortAscIcon from "@assets/sort-asc.svg?react";
import SortDescIcon from "@assets/sort-desc.svg?react";
import { Pagination } from "@shared/pagination";
import { BaseTableContent } from "./BaseTableContent";
import { TableParams } from "../model";

interface BaseTableProps<TData> {
  tableParams: TableParams<TData>;
  noPagination?: boolean;
  hasMinHeight?: boolean;
}

export const BaseTable = <TData extends unknown>({
  tableParams,
  hasMinHeight,
}: BaseTableProps<TData>) => {
  const {
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
    isPending,
  } = tableParams;

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
