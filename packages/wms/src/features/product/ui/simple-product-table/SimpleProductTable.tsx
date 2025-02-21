import { ProductListDto } from "@/entities";
import { useSimpleProducts, useSimpleProductTable } from "../../model";
import { BaseTable, createPageResponse } from "@/shared";

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

  const { data, isPending, isError, error, refetch } = useSimpleProducts();

  return (
    <>
      <BaseTable
        tableParams={{
          data: createPageResponse(data),
          columns: defaultColumns,
          pagination: pagination,
          setPagination: setPagination,
          sorting: sorting,
          setSorting: setSorting,
          rowSelection: rowSelection,
          setRowSelection: setRowSelection,
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
