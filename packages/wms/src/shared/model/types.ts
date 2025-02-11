export interface PageResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    nextPage?: number;
    previousPage?: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface Count {
  count: number;
}

export interface Sort {
  sortField: string;
  sortOrder: "asc" | "desc";
}
