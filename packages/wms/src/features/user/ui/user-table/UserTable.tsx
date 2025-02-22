import { BaseTable, CheckBox, MainSelect, toRole, UserRole } from "@/shared";
import { useQueryClient } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import {
  UserListDto,
  UserTableParams,
  useUpdateActive,
  useUpdateUserRole,
} from "../../model";

const columnHelper = createColumnHelper<UserListDto>();

interface UserTableProps {
  tableParams: Omit<UserTableParams, "columns">;
}

export const UserTable = ({ tableParams }: UserTableProps) => {
  const { pagination, sort, filter } = tableParams;

  const queryClient = useQueryClient();

  const { mutate: updateActive } = useUpdateActive(
    queryClient,
    pagination.pageIndex,
    sort,
    filter
  );

  const { mutate: updateUserRole } = useUpdateUserRole(
    queryClient,
    pagination.pageIndex,
    sort,
    filter
  );

  const defaultColumns = useMemo(() => {
    return [
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
        filterFn: "includesString",
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
        cell: (row) => {
          console.log(row.getValue());
          return (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CheckBox
                type="checkbox"
                defaultChecked={row.getValue()}
                onChange={() =>
                  updateActive({
                    staffNumber: row.row.getValue("staffNumber"),
                    isActive: !row.row.getValue("isActive"),
                  })
                }
              />
            </div>
          );
        },
      }),
      columnHelper.accessor("userRole", {
        header: "권한",
        cell: (row) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MainSelect
              width="100px"
              onChange={(e) => {
                updateUserRole({
                  staffNumber: row.row.getValue("staffNumber"),
                  newRole: toRole(e.target.value as UserRole),
                });
              }}
              defaultValue={row.getValue()}
              options={[
                { value: "작업자", display: "작업자" },
                { value: "관리자", display: "관리자" },
                { value: "공급업체", display: "공급업체" },
              ]}
              error={null}
            />
          </div>
        ),
      }),
      columnHelper.accessor("birthDate", {
        header: "생일",
        cell: (row) => row.getValue(),
      }),
    ];
  }, [updateActive]);

  return (
    <>
      <BaseTable
        tableParams={{
          ...tableParams,
          columns: defaultColumns,
        }}
      />
    </>
  );
};
