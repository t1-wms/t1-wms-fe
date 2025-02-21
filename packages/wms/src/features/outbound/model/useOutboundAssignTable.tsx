import { ColumnFiltersState } from "@tanstack/react-table";
import { useOutboundAssigns } from "./queryHooks";
import { useOutboundTable } from "./useOutboundTable";

export const useOutboundAssignTable = (columnFilters?: ColumnFiltersState) => {
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
    outboundNumberKey: "outboundAssignNumber",
    outboundDateKey: "outboundAssignDate",
  });

  const { data, isFetched, isPending, isError, error, refetch } =
    useOutboundAssigns(pagination.pageIndex, sort, filter);

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
    isError,
    error,
    refetch,
  };
};
