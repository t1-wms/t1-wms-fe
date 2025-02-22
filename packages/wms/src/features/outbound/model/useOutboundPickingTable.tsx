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

  const { data, isFetched, isLoading, isPending, isError, error, refetch } =
    useOutboundPickings(pagination.pageIndex, sort, filter);

  return {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    data,
    isLoading,
    isFetched,
    isPending,
    isError,
    error,
    refetch,
  };
};
