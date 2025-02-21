import {
  CurrentUser,
  LoginDto,
  RegisterUserRequestDto,
  UserFilter,
  UserListDto,
} from "@/features";
import { PageResponse, Sort } from "@shared/model";
import {
  QueryClient,
  useMutation,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import {
  getRoles,
  getUserCount,
  getUsersPaged,
  login,
  registerUser,
  updateUserActive,
} from "../api/UserApi";

export const useUserCount = () => {
  return useSuspenseQuery({
    queryKey: ["user", "count"],
    queryFn: () => getUserCount(),
  });
};

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

export const useLogin = (
  onSuccess: (data: AxiosResponse<CurrentUser>) => void
) => {
  return useMutation({
    mutationFn: (loginDto: LoginDto) => login(loginDto),
    onSuccess,
  });
};

export const useRegisterUser = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (newUser: RegisterUserRequestDto) => registerUser(newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};
