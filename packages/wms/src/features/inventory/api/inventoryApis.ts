import { PageResponse, Sort } from "@/shared";
import { noAuthAxios } from "@/shared/api/base";
import { ProductThresholdDto, UpdateThresholdRequestDto } from "../model";
import { ProductFilter } from "@/features/product";

export const getProductThresholdChart = async () => {
  const response = await noAuthAxios.get<PageResponse<ProductThresholdDto>>(
    `/api/productThreshold?sort=productCount,desc`
  );

  return response.data;
};

export const getProductThresholdCount = async () => {
  const response = await noAuthAxios.get<PageResponse<ProductThresholdDto>>(
    `api/productThreshold?page=0&size=1`
  );

  return response.data;
};

export const getProductThresholds = async (size: number) => {
  const response = await noAuthAxios.get<PageResponse<ProductThresholdDto>>(
    `api/productThreshold?page=0&size=${size}`
  );

  return response.data;
};

export const getProductThresholdsPaged = async (
  page: number,
  sort?: Sort,
  filter?: ProductFilter
) => {
  const response = await noAuthAxios.get<PageResponse<ProductThresholdDto>>(
    `api/productThreshold?page=${page}${
      sort ? `&sort=${sort.sortField},${sort.sortOrder}` : ""
    }${
      filter && filter.productCode ? `&productCode=${filter.productCode}` : ""
    }`
  );

  return response.data;
};

export const updateThreshold = async (
  updateThresholdRequestDto: UpdateThresholdRequestDto
) => {
  const response = await noAuthAxios.patch<void>(
    "api/productThreshold",
    updateThresholdRequestDto
  );

  return response.data;
};
