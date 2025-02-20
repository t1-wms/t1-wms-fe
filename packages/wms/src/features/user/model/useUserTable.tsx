import { getFilterValue, useTable } from "@/shared";
import { useUsers } from "./queryHooks";
import { UserFilter } from "./types";
import { useMemo } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

export const useUserTable = (columnFilters: ColumnFiltersState) => {
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

  const { data, isFetched, isPending } = useUsers(
    pagination.pageIndex,
    sort,
    filter
  );

  return {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    data,
    isFetched,
    isPending,
    filter,
    sort,
  };
};
