import { BaseTable } from "@/shared";
import { useUserTable } from "../../model/useUseTable";

export const UserTable = () => {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    isServerSide,
    pagedUsers,
    defaultColumns,
  } = useUserTable();

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
      />
    </>
  );
};
