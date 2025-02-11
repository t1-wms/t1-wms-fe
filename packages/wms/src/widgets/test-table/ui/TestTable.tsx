import {
  createColumnHelper,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { Sort, TestUser, useTestCount, useTestPage } from "@shared/api/TestApi";
import { useMemo, useState } from "react";
import { BaseTable } from "@widgets/base-table/ui/BaseTable";

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
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const sort = useMemo<Sort | undefined>(() => {
    return sorting.length === 0
      ? undefined
      : {
          sortField: sorting[0].id,
          sortOrder: sorting[0].desc ? "desc" : "asc",
        };
  }, [sorting]);

  const { data: testCount } = useTestCount();

  const isServerSide = useMemo(() => {
    if (testCount === undefined) return undefined;
    else {
      return testCount.count >= 10000;
    }
  }, [testCount]);

  const { data: pagedTestUsers } = useTestPage(
    isServerSide,
    pagination.pageIndex + 1,
    sort
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
          sorting={sorting}
          setSorting={setSorting}
          serverSide={isServerSide}
        />
      )}
    </>
  );
};
