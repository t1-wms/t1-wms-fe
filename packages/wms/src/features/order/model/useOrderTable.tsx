import { getFilterValue, PageResponse, Sort, useTable } from "@/shared";
import { useMemo } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";
import { OrderFilter, OrderResponseDto } from "./types";
import { UseSuspenseQueryResult } from "@tanstack/react-query";

interface UseOrderTableParams {
  columnFilters?: ColumnFiltersState;
  isServerSide: boolean;
  useData: (
    isServerSide: boolean,
    page?: number,
    sort?: Sort,
    filter?: OrderFilter
  ) => UseSuspenseQueryResult<PageResponse<OrderResponseDto>>;
}

export const useOrderTable = ({
  columnFilters,
  isServerSide,
  useData,
}: UseOrderTableParams) => {
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

  const { data } = useData(
    isServerSide,
    pagination.pageIndex + 1,
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
  };
};
