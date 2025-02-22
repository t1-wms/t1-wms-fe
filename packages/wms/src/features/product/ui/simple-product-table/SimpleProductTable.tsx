import { ProductListDto } from "@/entities";
import { BaseTable, createPageResponse } from "@/shared";
import { useSimpleProducts, useSimpleProductTable } from "../../model";

interface SimpleProductTableProps {
  onClickAdd: (product: ProductListDto) => void;
}

export const SimpleProductTable = ({ onClickAdd }: SimpleProductTableProps) => {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    defaultColumns,
  } = useSimpleProductTable(onClickAdd);

  const { data, isLoading, isPending, isError, error, refetch } =
    useSimpleProducts();

  return (
    <>
      <BaseTable
        tableParams={{
          data: createPageResponse(data),
          columns: defaultColumns,
          pagination,
          setPagination,
          sorting,
          setSorting,
          rowSelection,
          setRowSelection,
          isLoading,
          isPending,
          isError,
          error,
          refetch,
        }}
        isClientSide
      />
    </>
  );
};
