import styles from "./UserPage.module.css";
import { PageContentBox } from "@shared/page-content-box";
import {
  UserControlPanel,
  UserListDto,
  useUserCount,
  useUsers,
} from "@features/user";
import { BaseTable, useTable } from "@shared/base-table";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<UserListDto>();

const defaultColumns = [
  columnHelper.accessor("userId", {
    header: "ID",
    cell: (row) => row.getValue(),
    sortDescFirst: false,
  }),
  columnHelper.accessor("name", {
    header: "이름",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("staffNumber", {
    header: "사원번호",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("phone", {
    header: "휴대폰 번호",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("gender", {
    header: "성별",
    cell: (row) => (row.getValue() === "M" ? "남자" : "여자"),
  }),
  columnHelper.accessor("isActive", {
    header: "활성화",
    cell: (row) => <input type="checkbox" checked={row.getValue()} />,
  }),
  columnHelper.accessor("address", {
    header: "주소",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("userRole", {
    header: "권한",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("birthDate", {
    header: "생일",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("supplierId", {
    header: "납품업체",
    cell: (row) => row.getValue(),
  }),
];

export default function UserPage() {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    isServerSide,
    data: pagedUsers,
  } = useTable(useUserCount, useUsers);

  return (
    <div className={styles.container}>
      <PageContentBox>
        <UserControlPanel />
      </PageContentBox>
      <PageContentBox stretch>
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
      </PageContentBox>
    </div>
  );
}
