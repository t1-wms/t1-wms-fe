import { ProductListDto } from "@/entities";
import { PageResponse, Sort } from "@/shared";
import { noAuthAxios } from "@/shared/api/base";
import { ProductFilter, ProductResponseDto } from "../model";

export const getProductSimple = async () => {
  const response = await noAuthAxios.get<ProductListDto[]>(
    `api/product/overview`
  );

  return response.data;
};

export const getProductCount = async () => {
  const response = await noAuthAxios.get<PageResponse<ProductResponseDto>>(
    `api/product?page=0&size=1`
  );

  return response.data;
};

export const getProducts = async (size: number) => {
  const response = await noAuthAxios.get<PageResponse<ProductResponseDto>>(
    `api/product?page=0&size=${size}`
  );

  return response.data;
};

export const getProductsPaged = async (
  page: number,
  sort?: Sort,
  filter?: ProductFilter
) => {
  const response = await noAuthAxios.get<PageResponse<ProductResponseDto>>(
    `api/product?page=${page}${
      sort ? `&sort=${sort.sortField},${sort.sortOrder}` : ""
    }${
      filter && filter.productCode ? `&productCode=${filter.productCode}` : ""
    }`
  );

  return response.data;
};
