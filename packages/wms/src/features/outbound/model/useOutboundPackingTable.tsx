import { ColumnFiltersState } from "@tanstack/react-table";
import { useOutboundPackings } from "./queryHooks";
import { useOutboundTable } from "./useOutboundTable";

export const useOutboundPackingTable = (columnFilters?: ColumnFiltersState) => {
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
    outboundNumberKey: "outboundPackingNumber",
    outboundDateKey: "outboundPackingDate",
  });

  const { data, isFetched, isPending, isError, error, refetch } =
    useOutboundPackings(pagination.pageIndex, sort, filter);

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
