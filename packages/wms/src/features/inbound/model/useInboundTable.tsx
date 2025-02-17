import { getFilterValue, Sort, useTable } from "@/shared";
import { useMemo } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";
import { InboundFilter } from "./types";
import { UseSuspenseQueryResult } from "@tanstack/react-query";

interface UseInboundTableParams<InboundResponseDto> {
  columnFilters?: ColumnFiltersState;
  isServerSide: boolean;
  inboundNumberKey: string;
  inboundDateKey: string;
  totalElements: number;
  useData: (
    isServerSide: boolean,
    page?: number,
    sort?: Sort,
    filter?: InboundFilter,
    size?: number
  ) => UseSuspenseQueryResult<InboundResponseDto>;
}

export const useInboundTable = <InboundResponseDto extends unknown>({
  columnFilters,
  isServerSide,
  inboundDateKey,
  inboundNumberKey,
  totalElements,
  useData,
}: UseInboundTableParams<InboundResponseDto>) => {
  // 서버사이드 필터링에서만 사용
  const filter: InboundFilter | undefined = useMemo(() => {
    if (!columnFilters || columnFilters.length === 0) return undefined;

    const inboundNumber = getFilterValue(columnFilters, inboundNumberKey);
    const inboundDate = getFilterValue(columnFilters, inboundDateKey);
    const startDate = inboundDate?.split(",")[0];
    const endDate = inboundDate?.split(",")[1];

    return {
      number: inboundNumber,
      startDate,
      endDate,
    };
  }, [columnFilters, inboundNumberKey, inboundDateKey]);

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
    pagination.pageIndex,
    sort,
    filter,
    totalElements
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
