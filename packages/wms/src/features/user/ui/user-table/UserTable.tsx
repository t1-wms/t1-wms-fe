import { BaseTable } from "@/shared";
import { useUserTable } from "../../model/useUserTable";
import { ColumnFiltersState } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

interface UserTableProps {
  isServerSide: boolean;
  columnFilters: ColumnFiltersState;
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
}

export const UserTable = ({
  isServerSide,
  columnFilters,
  setColumnFilters,
}: UserTableProps) => {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    pagedUsers,
    defaultColumns,
  } = useUserTable(columnFilters, setColumnFilters, isServerSide);

  return (
    <>
      <BaseTable
        serverSide={isServerSide}
        data={pagedUsers}
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
