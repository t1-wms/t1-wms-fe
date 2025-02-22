import { ProductListDto } from "@/entities";
import { BaseTable, createPageResponse } from "@/shared";
import { useOutboundProductTable } from "../../model";

interface OutboundProductTableProps {
  data: ProductListDto[];
  canCount?: boolean;
  onChangeProductCount?: (productId: number, productCount: number) => void;
  hasMinHeight?: boolean;
}

export const OutboundProductTable = ({
  data,
  canCount,
  onChangeProductCount,
  hasMinHeight,
}: OutboundProductTableProps) => {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    defaultColumns,
  } = useOutboundProductTable(canCount, onChangeProductCount);

  const pagedData = createPageResponse(data);

  return (
    <>
      <BaseTable
        tableParams={{
          data: pagedData,
          columns: defaultColumns,
          pagination: pagination,
          setPagination: setPagination,
          sorting: sorting,
          setSorting: setSorting,
          rowSelection: rowSelection,
          setRowSelection: setRowSelection,
          isLoading: false,
          isPending: false,
          isError: false,
          error: null,
        }}
        hasMinHeight={hasMinHeight}
        isClientSide
      />
    </>
  );
};
