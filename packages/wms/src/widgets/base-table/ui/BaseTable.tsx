import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import styles from "./BaseTable.module.css";
import { PageResponse } from "@shared/api/TestApi";
import { Dispatch, SetStateAction } from "react";

interface BaseTableProps<TData> {
  serverSide?: boolean;
  data: PageResponse<TData>;
  columns: ColumnDef<TData, any>[];
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}

export const BaseTable = <TData extends unknown>({
  serverSide = false,
  data,
  columns,
  pagination,
  setPagination,
}: BaseTableProps<TData>) => {
  const table = useReactTable<TData>({
    data: data.data,
    columns,
    manualPagination: serverSide,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: !serverSide ? getPaginationRowModel() : undefined,
    rowCount: serverSide ? data.pagination.totalItems : undefined,
    pageCount: serverSide ? data.pagination.totalPages : undefined,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

  return (
    <div className={styles.container}>
      <table>
        <thead className="font-r-md">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
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
