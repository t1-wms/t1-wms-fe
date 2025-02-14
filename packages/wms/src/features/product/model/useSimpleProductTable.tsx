import { MainButton, useTable } from "@/shared";
import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { ProductListDto } from "@/entities";

const columnHelper = createColumnHelper<ProductListDto>();

export const useSimpleProductTable = (
  onClickAdd: (product: ProductListDto) => void
) => {
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
      columnHelper.display({
        header: "추가",
        cell: (row) => {
          return (
            <MainButton
              padding="sm"
              size="sm"
              onClick={() =>
                onClickAdd({
                  productId: row.row.getAllCells()[0].getValue() as number,
                  productCode: row.row.getAllCells()[1].getValue() as string,
                  productName: row.row.getAllCells()[2].getValue() as string,
                  productCount: 0,
                })
              }
            >
              추가
            </MainButton>
          );
        },
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
