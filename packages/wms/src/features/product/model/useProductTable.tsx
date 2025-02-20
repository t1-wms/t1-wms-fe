import { getFilterValue, useTable } from "@/shared";
import { useMemo } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";
import { ProductFilter } from "./types";
import { useProducts } from "./queryHooks";

export const useProductTable = (columnFilters: ColumnFiltersState) => {
  // 서버사이드 필터링에서만 사용
  const filter: ProductFilter | undefined = useMemo(() => {
    if (!columnFilters || columnFilters.length === 0) return undefined;

    const productCode = getFilterValue(columnFilters, "productCode");

    return {
      productCode,
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

  const { data, isPending, isError, error, refetch } = useProducts(
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
    isPending,
    isError,
    error,
    refetch,
  };
};
