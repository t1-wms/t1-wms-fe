import { useTable } from "@/shared";
import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { ProductListDto } from "@/entities";

const columnHelper = createColumnHelper<ProductListDto>();

export const useOutboundProductTable = () => {
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
      columnHelper.accessor("productCount", {
        header: "품목 개수",
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
