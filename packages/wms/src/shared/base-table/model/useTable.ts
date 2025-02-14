import { PageResponse, Sort } from "@shared/model";
import { UseSuspenseQueryResult } from "@tanstack/react-query";
import {
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  SortingState,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

export function useTable<T, Filter>(
  columnFilters: ColumnFiltersState,
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>,
  isServerSide: boolean,
  filter: Filter | undefined,
  useData: (
    isServerSide: boolean,
    page?: number,
    sort?: Sort,
    filter?: Filter
  ) => UseSuspenseQueryResult<PageResponse<T>, Error>
) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  useEffect(() => {
    () => setRowSelection({});
  }, [pagination]);

  const sort = useMemo<Sort | undefined>(() => {
    if (!sorting) return undefined;
    return sorting.length === 0
      ? undefined
      : {
          sortField: sorting[0].id,
          sortOrder: sorting[0].desc ? "desc" : "asc",
        };
  }, [sorting]);

  const { data } = useData(
    isServerSide,
    pagination.pageIndex + 1,
    sort,
    filter
  );

  return {
    columnFilters,
    setColumnFilters,
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    sort,
    data,
  };
}
