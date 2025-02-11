import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import styles from "./BaseTable.module.css";
import { PageResponse } from "@shared/api/TestApi";
import { Dispatch, SetStateAction } from "react";
import SortAscIcon from "@assets/sort-asc.svg?react";
import SortDescIcon from "@assets/sort-desc.svg?react";

interface BaseTableProps<TData> {
  serverSide?: boolean;
  data: PageResponse<TData>;
  columns: ColumnDef<TData, any>[];
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  sorting: SortingState;
  setSorting: Dispatch<SetStateAction<SortingState>>;
}

export const BaseTable = <TData extends unknown>({
  serverSide = false,
  data,
  columns,
  pagination,
  setPagination,
  sorting,
  setSorting,
}: BaseTableProps<TData>) => {
  const table = useReactTable<TData>({
    data: data.data,
    columns,
    manualPagination: serverSide,
    manualSorting: serverSide,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: !serverSide ? getPaginationRowModel() : undefined,
    getSortedRowModel: !serverSide ? getSortedRowModel() : undefined,
    rowCount: serverSide ? data.pagination.totalItems : undefined,
    pageCount: serverSide ? data.pagination.totalPages : undefined,
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
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
            <tr key={row.id}>
              {row.getAllCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => table.previousPage()}>{"<"}</button>
      <button onClick={() => table.nextPage()}>{">"}</button>
    </div>
  );
};
