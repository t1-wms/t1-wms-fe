import { Sort } from "@shared/model";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  getRoles,
  getUserCount,
  getUsers,
  getUsersPaged,
  updateUserActive,
} from "../api/UserApi";
import { UserFilter } from "@/features";

export const useUserCount = () => {
  return useSuspenseQuery({
    queryKey: ["user", "count"],
    queryFn: () => getUserCount(),
  });
};

export const createUseUsersQueryKey = (
  isServerSide: boolean,
  page?: number,
  sort?: Sort,
  filter?: UserFilter
) => {
  return isServerSide
    ? [
        "user",
        page!,
        sort ? `${sort.sortField}-${sort.sortOrder}` : "not-sorting",
        filter ? `${filter.staffNumber}` : "not-filtering",
      ]
    : ["user"];
};

export const useUsers = (
  isServerSide: boolean,
  page?: number,
  sort?: Sort,
  filter?: UserFilter,
  size?: number
) => {
  if (isServerSide) {
    return useSuspenseQuery({
      queryKey: createUseUsersQueryKey(isServerSide, page!, sort, filter),
      queryFn: () => getUsersPaged(page!, sort, filter),
    });
  } else {
    return useSuspenseQuery({
      queryKey: ["user"],
      queryFn: () => getUsers(size!),
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
