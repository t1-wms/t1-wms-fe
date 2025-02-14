import { BaseDrawer, BaseTable } from "@/shared";
import { useOutboundPlanTable } from "../../model";
import { ColumnFiltersState } from "@tanstack/react-table";
import { Dispatch, SetStateAction, useMemo } from "react";
import { OutboundProductTable } from "@/features/product/ui";

interface OutboundPlanTableProps {
  columnFilters: ColumnFiltersState;
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
  isServerSide: boolean;
}

export const OutboundPlanTable = ({
  columnFilters,
  setColumnFilters,
  isServerSide,
}: OutboundPlanTableProps) => {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    data,
    defaultColumns,
  } = useOutboundPlanTable(columnFilters, isServerSide);

  const selectedId = useMemo(() => {
    return (
      Object.keys(rowSelection).length > 0 &&
      parseInt(Object.keys(rowSelection)[0])
    );
  }, [rowSelection]);

  return (
    <>
      <BaseTable
        serverSide={isServerSide}
        data={data}
        columns={defaultColumns}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        pagination={pagination}
        setPagination={setPagination}
        sorting={sorting}
        setSorting={setSorting}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
      {(selectedId || selectedId === 0) && (
        <BaseDrawer
          title={`${data.data[selectedId].outboundScheduleNumber} 출고예정품목`}
          onClose={() => setRowSelection({})}
        >
          <OutboundProductTable data={data.data[selectedId].productList} />
        </BaseDrawer>
      )}
    </>
  );
};
