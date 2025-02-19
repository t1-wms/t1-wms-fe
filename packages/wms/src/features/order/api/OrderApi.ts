import { PageResponse, Sort } from "@/shared";
import { noAuthAxios } from "@/shared/api/base";
import {
  CreateOrderRequestDto,
  OrderChartData,
  OrderFilter,
  OrderResponseDto,
  SupplierFilter,
  SupplierProductDto,
  SupplierResponseDto,
} from "../model";

export const getOrderChart = async () => {
  const response = await noAuthAxios.get<OrderChartData>(
    `/api/dashboard/order-status`
  );

  return response.data;
};

export const getSupplierCount = async () => {
  const response = await noAuthAxios.get<PageResponse<SupplierResponseDto>>(
    `/api/supplier?page=0&size=1`
  );

  return response.data;
};

export const getSuppliers = async (size: number) => {
  const response = await noAuthAxios.get<PageResponse<SupplierResponseDto>>(
    `api/supplier?page=0&size=${size}`
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
      sort ? `&sort=${sort.sortField},${sort.sortOrder}` : ""
    }${
      filter
        ? `${filter.businessNumber ? `&number=${filter.businessNumber}` : ""}`
        : ""
    }`
  );

  return response.data;
};

export const getOrderCount = async () => {
  const response = await noAuthAxios.get<PageResponse<OrderResponseDto>>(
    `/api/order?page=0&size=1`
  );

  return response.data;
};

export const getOrders = async (size: number) => {
  const response = await noAuthAxios.get<PageResponse<OrderResponseDto>>(
    `api/order?page=0&size=${size}`
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
      sort ? `&sort=${sort.sortField},${sort.sortOrder}` : ""
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

export const getReceivedOrderCount = async () => {
  const response = await noAuthAxios.get<PageResponse<OrderResponseDto>>(
    `/api/orderReceived?page=0&size=1`
  );

  return response.data;
};

export const getReceivedOrders = async (size: number) => {
  const response = await noAuthAxios.get<PageResponse<OrderResponseDto>>(
    `api/orderReceived?page=0&size=${size}`
  );

  return response.data;
};

export const getReceivedOrdersPaged = async (
  page: number,
  sort?: Sort,
  filter?: OrderFilter
) => {
  const response = await noAuthAxios.get<PageResponse<OrderResponseDto>>(
    `api/orderReceived?page=${page}${
      sort ? `&sort=${sort.sortField},${sort.sortOrder}` : ""
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

export const createOrder = async (newOrder: CreateOrderRequestDto) => {
  const response = await noAuthAxios.post<void>(`api/order`, newOrder);
  return response.data;
};

export const updateOrder = async (
  orderId: number,
  productList: SupplierProductDto[]
) => {
  const response = await noAuthAxios.put<void>(
    `api/order/${orderId}`,
    productList
  );
  return response.data;
};

export const deleteOrder = async (orderId: number) => {
  const response = await noAuthAxios.delete<void>(`api/order/${orderId}`);
  return response.data;
};

export const approveOrder = async (orderId: number) => {
  const response = await noAuthAxios.post<void>(`api/order/approve/${orderId}`);
  return response.data;
};
