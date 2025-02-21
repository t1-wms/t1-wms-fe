interface PageableSort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

interface Pageable {
  sort: PageableSort;
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PageResponse<T> {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // 현재 페이지 번호
  sort: PageableSort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Count {
  count: number;
}

export interface Sort {
  sortField: string;
  sortOrder: "asc" | "desc";
}

export interface ModalInfoBase {
  key: string;
}

export type UserRole = "공급업체" | "작업자" | "관리자";
export type Gender = "M" | "F";
