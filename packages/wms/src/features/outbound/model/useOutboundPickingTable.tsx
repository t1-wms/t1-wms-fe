import { ColumnFiltersState } from "@tanstack/react-table";
import { useOutboundPickings } from "./queryHooks";
import { useOutboundTable } from "./useOutboundTable";

export const useOutboundPickingTable = (columnFilters?: ColumnFiltersState) => {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    filter,
    sort,
  } = useOutboundTable({
    columnFilters,
    outboundNumberKey: "outboundPickingNumber",
    outboundDateKey: "outboundPickingDate",
  });

  const { data, isFetched, isPending } = useOutboundPickings(
    pagination.pageIndex,
    sort,
    filter
  );

  return {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    data,
    isFetched,
    isPending,
  };
};
