import { createColumnHelper } from "@tanstack/react-table";
import { TestUser, useTestCount, useTestPage } from "@shared/api/TestApi";
import { BaseTable } from "@shared/base-table/ui/BaseTable";
import { useTable } from "@shared/base-table";

const columnHelper = createColumnHelper<TestUser>();

const defaultColumns = [
  columnHelper.accessor("id", {
    cell: (row) => row.getValue(),
    sortDescFirst: false,
  }),
  columnHelper.accessor("name", {
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("email", {
    cell: (row) => row.getValue(),
  }),

  columnHelper.display({
    header: "활성화",
    id: "활성화",
    cell: () => <input type="checkbox" />,
  }),
];

export const TestTable = () => {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    isServerSide,
    data: pagedTestUsers,
  } = useTable(useTestCount, useTestPage);

  return (
    <>
      <BaseTable
        data={pagedTestUsers}
        columns={defaultColumns}
        pagination={pagination}
        setPagination={setPagination}
        sorting={sorting}
        setSorting={setSorting}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        serverSide={isServerSide}
      />
    </>
  );
};
