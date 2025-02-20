import { BaseTable, TableParams } from "@/shared";
import { OutboundLoadingResponseDto } from "../../model";
import { createColumnHelper, FilterFn } from "@tanstack/react-table";

const columnHelper = createColumnHelper<OutboundLoadingResponseDto>();

const dateFilterFn: FilterFn<OutboundLoadingResponseDto> = (
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
  }),
  columnHelper.accessor("outboundPackingNumber", {
    header: "출고패킹번호",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("outboundLoadingNumber", {
    header: "출하상차번호",
    cell: (row) => row.getValue(),
    filterFn: "includesString",
  }),
  columnHelper.accessor("outboundLoadingDate", {
    header: "출하상차날짜",
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

interface OutboundLoadingTableProps {
  tableParams: Omit<TableParams<OutboundLoadingResponseDto>, "columns">;
}

export const OutboundLoadingTable = ({
  tableParams,
}: OutboundLoadingTableProps) => {
  return (
    <>
      <BaseTable tableParams={{ ...tableParams, columns: defaultColumns }} />
    </>
  );
};
