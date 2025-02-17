import { BaseTable } from "@/shared";
import { useUserTable } from "../../model/useUserTable";
import { ColumnFiltersState } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

interface UserTableProps {
  isServerSide: boolean;
  columnFilters: ColumnFiltersState;
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
  totalElements: number;
}

export const UserTable = ({
  isServerSide,
  columnFilters,
  setColumnFilters,
  totalElements,
}: UserTableProps) => {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    data,
    defaultColumns,
  } = useUserTable(columnFilters, isServerSide, totalElements);

  return (
    <>
      <BaseTable
        serverSide={isServerSide}
        data={data}
        columns={defaultColumns}
        pagination={pagination}
        setPagination={setPagination}
        sorting={sorting}
        setSorting={setSorting}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
    </>
  );
};
