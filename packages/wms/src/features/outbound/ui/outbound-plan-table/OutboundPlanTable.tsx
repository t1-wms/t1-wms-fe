import { BaseTable } from "@/shared";
import { useOutboundPlanTable } from "../../model";
import { ColumnFiltersState } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

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
  } = useOutboundPlanTable(columnFilters, setColumnFilters, isServerSide);

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
    </>
  );
};
