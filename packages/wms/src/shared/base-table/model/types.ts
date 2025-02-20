import { PageResponse } from "@/shared";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  SortingState,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

export interface TableParams<TData> {
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
  isPending: boolean;
}
