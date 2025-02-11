import { createColumnHelper, PaginationState } from "@tanstack/react-table";
import styles from "./TestTable.module.css";
import { TestUser, useTestCount, useTestPage } from "@shared/api/TestApi";
import { useMemo, useState } from "react";
import { BaseTable } from "@widgets/base-table/ui/BaseTable";

const columnHelper = createColumnHelper<TestUser>();

const defaultColumns = [
  columnHelper.accessor("id", {
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("name", {
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("email", {
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("age", {
    cell: (row) => row.getValue(),
  }),
  columnHelper.display({
    header: "활성화",
    id: "활성화",
    cell: (props) => <input type="checkbox" />,
  }),
];

export const TestTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: testCount } = useTestCount();

  const isServerSide = useMemo(() => {
    if (testCount === undefined) return undefined;
    else {
      return testCount.count > 10000;
    }
  }, [testCount]);

  const { data: pagedTestUsers } = useTestPage(
    isServerSide,
    pagination.pageIndex + 1
  );

  console.log(pagedTestUsers);

  return (
    <>
      {pagedTestUsers && (
        <BaseTable
          data={pagedTestUsers}
          columns={defaultColumns}
          pagination={pagination}
          setPagination={setPagination}
          serverSide={isServerSide}
        />
      )}
    </>
  );
};
