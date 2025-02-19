import { PageResponse } from "@/shared";
import { noAuthAxios } from "@/shared/api/base";
import { ProductThresholdDto } from "../model";

export const getProductThresholdChart = async () => {
  const response = await noAuthAxios.get<PageResponse<ProductThresholdDto>>(
    `/api/productThreshold?sort=productCount,desc`
  );

  return response.data;
};

// export const getProductThresholds = async () => {
//   const response = await noAuthAxios.get<PageResponse<ProductThresholdDto>>(
//     `/api/productThreshold?sort=productCount,desc`
//   );

//   return response.data;
// };
