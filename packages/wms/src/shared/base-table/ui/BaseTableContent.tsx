import { flexRender, Table } from "@tanstack/react-table";
import styles from "./BaseTable.module.css";
import { Skeleton } from "@/shared/skeleton/ui/Skeleton";

interface BaseTableProps<TData> {
  table: Table<TData>;
  isPending: boolean;
}

export const BaseTableContent = <TData extends unknown>({
  table,
  isPending,
}: BaseTableProps<TData>) => {
  return (
    <tbody>
      {isPending
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
                  {isPending ? (
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
