import { PageResponse } from "@/shared/model";

export const createPageResponse = <T extends unknown>(data: T[]) => {
  const pageResponse: PageResponse<T> = {
    data,
    pagination: {
      currentPage: 1,
      itemsPerPage: data.length,
      totalItems: data.length,
      totalPages: 1,
    },
  };

  return pageResponse;
};
