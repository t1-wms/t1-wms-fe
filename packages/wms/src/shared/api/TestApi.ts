import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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

export const getTestPage = async (page: number) => {
  const response = await noAuthAxios.get<PageResponse<TestUser>>(
    `api/users?page=${page}`
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
  page?: number
) => {
  if (isServerSide) {
    return useQuery({
      queryKey: ["test", page],
      queryFn: () => getTestPage(page!),
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
