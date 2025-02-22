import { Skeleton } from "@/shared/skeleton/ui/Skeleton";
import { flexRender, Table } from "@tanstack/react-table";
import styles from "./BaseTable.module.css";

interface BaseTableProps<TData> {
  table: Table<TData>;
  isLoading: boolean;
}

export const BaseTableContent = <TData extends unknown>({
  table,
  isLoading,
}: BaseTableProps<TData>) => {
  return (
    <tbody>
      {isLoading
        ? Array.from({ length: 10 }, (_, i) => i).map((row) => (
            <tr key={row}>
              {table.getAllColumns().map((col) => (
                <td key={col.id}>
                  <Skeleton />
                </td>
              ))}
            </tr>
          ))
        : table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={row.getIsSelected() ? styles["selected-row"] : ""}
              onClick={row.getToggleSelectedHandler()}
            >
              {row.getAllCells().map((cell) => (
                <td key={cell.id}>
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </td>
              ))}
            </tr>
          ))}
    </tbody>
  );
};
