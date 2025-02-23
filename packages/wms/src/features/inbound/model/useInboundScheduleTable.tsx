import { ColumnFiltersState } from "@tanstack/react-table";
import { useInboundSchedules } from "./queryHooks";
import { useInboundTable } from "./useInboundTable";

export const useInboundScheduleTable = (columnFilters?: ColumnFiltersState) => {
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
    inboundNumberKey: "scheduleNumber",
    inboundDateKey: "ScheduleDate",
  });

  const { data, isFetched, isLoading, isPending, isError, error, refetch } =
    useInboundSchedules(pagination.pageIndex, sort, filter);

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
