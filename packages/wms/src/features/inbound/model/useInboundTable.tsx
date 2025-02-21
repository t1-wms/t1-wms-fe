import { getFilterValue, useTable } from "@/shared";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useMemo } from "react";
import { InboundFilter } from "./types";

interface UseInboundTableParams {
  columnFilters?: ColumnFiltersState;
  inboundNumberKey: string;
  inboundDateKey: string;
}

export const useInboundTable = ({
  columnFilters,
  inboundDateKey,
  inboundNumberKey,
}: UseInboundTableParams) => {
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

  return {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    filter,
    sort,
  };
};
