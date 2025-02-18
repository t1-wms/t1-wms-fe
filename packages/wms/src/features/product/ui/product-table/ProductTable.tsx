import { BaseTable } from "@/shared";
import { ColumnFiltersState, createColumnHelper } from "@tanstack/react-table";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ProductResponseDto, useProducts, useProductTable } from "../../model";

interface ProductTableProps {
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  isServerSide: boolean;
  onChangeSelectedRow: (rowId: ProductResponseDto | null) => void;
  totalElements: number;
}

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
  columnHelper.accessor("stockLotCount", {
    header: "재고량",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("locationBinCode", {
    header: "BIN",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("supplierId", {
    header: "납품업체 ID",
    cell: (row) => row.getValue(),
  }),
];

export const ProductTable = ({
  columnFilters,
  setColumnFilters,
  isServerSide,
  onChangeSelectedRow,
  totalElements,
}: ProductTableProps) => {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    data,
  } = useProductTable({
    columnFilters,
    isServerSide,
    totalElements,
    useData: useProducts,
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
