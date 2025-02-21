import { getFilterValue, useTable } from "@/shared";
import { useMemo } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";
import { OutboundFilter } from "./types";

interface UseOutboundTableParams {
  columnFilters?: ColumnFiltersState;
  outboundNumberKey: string;
  outboundDateKey: string;
}

export const useOutboundTable = ({
  columnFilters,
  outboundDateKey,
  outboundNumberKey,
}: UseOutboundTableParams) => {
  const filter: OutboundFilter | undefined = useMemo(() => {
    if (!columnFilters || columnFilters.length === 0) return undefined;

    const outboundNumber = getFilterValue(columnFilters, outboundNumberKey);
    const outboundDate = getFilterValue(columnFilters, outboundDateKey);
    const startDate = outboundDate?.split(",")[0];
    const endDate = outboundDate?.split(",")[1];

    return {
      number: outboundNumber,
      startDate,
      endDate,
    };
  }, [columnFilters, outboundNumberKey, outboundDateKey]);

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
