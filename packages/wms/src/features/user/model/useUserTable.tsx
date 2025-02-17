import {
  CheckBox,
  getFilterValue,
  MainSelect,
  PageResponse,
  useTable,
} from "@/shared";
import { useQueryClient } from "@tanstack/react-query";
import {
  createUseUsersQueryKey,
  useUpdateActive,
  useUsers,
} from "./queryHooks";
import { UserFilter, UserListDto } from "./types";
import { useMemo } from "react";
import { ColumnFiltersState, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<UserListDto>();

export const useUserTable = (
  columnFilters: ColumnFiltersState,
  isServerSide: boolean,
  totalElements: number
) => {
  const filter: UserFilter | undefined = useMemo(() => {
    if (!columnFilters || columnFilters.length === 0) return undefined;

    const staffNumber = getFilterValue(columnFilters, "staffNumber");

    return {
      staffNumber,
    };
  }, [columnFilters]);

  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    sort,
  } = useTable();

  const { data } = useUsers(
    isServerSide,
    pagination.pageIndex,
    sort,
    filter,
    totalElements
  );

  const queryClient = useQueryClient();

  const { mutate } = useUpdateActive((userId: number) => {
    queryClient.setQueryData<PageResponse<UserListDto>>(
      createUseUsersQueryKey(isServerSide, pagination.pageIndex, sort),
      (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: oldData.content.map((user) =>
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
    data,
    defaultColumns,
  };
};
