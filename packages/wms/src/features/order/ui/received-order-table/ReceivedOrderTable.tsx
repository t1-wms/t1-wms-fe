import { BaseTable } from "@/shared";
import {
  ColumnFiltersState,
  createColumnHelper,
  FilterFn,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useEffect } from "react";
import { OrderResponseDto, useOrderTable, useReceivedOrdes } from "../../model";

interface OrderTableProps {
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  isServerSide: boolean;
  onChangeSelectedRow: (rowId: OrderResponseDto | null) => void;
  totalElements: number;
}

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
  columnHelper.accessor("isReturnOrder", {
    header: "재발주 여부",
    cell: (row) => (row.getValue() ? "Y" : "N"),
  }),
];

export const ReceivedOrderTable = ({
  columnFilters,
  setColumnFilters,
  isServerSide,
  onChangeSelectedRow,
  totalElements,
}: OrderTableProps) => {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    data,
  } = useOrderTable({
    columnFilters,
    isServerSide,
    useData: useReceivedOrdes,
    totalElements,
  });

  useEffect(() => {
    const rowId =
      Object.keys(rowSelection).length > 0
        ? parseInt(Object.keys(rowSelection)[0])
        : null;

    onChangeSelectedRow(rowId || rowId === 0 ? data.content[rowId] : null);
  }, [rowSelection, onChangeSelectedRow]);

  return (
    <>
      <BaseTable
        serverSide={isServerSide}
        data={data}
        columns={defaultColumns}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        pagination={pagination}
        setPagination={setPagination}
        sorting={sorting}
        setSorting={setSorting}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
    </>
  );
};
