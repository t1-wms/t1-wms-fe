import { Sort } from "@shared/model";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  getRoles,
  getUserCount,
  getUsers,
  getUsersPaged,
  updateUserActive,
} from "../api/UserApi";

export const useUserCount = () => {
  return useQuery({
    queryKey: ["user", "count"],
    queryFn: () => getUserCount(),
  });
};

export const createUseUsersQueryKey = (
  isServerSide: boolean | undefined,
  page?: number,
  sort?: Sort
) => {
  return isServerSide
    ? [
        "user",
        page!,
        sort ? `${sort.sortField}-${sort.sortOrder}` : "not-sorting",
      ]
    : ["user"];
};

export const useUsers = (
  isServerSide: boolean | undefined,
  page?: number,
  sort?: Sort
) => {
  if (isServerSide) {
    return useQuery({
      queryKey: createUseUsersQueryKey(isServerSide, page!, sort),
      queryFn: () => getUsersPaged(page!, sort),
      enabled: isServerSide !== undefined && isServerSide,
      placeholderData: keepPreviousData,
    });
  } else {
    return useQuery({
      queryKey: ["user"],
      queryFn: () => getUsers(),
      enabled: isServerSide !== undefined && !isServerSide,
    });
  }
};

export const useUpdateActive = (onMutate: (userId: number) => void) => {
  return useMutation({
    mutationFn: (userId: number) => updateUserActive(userId),
    onMutate,
  });
};

export const useRoles = () => {
  return useQuery({
    queryKey: ["role"],
    queryFn: () => getRoles(),
  });
};
