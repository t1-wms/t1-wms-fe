import { ColumnFiltersState } from "@tanstack/react-table";
import { useInboundChecks } from "./queryHooks";
import { useInboundTable } from "./useInboundTable";

export const useInboundCheckTable = (columnFilters?: ColumnFiltersState) => {
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
    inboundNumberKey: "checkNumber",
    inboundDateKey: "checkDate",
  });

  const { data, isFetched, isLoading, isPending, isError, error, refetch } =
    useInboundChecks(pagination.pageIndex, sort, filter);

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
