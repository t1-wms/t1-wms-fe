import { BaseTable } from "@/shared";
import { ColumnFiltersState, createColumnHelper } from "@tanstack/react-table";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  ProductThresholdDto,
  useProductThresholds,
  useProductThresholdTable,
} from "../../model";

interface ProductThresholdTableProps {
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  onChangeSelectedRow?: (rowId: ProductThresholdDto | null) => void;
}

const columnHelper = createColumnHelper<ProductThresholdDto>();

export const ThresholdTable = ({
  columnFilters,
  setColumnFilters,
  onChangeSelectedRow,
}: ProductThresholdTableProps) => {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    data,
  } = useProductThresholdTable({
    columnFilters,
    useData: useProductThresholds,
  });

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

  useEffect(() => {
    if (!onChangeSelectedRow) return;
    const rowId =
      Object.keys(rowSelection).length > 0
        ? parseInt(Object.keys(rowSelection)[0])
        : null;

    onChangeSelectedRow(rowId || rowId === 0 ? data.content[rowId] : null);
  }, [rowSelection, onChangeSelectedRow]);

  return (
    <>
      <BaseTable
        serverSide={true}
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
