import { getFilterValue, PageResponse, Sort, useTable } from "@/shared";
import { useMemo } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";
import { ProductThresholdDto } from "./types";
import { UseSuspenseQueryResult } from "@tanstack/react-query";
import { ProductFilter } from "@/features/product";

interface UseProductTableParams {
  columnFilters?: ColumnFiltersState;
  useData: (
    isServerSide: boolean,
    page?: number,
    sort?: Sort,
    filter?: ProductFilter,
    size?: number
  ) => UseSuspenseQueryResult<PageResponse<ProductThresholdDto>>;
}

export const useProductThresholdTable = ({
  columnFilters,
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

  const { data } = useData(true, pagination.pageIndex, sort, filter);

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
