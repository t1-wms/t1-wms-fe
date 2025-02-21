import { BaseTable, PageResponse, TableParams } from "@/shared";
import { createColumnHelper, FilterFn } from "@tanstack/react-table";
import { SupplierResponseDto } from "../../model";

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
    header: "사업자등록번호",
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

interface SupplierTableProps {
  tableParams: Omit<
    TableParams<SupplierResponseDto, PageResponse<SupplierResponseDto>>,
    "columns"
  >;
}

export const SupplierTable = ({ tableParams }: SupplierTableProps) => {
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
