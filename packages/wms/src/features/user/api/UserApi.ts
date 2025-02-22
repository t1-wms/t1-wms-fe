import { noAuthAxios } from "@shared/api/base";
import { PageResponse, Sort } from "@shared/model";
import {
  CurrentUser,
  LoginDto,
  RegisterUserRequestDto,
  UpdateActiveResDto,
  UserFilter,
  UserListDto,
} from "../model/types";

export const getUserCount = async () => {
  const response = await noAuthAxios.get<PageResponse<UserListDto>>(
    `/api/user/list?page=0&size=1`
  );

  return response.data;
};

export const getUsers = async (size: number) => {
  const response = await noAuthAxios.get<PageResponse<UserListDto>>(
    `api/user/list?page=0&size${size}`
  );

  return response.data;
};

export const getUsersPaged = async (
  page: number,
  sort?: Sort,
  filter?: UserFilter
) => {
  const response = await noAuthAxios.get<PageResponse<UserListDto>>(
    `api/user/list?page=${page}${
      sort ? `&sort=${sort.sortField},${sort.sortOrder}` : ""
    }${
      filter
        ? `${filter.staffNumber ? `&staffNumber=${filter.staffNumber}` : ""}`
        : ""
    }`
  );

  return response.data;
};

export const updateUserActive = async (
  staffNumber: string,
  isActive: boolean
) => {
  const response = await noAuthAxios.put<UpdateActiveResDto>(
    `api/auth/active?staffNumber=${staffNumber}&isActive=${isActive}`
  );

  return response.data;
};

export const updateUserRole = async (staffNumber: string, newRole: string) => {
  const response = await noAuthAxios.put<UpdateActiveResDto>(
    `api/auth/role?staffNumber=${staffNumber}&newRole=${newRole}`
  );

  return response.data;
};

export const getRoles = async () => {
  const response = await noAuthAxios.get<string[]>("api/roles");

  return response;
};

export const login = async (loginDto: LoginDto) => {
  const response = await noAuthAxios.post<CurrentUser>(
    "api/auth/login",
    loginDto
  );

  return response;
};

export const registerUser = async (newUser: RegisterUserRequestDto) => {
  const response = await noAuthAxios.post<void>("api/auth/register", newUser);

  return response;
};
