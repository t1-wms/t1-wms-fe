import { CheckBox, MainSelect, PageResponse, useTable } from "@/shared";
import { useQueryClient } from "@tanstack/react-query";
import {
  createUseUsersQueryKey,
  useUpdateActive,
  useUserCount,
  useUsers,
} from "./queryHooks";
import { UserListDto } from "./types";
import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<UserListDto>();

export const useUserTable = () => {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    isServerSide,
    sort,
    data: pagedUsers,
  } = useTable(useUserCount, useUsers);

  const queryClient = useQueryClient();

  const { mutate } = useUpdateActive((userId: number) => {
    queryClient.setQueryData<PageResponse<UserListDto>>(
      createUseUsersQueryKey(isServerSide, pagination.pageIndex + 1, sort),
      (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: oldData.data.map((user) =>
            user.userId === userId
              ? { ...user, isActive: !user.isActive }
              : user
          ),
        };
      }
    );
  });

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
        cell: (row) => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CheckBox
              type="checkbox"
              defaultChecked={row.getValue()}
              onChange={() => mutate(row.row.getValue("userId"))}
            />
          </div>
        ),
      }),
      columnHelper.accessor("address", {
        header: "주소",
        cell: (row) => row.getValue(),
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
              onChange={() => mutate(row.row.getValue("userId"))}
              options={[
                { value: "ADMIN", display: "관리자" },
                { value: "WORKER", display: "작업자" },
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
      columnHelper.accessor("supplierId", {
        header: "납품업체",
        cell: (row) => row.getValue(),
      }),
    ];
  }, [mutate]);

  return {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    isServerSide,
    pagedUsers,
    defaultColumns,
  };
};
