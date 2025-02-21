import { noAuthAxios } from "@shared/api/base";
import { PageResponse, Sort } from "@shared/model";
import { UpdateActiveResDto, UserFilter, UserListDto } from "../model/types";

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

export const updateUserActive = async (userId: number) => {
  const response = await noAuthAxios.put<UpdateActiveResDto>(
    `api/user/active/${userId}`
  );

  return response.data;
};

export const getRoles = async () => {
  const response = await noAuthAxios.get<string[]>("api/roles");

  return response;
};
