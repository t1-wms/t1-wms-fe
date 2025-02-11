import { Sort } from "@shared/model";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUserCount, getUsers, getUsersPaged } from "../api/UserApi";

export const useUserCount = () => {
  return useQuery({
    queryKey: ["user", "count"],
    queryFn: () => getUserCount(),
  });
};

export const useUsers = (
  isServerSide: boolean | undefined,
  page?: number,
  sort?: Sort
) => {
  if (isServerSide) {
    return useQuery({
      queryKey: [
        "user",
        page,
        sort ? `${sort.sortField}-${sort.sortOrder}` : "not-sorting",
      ],
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
