import { ColumnFiltersState } from "@tanstack/react-table";
import { useInboundPutAways } from "./queryHooks";
import { useInboundTable } from "./useInboundTable";

export const useInboundPutAwayTable = (columnFilters?: ColumnFiltersState) => {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    filter,
    sort,
  } = useInboundTable({
    columnFilters,
    inboundNumberKey: "putAwayNumber",
    inboundDateKey: "putAwayDate",
  });

  const { data, isFetched, isLoading, isPending, isError, error, refetch } =
    useInboundPutAways(pagination.pageIndex, sort, filter);

  return {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    data,
    isFetched,
    isLoading,
    isPending,
    isError,
    error,
    refetch,
  };
};
