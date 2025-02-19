import { useInboundCheckProductTable } from "../../model";
import { InboundCheckProductListDto } from "@/features";
import { BaseTable, createPageResponse } from "@/shared";

interface InboundCheckProductTableProps {
  data: InboundCheckProductListDto[];
  canCount?: boolean;
  onChangeProductCount?: (productId: number, defectiveCount: number) => void;
  hasMinHeight?: boolean;
}

export const InboundCheckProductTable = ({
  data,
  canCount,
  onChangeProductCount,
  hasMinHeight,
}: InboundCheckProductTableProps) => {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    defaultColumns,
  } = useInboundCheckProductTable(canCount, onChangeProductCount);

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
