import { BaseTable, PageResponse, TableParams } from "@/shared";
import { createColumnHelper } from "@tanstack/react-table";
import { ProductResponseDto } from "../../model";

const columnHelper = createColumnHelper<ProductResponseDto>();

const defaultColumns = [
  columnHelper.accessor("productCode", {
    header: "품목코드",
    cell: (row) => row.getValue(),
    filterFn: "includesString",
  }),
  columnHelper.accessor("productName", {
    header: "품목이름",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("category", {
    header: "카테고리",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("productCount", {
    header: "재고량",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("locationBinCode", {
    header: "BIN",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("supplierName", {
    header: "납품업체",
    cell: (row) => row.getValue(),
  }),
];

interface ProductTableProps {
  tableParams: Omit<
    TableParams<ProductResponseDto, PageResponse<ProductResponseDto>>,
    "columns"
  >;
}

export const ProductTable = ({ tableParams }: ProductTableProps) => {
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
