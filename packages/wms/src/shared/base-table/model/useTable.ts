import { Sort } from "@/shared";
import {
  PaginationState,
  RowSelectionState,
  SortingState,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

export function useTable() {
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

  return {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    sort,
  };
}
