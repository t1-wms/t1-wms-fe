import { BaseTable, PageResponse, TableParams } from "@/shared";
import { createColumnHelper, FilterFn } from "@tanstack/react-table";
import { OrderResponseDto } from "../../model";

const columnHelper = createColumnHelper<OrderResponseDto>();

const dateFilterFn: FilterFn<OrderResponseDto> = (
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
  columnHelper.accessor("orderNumber", {
    header: "발주번호",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("orderDate", {
    header: "발주날짜",
    cell: (row) => row.getValue(),
    filterFn: dateFilterFn,
  }),
  columnHelper.accessor("deliveryDeadline", {
    header: "납품기한",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("orderStatus", {
    header: "발주상태",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("isReturnOrder", {
    header: "재발주 여부",
    cell: (row) => (row.getValue() ? "Y" : "N"),
  }),
];

interface OrderTableProps {
  tableParams: Omit<
    TableParams<OrderResponseDto, PageResponse<OrderResponseDto>>,
    "columns"
  >;
}

export const ReceivedOrderTable = ({ tableParams }: OrderTableProps) => {
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
