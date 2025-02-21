import { InboundLotDto } from "@/features";
import { useTable } from "@/shared";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";

const columnHelper = createColumnHelper<InboundLotDto>();

export const useInboundLotTable = () => {
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
      columnHelper.accessor("lotNumber", {
        header: "LOT 번호",
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
      columnHelper.accessor("locationBinCode", {
        header: "BIN",
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
