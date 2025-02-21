import { BaseTable, createPageResponse } from "@/shared";
import { ProductInSupplierDto } from "@/features/order";
import { useSupplierProductTable } from "../../model";

interface SupplierProductTableProps {
  data: ProductInSupplierDto[];
}

export const SupplierProductTable = ({ data }: SupplierProductTableProps) => {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    defaultColumns,
  } = useSupplierProductTable();

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
          isError: false,
          isPending: false,
          error: null,
        }}
        isClientSide
      />
    </>
  );
};
