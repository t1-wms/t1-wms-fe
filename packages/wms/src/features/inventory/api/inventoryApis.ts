import { ProductFilter } from "@/features/product";
import { PageResponse, Sort } from "@/shared";
import { noAuthAxios } from "@/shared/api/base";
import {
  BinResponseDto,
  ProductThresholdDto,
  UpdateThresholdRequestDto,
} from "../model";

export const getProductThresholdChart = async () => {
  const response = await noAuthAxios.get<PageResponse<ProductThresholdDto>>(
    `/api/productThreshold?sort=productCount,desc`
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

export const getBins = async () => {
  const response = await noAuthAxios.get<BinResponseDto[]>(`api/bin`);

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
