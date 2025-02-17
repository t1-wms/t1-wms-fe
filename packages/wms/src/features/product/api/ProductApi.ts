import { ProductListDto } from "@/entities";
import { noAuthAxios } from "@/shared/api/base";

export const getProductSimple = async () => {
  const response = await noAuthAxios.get<ProductListDto[]>(
    `api/product/overview`
  );

  return response.data;
};
