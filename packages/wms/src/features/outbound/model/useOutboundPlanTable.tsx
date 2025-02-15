import { getFilterValue, useTable } from "@/shared";
import { useMemo } from "react";
import {
  ColumnFiltersState,
  createColumnHelper,
  FilterFnOption,
} from "@tanstack/react-table";
import { OutboundFilter, OutboundPlanResponseDto } from "./types";
import { createUseOutboundPlansQueryKey, useOutboundPlans } from "./queryHooks";

const columnHelper = createColumnHelper<OutboundPlanResponseDto>();
const dateFilterFn: FilterFnOption<OutboundPlanResponseDto> = (
  row,
  columnId,
  filterValue: string
) => {
  const [startDate, endDate] = filterValue.split(",");

  const date = Date.parse(row.getValue(columnId));

  if (startDate.length > 0 && endDate.length > 0)
    return date >= Date.parse(startDate) && date <= Date.parse(endDate);
  else if (startDate.length > 0) return date >= Date.parse(startDate);
  else if (endDate.length > 0) return date <= Date.parse(endDate);

  return true;
};

export const useOutboundPlanTable = (
  columnFilters: ColumnFiltersState,
  isServerSide: boolean
) => {
  // 서버사이드 필터링에서만 사용
  const filter: OutboundFilter | undefined = useMemo(() => {
    if (!columnFilters || columnFilters.length === 0) return undefined;

    const outboundScheduleNumber = getFilterValue(
      columnFilters,
      "outboundScheduleNumber"
    );
    const outboundScheduleDate = getFilterValue(
      columnFilters,
      "outboundScheduleDate"
    );
    const startDate = outboundScheduleDate?.split(",")[0];
    const endDate = outboundScheduleDate?.split(",")[1];

    return {
      outboundScheduleNumber,
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

  const queryKey = createUseOutboundPlansQueryKey(
    isServerSide,
    pagination.pageIndex + 1,
    sort,
    filter
  );

  const { data } = useOutboundPlans(
    isServerSide,
    pagination.pageIndex + 1,
    sort,
    filter
  );

  const defaultColumns = useMemo(() => {
    return [
      columnHelper.accessor("outboundScheduleNumber", {
        header: "출고예정번호",
        cell: (row) => row.getValue(),
        filterFn: "includesString",
      }),
      columnHelper.accessor("outboundScheduleDate", {
        header: "출고예정날짜",
        cell: (row) => row.getValue(),
        filterFn: dateFilterFn,
      }),
      columnHelper.accessor("process", {
        header: "진헹상태",
        cell: (row) => row.getValue(),
      }),
      columnHelper.accessor("productionPlanNumber", {
        header: "주문번호",
        cell: (row) => row.getValue(),
      }),
      columnHelper.accessor("planDate", {
        header: "주문날짜",
        cell: (row) => row.getValue(),
      }),
    ];
  }, []);

  return {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    data,
    defaultColumns,
    queryKey,
  };
};
