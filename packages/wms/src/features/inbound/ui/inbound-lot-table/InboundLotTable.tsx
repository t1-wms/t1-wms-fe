import { BaseTable, createPageResponse } from "@/shared";
import { InboundLotDto, useInboundLotTable } from "../../model";

interface InboundLotTableProps {
  data: InboundLotDto[];
}

export const InboundLotTable = ({ data }: InboundLotTableProps) => {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    defaultColumns,
  } = useInboundLotTable();

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
        isClientSide
      />
    </>
  );
};
