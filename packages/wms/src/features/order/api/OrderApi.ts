import { Count, PageResponse, Sort } from "@/shared";
import { noAuthAxios } from "@/shared/api/base";
import {
  OrderFilter,
  OrderResponseDto,
  SupplierFilter,
  SupplierResponseDto,
} from "../model";

export const getSupplierCount = async () => {
  const response = await noAuthAxios.get<Count>(`/api/supplier/count`);

  return response.data;
};

export const getSuppliers = async () => {
  const response = await noAuthAxios.get<PageResponse<SupplierResponseDto>>(
    `api/supplier/no-page`
  );

  return response.data;
};

export const getSuppliersPaged = async (
  page: number,
  sort?: Sort,
  filter?: SupplierFilter
) => {
  const response = await noAuthAxios.get<PageResponse<SupplierResponseDto>>(
    `api/supplier?page=${page}${
      sort ? `&sortField=${sort.sortField}&sortOrder=${sort.sortOrder}` : ""
    }${
      filter
        ? `${filter.businessNumber ? `&number=${filter.businessNumber}` : ""}`
        : ""
    }`
  );

  return response.data;
};

export const getOrderCount = async () => {
  const response = await noAuthAxios.get<Count>(`/api/order/count`);

  return response.data;
};

export const getOrders = async () => {
  const response = await noAuthAxios.get<PageResponse<OrderResponseDto>>(
    `api/order/no-page`
  );

  return response.data;
};

export const getOrdersPaged = async (
  page: number,
  sort?: Sort,
  filter?: OrderFilter
) => {
  const response = await noAuthAxios.get<PageResponse<OrderResponseDto>>(
    `api/order?page=${page}${
      sort ? `&sortField=${sort.sortField}&sortOrder=${sort.sortOrder}` : ""
    }${
      filter
        ? `${filter.number ? `&number=${filter.number}` : ""}${
            filter.startDate ? `&startDate=${filter.startDate}` : ""
          }${filter.endDate ? `&endDate=${filter.endDate}` : ""}`
        : ""
    }`
  );

  return response.data;
};
