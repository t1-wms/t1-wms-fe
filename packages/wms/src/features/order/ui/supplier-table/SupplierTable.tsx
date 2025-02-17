import { BaseTable } from "@/shared";
import {
  ColumnFiltersState,
  createColumnHelper,
  FilterFn,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  SupplierResponseDto,
  useSuppliers,
  useSupplierTable,
} from "../../model";

interface SupplierTableProps {
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  isServerSide: boolean;
  onChangeSelectedRow: (rowId: SupplierResponseDto | null) => void;
  totalElements: number;
}

const columnHelper = createColumnHelper<SupplierResponseDto>();

const dateFilterFn: FilterFn<SupplierResponseDto> = (
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
  columnHelper.accessor("businessNumber", {
    header: "납품업체번호",
    cell: (row) => row.getValue(),
    filterFn: dateFilterFn,
  }),
  columnHelper.accessor("supplierName", {
    header: "납품업체",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("representativeName", {
    header: "대표자명",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("address", {
    header: "주소",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("supplierPhone", {
    header: "전화번호",
    cell: (row) => row.getValue(),
  }),
];

export const SupplierTable = ({
  columnFilters,
  setColumnFilters,
  isServerSide,
  onChangeSelectedRow,
  totalElements,
}: SupplierTableProps) => {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    data,
  } = useSupplierTable({
    columnFilters,
    isServerSide,
    useData: useSuppliers,
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
