import { BaseTable, TableParams } from "@/shared";
import { OutboundPickingResponseDto } from "../../model";
import { createColumnHelper, FilterFn } from "@tanstack/react-table";

const columnHelper = createColumnHelper<OutboundPickingResponseDto>();

const dateFilterFn: FilterFn<OutboundPickingResponseDto> = (
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

const defaultColumns = [
  columnHelper.accessor("outboundScheduleNumber", {
    header: "출고예정번호",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("outboundAssignNumber", {
    header: "출고지시번호",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("outboundPickingNumber", {
    header: "출고피킹번호",
    cell: (row) => row.getValue(),
    filterFn: "includesString",
  }),
  columnHelper.accessor("outboundPickingDate", {
    header: "출고피킹날짜",
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

interface OutboundPickingTableProps {
  tableParams: Omit<TableParams<OutboundPickingResponseDto>, "columns">;
}

export const OutboundPickingTable = ({
  tableParams,
}: OutboundPickingTableProps) => {
  return (
    <>
      <BaseTable tableParams={{ ...tableParams, columns: defaultColumns }} />
    </>
  );
};
