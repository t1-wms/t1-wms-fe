import { PageResponse } from "@/shared";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  SortingState,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

export interface TableParams<TData, QueryResult> {
  data?: PageResponse<TData>;
  columns: ColumnDef<TData, any>[];
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  sorting: SortingState;
  setSorting: Dispatch<SetStateAction<SortingState>>;
  rowSelection: RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
  isLoading: boolean;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  refetch?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<QueryResult>>;
}
