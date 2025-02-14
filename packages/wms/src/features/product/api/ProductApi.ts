import { ProductListDto } from "@/entities";
import { PageResponse } from "@/shared";
import { noAuthAxios } from "@/shared/api/base";

export const getProductSimple = async () => {
  const response = await noAuthAxios.get<PageResponse<ProductListDto>>(
    `api/product/simple`
  );

  return response.data;
};
