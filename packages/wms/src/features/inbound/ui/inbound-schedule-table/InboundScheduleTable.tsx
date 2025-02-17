import { BaseTable } from "@/shared";
import {
  ColumnFiltersState,
  createColumnHelper,
  FilterFn,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  InboundScheduleResponseDto,
  useInboundSchedules,
  useInboundTable,
} from "../../model";

interface InboundScheduleTableProps {
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  isServerSide: boolean;
  onChangeSelectedRow: (rowId: InboundScheduleResponseDto | null) => void;
  totalElements: number;
}

const columnHelper = createColumnHelper<InboundScheduleResponseDto>();

const dateFilterFn: FilterFn<InboundScheduleResponseDto> = (
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
  columnHelper.accessor("scheduleDate", {
    header: "입하예정날짜",
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

export const InboundScheduleTable = ({
  columnFilters,
  setColumnFilters,
  isServerSide,
  onChangeSelectedRow,
  totalElements,
}: InboundScheduleTableProps) => {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    data,
  } = useInboundTable({
    columnFilters,
    isServerSide,
    inboundNumberKey: "inboundScheduleNumber",
    inboundDateKey: "inboundScheduleDate",
    totalElements,
    useData: useInboundSchedules,
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
