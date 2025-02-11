import { noAuthAxios } from "@shared/api/base";
import { Count, PageResponse, Sort } from "@shared/model";
import { UserListDto } from "../model/types";

export const getUserCount = async () => {
  const response = await noAuthAxios.get<Count>(`/api/users/count`);

  return response.data;
};

export const getUsers = async () => {
  const response = await noAuthAxios.get<PageResponse<UserListDto>>(
    `api/users/no-page`
  );

  return response.data;
};

export const getUsersPaged = async (page: number, sort?: Sort) => {
  const response = await noAuthAxios.get<PageResponse<UserListDto>>(
    `api/users?page=${page}${
      sort ? `&sortField=${sort.sortField}&sortOrder=${sort.sortOrder}` : ""
    }`
  );

  return response.data;
};
