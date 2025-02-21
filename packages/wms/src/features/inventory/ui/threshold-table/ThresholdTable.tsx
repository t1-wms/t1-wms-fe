import { BaseTable, PageResponse, TableParams } from "@/shared";
import { createColumnHelper } from "@tanstack/react-table";
import { ProductThresholdDto } from "../../model";

const columnHelper = createColumnHelper<ProductThresholdDto>();

const defaultColumns = [
  columnHelper.accessor("productId", {
    header: "품목 ID",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("productCode", {
    header: "품목코드",
    cell: (row) => row.getValue(),
    filterFn: "includesString",
  }),
  columnHelper.accessor("productName", {
    header: "품목이름",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("productCount", {
    header: "재고량",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("threshold", {
    header: "안전재고량",
    cell: (row) => row.getValue(),
  }),
];

interface ProductThresholdTableProps {
  tableParams: Omit<
    TableParams<ProductThresholdDto, PageResponse<ProductThresholdDto>>,
    "columns"
  >;
}

export const ThresholdTable = ({ tableParams }: ProductThresholdTableProps) => {
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
