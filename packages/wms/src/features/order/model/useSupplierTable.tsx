import { getFilterValue, useTable } from "@/shared";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useMemo } from "react";
import { useSuppliers } from "./queryHooks";
import { SupplierFilter } from "./types";

export const useSupplierTable = (columnFilters?: ColumnFiltersState) => {
  // 서버사이드 필터링에서만 사용
  const filter: SupplierFilter | undefined = useMemo(() => {
    if (!columnFilters || columnFilters.length === 0) return undefined;

    const businessNumber = getFilterValue(columnFilters, "businessNumber");

    return {
      businessNumber,
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

  const { data, isFetched, isPending, isError, error, refetch } = useSuppliers(
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
    isError,
    error,
    refetch,
  };
};
