import { Count, PageResponse, Sort } from "@shared/model";
import { UseQueryResult } from "@tanstack/react-query";
import {
  PaginationState,
  RowSelectionState,
  SortingState,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

export function useTable<T>(
  useCount: () => UseQueryResult<Count, Error>,
  useData: (
    isServerSide: boolean | undefined,
    page?: number,
    sort?: Sort
  ) => UseQueryResult<PageResponse<T>, Error>
) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  useEffect(() => {
    setRowSelection({});
  }, [pagination]);

  const sort = useMemo<Sort | undefined>(() => {
    return sorting.length === 0
      ? undefined
      : {
          sortField: sorting[0].id,
          sortOrder: sorting[0].desc ? "desc" : "asc",
        };
  }, [sorting]);

  const { data: countResult } = useCount();

  const isServerSide = useMemo(() => {
    if (countResult === undefined) return undefined;
    else {
      return countResult.count > 10000;
    }
  }, [countResult]);

  const { data } = useData(isServerSide, pagination.pageIndex + 1, sort);

  return {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    isServerSide,
    sort,
    data,
  };
}
