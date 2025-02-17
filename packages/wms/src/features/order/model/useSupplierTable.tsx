import { getFilterValue, PageResponse, Sort, useTable } from "@/shared";
import { useMemo } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";
import { SupplierFilter, SupplierResponseDto } from "./types";
import { UseSuspenseQueryResult } from "@tanstack/react-query";

interface UseSupplierTableParams {
  columnFilters?: ColumnFiltersState;
  isServerSide: boolean;
  useData: (
    isServerSide: boolean,
    page?: number,
    sort?: Sort,
    filter?: SupplierFilter,
    totalElements?: number
  ) => UseSuspenseQueryResult<PageResponse<SupplierResponseDto>>;
  totalElements: number;
}

export const useSupplierTable = ({
  columnFilters,
  isServerSide,
  useData,
  totalElements,
}: UseSupplierTableParams) => {
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
