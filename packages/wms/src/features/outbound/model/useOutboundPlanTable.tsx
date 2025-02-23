import { ColumnFiltersState } from "@tanstack/react-table";
import { useOutboundPlans } from "./queryHooks";
import { useOutboundTable } from "./useOutboundTable";

export const useOutboundPlanTable = (columnFilters?: ColumnFiltersState) => {
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
    outboundNumberKey: "outboundScheduleNumber",
    outboundDateKey: "outboundScheduleDate",
  });

  const { data, isFetched, isLoading, isPending, isError, error, refetch } =
    useOutboundPlans(pagination.pageIndex, sort, filter);

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
