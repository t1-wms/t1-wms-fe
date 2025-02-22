import {
  CurrentUser,
  LoginDto,
  RegisterUserRequestDto,
  UserFilter,
  UserListDto,
  UseUpdateActiveParams,
  UseUpdateUserRoleParams,
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
  updateUserRole,
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
    mutationFn: ({ staffNumber, isActive }: UseUpdateActiveParams) =>
      updateUserActive(staffNumber, isActive),
    onMutate: ({ staffNumber, isActive }) => {
      queryClient.setQueryData<PageResponse<UserListDto>>(
        createUseUsersQueryKey(page, sort, filter),
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: oldData.content.map((user) =>
              user.staffNumber === staffNumber
                ? { ...user, isActive: isActive }
                : user
            ),
          };
        }
      );
    },
  });
};

export const useUpdateUserRole = (
  queryClient: QueryClient,
  page?: number,
  sort?: Sort,
  filter?: UserFilter
) => {
  return useMutation({
    mutationFn: ({ staffNumber, newRole }: UseUpdateUserRoleParams) =>
      updateUserRole(staffNumber, newRole),
    onMutate: ({ staffNumber, newRole }) => {
      queryClient.setQueryData<PageResponse<UserListDto>>(
        createUseUsersQueryKey(page, sort, filter),
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: oldData.content.map((user) =>
              user.staffNumber === staffNumber
                ? { ...user, userRole: newRole }
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
  onSuccess: (data: AxiosResponse<CurrentUser>) => void,
  onError: (error: Error) => void
) => {
  return useMutation({
    mutationFn: (loginDto: LoginDto) => login(loginDto),
    onSuccess,
    onError,
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
