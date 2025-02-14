import { BaseTable } from "@/shared";
import { useOutboundPlanTable } from "../../model";
import { ColumnFiltersState } from "@tanstack/react-table";
import { Dispatch, SetStateAction, useMemo } from "react";
import { OutboundPlanDrawer } from "../outbound-plan-drawer";

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
    queryKey,
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
        <OutboundPlanDrawer
          data={data.data[selectedId]}
          onClose={() => setRowSelection({})}
          queryKey={queryKey}
        />
      )}
    </>
  );
};
