import { useQuery } from "@tanstack/react-query";
import { noAuthAxios } from "./base";

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

export interface TestUser {
  id: number;
  name: string;
  age: number;
  email: string;
}

export interface Sort {
  sortField: string;
  sortOrder: "asc" | "desc";
}

export const getTestCount = async () => {
  const response = await noAuthAxios.get<{ count: number }>(`/api/users/count`);

  return response.data;
};

export const getTestPageNoPage = async () => {
  const response = await noAuthAxios.get<PageResponse<TestUser>>(
    `api/users/no-page`
  );

  return response.data;
};

export const getTestPage = async (page: number, sort?: Sort) => {
  const response = await noAuthAxios.get<PageResponse<TestUser>>(
    `api/users?page=${page}${
      sort ? `&sortField=${sort.sortField}&sortOrder=${sort.sortOrder}` : ""
    }`
  );

  return response.data;
};

export const useTestCount = () => {
  return useQuery({
    queryKey: ["test", "count"],
    queryFn: () => getTestCount(),
  });
};

export const useTestPageNoPage = () => {
  return useQuery({
    queryKey: ["test"],
    queryFn: () => getTestPageNoPage(),
  });
};

export const useTestPage = (
  isServerSide: boolean | undefined,
  page?: number,
  sort?: Sort
) => {
  if (isServerSide) {
    return useQuery({
      queryKey: [
        "test",
        page,
        sort ? `${sort.sortField}-${sort.sortOrder}` : "not-sorting",
      ],
      queryFn: () => getTestPage(page!, sort),
      enabled: isServerSide !== undefined && isServerSide,
    });
  } else {
    return useQuery({
      queryKey: ["test"],
      queryFn: () => getTestPageNoPage(),
      enabled: isServerSide !== undefined && !isServerSide,
    });
  }
};
