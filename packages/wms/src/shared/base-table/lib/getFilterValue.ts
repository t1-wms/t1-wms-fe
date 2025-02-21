import { ColumnFiltersState } from "@tanstack/react-table";

export const getFilterValue = (
  columnFilters: ColumnFiltersState,
  id: string
) => {
  const value = columnFilters.find((filter) => filter.id === id)?.value;
  return value ? (value as string) : undefined;
};
