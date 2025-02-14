import { useOutboundProductTable } from "../../model";
import { ProductListDto } from "@/entities";
import { BaseTable, createPageResponse } from "@/shared";

interface OutboundProductTableProps {
  data: ProductListDto[];
}

export const OutboundProductTable = ({ data }: OutboundProductTableProps) => {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    defaultColumns,
  } = useOutboundProductTable();

  const pagedData = createPageResponse(data);

  return (
    <>
      <BaseTable
        serverSide={false}
        data={pagedData}
        columns={defaultColumns}
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
