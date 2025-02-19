import { useSuspenseQuery } from "@tanstack/react-query";
import { getProductThresholdChart } from "../api/inventoryApis";

export const useProductThresholdChart = () => {
  return useSuspenseQuery({
    queryKey: ["productThresholdChart"],
    queryFn: () => getProductThresholdChart(),
  });
};
