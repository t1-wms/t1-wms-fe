import { ProductFilter } from "@/features/product";
import { getFilterValue, useTable } from "@/shared";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useMemo } from "react";
import { useProductThresholds } from "./queryHooks";

export const useProductThresholdTable = (columnFilters: ColumnFiltersState) => {
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

  const { data, isFetched, isLoading, isPending, isError, error, refetch } =
    useProductThresholds(pagination.pageIndex, sort, filter);

  return {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    data,
    isFetched,
    isLoading,
    isPending,
    isError,
    error,
    refetch,
  };
};
