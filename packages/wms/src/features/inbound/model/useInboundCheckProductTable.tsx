import { MainInput, useTable } from "@/shared";
import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { InboundCheckProductListDto } from "@/features";

const columnHelper = createColumnHelper<InboundCheckProductListDto>();

export const useInboundCheckProductTable = (
  canCount?: boolean,
  onChangeProductCount?: (productId: number, defectiveCount: number) => void
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
      columnHelper.accessor("productCount", {
        header: "품목 개수",
        cell: (row) => row.getValue(),
      }),
      columnHelper.accessor("defectiveCount", {
        header: "불량 개수",
        cell: canCount
          ? (row) => {
              const productId = row.row.getAllCells()[0].getValue() as number;
              return (
                <MainInput
                  width="fullWidth"
                  defaultValue={row.getValue()}
                  error={null}
                  type="number"
                  onChange={(e) => {
                    if (onChangeProductCount)
                      onChangeProductCount(productId, parseInt(e.target.value));
                  }}
                />
              );
            }
          : (row) => row.getValue(),
      }),
    ];
  }, [canCount]);

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
