import { PageResponse } from "@/shared/model";

export const createPageResponse = <T extends unknown>(data?: T[]) => {
  const pageResponse: PageResponse<T> | undefined = data
    ? {
        content: data,
        pageable: {
          sort: {
            empty: false,
            unsorted: false,
            sorted: true,
          },
          offset: 0,
          pageSize: 0,
          pageNumber: 1,
          paged: true,
          unpaged: false,
        },
        last: true,
        totalPages: 1,
        totalElements: data.length,
        size: 1,
        number: 0, // 현재 페이지 번호
        sort: {
          empty: false,
          unsorted: false,
          sorted: true,
        },
        first: true,
        numberOfElements: data.length,
        empty: false,
      }
    : undefined;

  return pageResponse;
};
