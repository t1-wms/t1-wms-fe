import { useOutboundProductTable } from "../../model";
import { ProductListDto } from "@/entities";
import { BaseTable, createPageResponse } from "@/shared";

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
        serverSide={false}
        data={pagedData}
        columns={defaultColumns}
        pagination={pagination}
        setPagination={setPagination}
        sorting={sorting}
        setSorting={setSorting}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        hasMinHeight={hasMinHeight}
      />
    </>
  );
};
