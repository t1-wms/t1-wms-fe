import { getFilterValue, useTable } from "@/shared";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useMemo } from "react";
import { useOrders } from "./queryHooks";
import { OrderFilter } from "./types";

export const useOrderTable = (columnFilters: ColumnFiltersState) => {
  // 서버사이드 필터링에서만 사용
  const filter: OrderFilter | undefined = useMemo(() => {
    if (!columnFilters || columnFilters.length === 0) return undefined;

    const orderNumber = getFilterValue(columnFilters, "orderNumber");
    const orderDate = getFilterValue(columnFilters, "orderDate");
    const startDate = orderDate?.split(",")[0];
    const endDate = orderDate?.split(",")[1];

    return {
      orderNumber,
      startDate,
      endDate,
    };
  }, [columnFilters]);

  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    sort,
  } = useTable();

  const { data, isFetched, isPending, isError, error, refetch } = useOrders(
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
    isError,
    error,
    refetch,
  };
};
