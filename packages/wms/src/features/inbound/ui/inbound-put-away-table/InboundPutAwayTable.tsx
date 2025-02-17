import { BaseTable } from "@/shared";
import {
  ColumnFiltersState,
  createColumnHelper,
  FilterFn,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  InboundPutAwayResponseDto,
  useInboundPutAways,
  useInboundTable,
} from "../../model";

interface InboundPutAwayTableProps {
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  isServerSide: boolean;
  onChangeSelectedRow: (rowId: InboundPutAwayResponseDto | null) => void;
  totalElements: number;
}

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

export const InboundPutAwayTable = ({
  columnFilters,
  setColumnFilters,
  isServerSide,
  onChangeSelectedRow,
  totalElements,
}: InboundPutAwayTableProps) => {
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
    inboundNumberKey: "checkNumber",
    inboundDateKey: "checkDate",
    totalElements,
    useData: useInboundPutAways,
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
