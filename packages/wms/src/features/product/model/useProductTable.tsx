import { getFilterValue, PageResponse, Sort, useTable } from "@/shared";
import { useMemo } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";
import { ProductFilter, ProductResponseDto } from "./types";
import { UseSuspenseQueryResult } from "@tanstack/react-query";

interface UseProductTableParams {
  columnFilters?: ColumnFiltersState;
  isServerSide: boolean;
  totalElements: number;
  useData: (
    isServerSide: boolean,
    page?: number,
    sort?: Sort,
    filter?: ProductFilter,
    size?: number
  ) => UseSuspenseQueryResult<PageResponse<ProductResponseDto>>;
}

export const useProductTable = ({
  columnFilters,
  isServerSide,
  totalElements,
  useData,
}: UseProductTableParams) => {
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

  const { data } = useData(
    isServerSide,
    pagination.pageIndex,
    sort,
    filter,
    totalElements
  );

  return {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    data,
  };
};
