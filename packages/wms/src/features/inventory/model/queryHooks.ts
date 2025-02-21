import { ProductFilter } from "@/features/product";
import { afterMutate, Sort } from "@/shared";
import {
  QueryClient,
  useMutation,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  getBins,
  getProductThresholdChart,
  getProductThresholdsPaged,
  updateThreshold,
} from "../api/inventoryApis";
import { UpdateThresholdRequestDto } from "./types";

export const useProductThresholdChart = () => {
  return useSuspenseQuery({
    queryKey: ["productThresholdChart"],
    queryFn: () => getProductThresholdChart(),
  });
};

export const createUseProductThresholdQueryKey = (
  page?: number,
  sort?: Sort,
  filter?: ProductFilter
) => {
  return [
    "productThreshold",
    page!,
    sort ? `${sort.sortField}-${sort.sortOrder}` : "not-sorting",
    filter ? `p=${filter.productCode}` : "not-filtering",
  ];
};

export const useProductThresholds = (
  page?: number,
  sort?: Sort,
  filter?: ProductFilter
) => {
  return useQuery({
    queryKey: createUseProductThresholdQueryKey(page!, sort, filter),
    queryFn: () => getProductThresholdsPaged(page!, sort, filter),
  });
};

export const useBins = () => {
  return useSuspenseQuery({
    queryKey: ["bin"],
    queryFn: () => getBins(),
  });
};

export const useUpdateThreshold = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (updateThresholdRequestDto: UpdateThresholdRequestDto) =>
      updateThreshold(updateThresholdRequestDto),
    onSuccess: afterMutate(queryClient, "productThreshold"),
  });
};
