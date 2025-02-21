import { useTable } from "@/shared";
import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { ProductInSupplierDto } from "@/features/order";

const columnHelper = createColumnHelper<ProductInSupplierDto>();

export const useSupplierProductTable = () => {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
  } = useTable();

  const defaultColumns = useMemo(() => {
    return [
      columnHelper.accessor("productId", {
        header: "품목 ID",
        cell: (row) => row.getValue(),
      }),
      columnHelper.accessor("productCode", {
        header: "품목 코드",
        cell: (row) => row.getValue(),
      }),
      columnHelper.accessor("productName", {
        header: "품목 이름",
        cell: (row) => row.getValue(),
      }),
    ];
  }, []);

  return {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    defaultColumns,
  };
};
