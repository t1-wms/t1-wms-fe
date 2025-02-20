import { BaseTable, TableParams } from "@/shared";
import { createColumnHelper, FilterFn } from "@tanstack/react-table";
import { OutboundAssignResponseDto } from "../../model";

const columnHelper = createColumnHelper<OutboundAssignResponseDto>();

const dateFilterFn: FilterFn<OutboundAssignResponseDto> = (
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
    filterFn: "includesString",
  }),
  columnHelper.accessor("outboundAssignDate", {
    header: "출고예정날짜",
    cell: (row) => row.getValue(),
    filterFn: dateFilterFn,
  }),
  columnHelper.accessor("process", {
    header: "진행상태",
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

interface OutboundAssignTableProps {
  tableParams: Omit<TableParams<OutboundAssignResponseDto>, "columns">;
}

export const OutboundAssignTable = ({
  tableParams,
}: OutboundAssignTableProps) => {
  return (
    <>
      <BaseTable tableParams={{ ...tableParams, columns: defaultColumns }} />
    </>
  );
};
