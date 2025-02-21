import { PageResponse, Sort } from "@shared/model";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getRoles, getUsersPaged, updateUserActive } from "../api/UserApi";
import { UserFilter, UserListDto } from "@/features";

export const createUseUsersQueryKey = (
  page?: number,
  sort?: Sort,
  filter?: UserFilter
) => {
  return [
    "user",
    page!,
    sort ? `${sort.sortField}-${sort.sortOrder}` : "not-sorting",
    filter ? `f=${filter.staffNumber}` : "not-filtering",
  ];
};

export const useUsers = (page?: number, sort?: Sort, filter?: UserFilter) => {
  return useQuery({
    queryKey: createUseUsersQueryKey(page!, sort, filter),
    queryFn: () => getUsersPaged(page!, sort, filter),
  });
};

export const useUpdateActive = (
  queryClient: QueryClient,
  page?: number,
  sort?: Sort,
  filter?: UserFilter
) => {
  return useMutation({
    mutationFn: (userId: number) => updateUserActive(userId),
    onMutate: (userId: number) => {
      queryClient.setQueryData<PageResponse<UserListDto>>(
        createUseUsersQueryKey(page, sort, filter),
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: oldData.content.map((user) =>
              user.userId === userId
                ? { ...user, isActive: !user.isActive }
                : user
            ),
          };
        }
      );
    },
  });
};

export const useRoles = () => {
  return useQuery({
    queryKey: ["role"],
    queryFn: () => getRoles(),
  });
};
