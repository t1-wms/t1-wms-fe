import { getFilterValue, Sort, useTable } from "@/shared";
import { useMemo } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";
import { OutboundFilter } from "./types";
import { UseSuspenseQueryResult } from "@tanstack/react-query";

interface UseOutboundTableParams<OutboundResponseDto> {
  columnFilters?: ColumnFiltersState;
  isServerSide: boolean;
  outboundNumberKey: string;
  outboundDateKey: string;
  useData: (
    isServerSide: boolean,
    page?: number,
    sort?: Sort,
    filter?: OutboundFilter
  ) => UseSuspenseQueryResult<OutboundResponseDto>;
}

export const useOutboundTable = <OutboundResponseDto extends unknown>({
  columnFilters,
  isServerSide,
  outboundDateKey,
  outboundNumberKey,
  useData,
}: UseOutboundTableParams<OutboundResponseDto>) => {
  // 서버사이드 필터링에서만 사용
  const filter: OutboundFilter | undefined = useMemo(() => {
    if (!columnFilters || columnFilters.length === 0) return undefined;

    const outboundNumber = getFilterValue(columnFilters, outboundNumberKey);
    const outboundDate = getFilterValue(columnFilters, outboundDateKey);
    const startDate = outboundNumber?.split(",")[0];
    const endDate = outboundDate?.split(",")[1];

    return {
      outboundNumber,
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
