import { BaseTable, PageResponse, TableParams } from "@/shared";
import { createColumnHelper, FilterFn } from "@tanstack/react-table";
import { InboundPutAwayResponseDto } from "../../model";

const columnHelper = createColumnHelper<InboundPutAwayResponseDto>();

const dateFilterFn: FilterFn<InboundPutAwayResponseDto> = (
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
  columnHelper.accessor("scheduleNumber", {
    header: "입하예정번호",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("checkNumber", {
    header: "입하검사번호",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("putAwayNumber", {
    header: "입고적치번호",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("putAwayDate", {
    header: "입고적치날짜",
    cell: (row) => row.getValue(),
    filterFn: dateFilterFn,
  }),
  columnHelper.accessor("orderNumber", {
    header: "발주번호",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("orderDate", {
    header: "발주날짜",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("supplierName", {
    header: "납품업체",
    cell: (row) => row.getValue(),
  }),
];

interface InboundPutAwayTableProps {
  tableParams: Omit<
    TableParams<
      InboundPutAwayResponseDto,
      PageResponse<InboundPutAwayResponseDto>
    >,
    "columns"
  >;
}

export const InboundPutAwayTable = ({
  tableParams,
}: InboundPutAwayTableProps) => {
  return (
    <>
      <BaseTable
        tableParams={{
          ...tableParams,
          columns: defaultColumns,
        }}
      />
    </>
  );
};
