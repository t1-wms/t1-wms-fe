import { ColumnFiltersState } from "@tanstack/react-table";
import { useOutboundLoadings } from "./queryHooks";
import { useOutboundTable } from "./useOutboundTable";

export const useOutboundLoadingTable = (columnFilters?: ColumnFiltersState) => {
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
    outboundNumberKey: "outboundLoadingNumber",
    outboundDateKey: "outboundLoadingDate",
  });

  const { data, isFetched, isLoading, isPending, isError, error, refetch } =
    useOutboundLoadings(pagination.pageIndex, sort, filter);

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
