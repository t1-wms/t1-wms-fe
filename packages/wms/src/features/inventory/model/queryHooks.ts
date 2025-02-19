import {
  QueryClient,
  useMutation,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  getProductThresholdChart,
  getProductThresholdCount,
  getProductThresholds,
  getProductThresholdsPaged,
  updateThreshold,
} from "../api/inventoryApis";
import { afterMutate, Sort } from "@/shared";
import { ProductFilter } from "@/features/product";
import { UpdateThresholdRequestDto } from "./types";

export const useProductThresholdChart = () => {
  return useSuspenseQuery({
    queryKey: ["productThresholdChart"],
    queryFn: () => getProductThresholdChart(),
  });
};

export const createUseProductThresholdQueryKey = (
  isServerSide: boolean,
  page?: number,
  sort?: Sort,
  filter?: ProductFilter
) => {
  return isServerSide
    ? [
        "productThreshold",
        page!,
        sort ? `${sort.sortField}-${sort.sortOrder}` : "not-sorting",
        filter ? `${filter.productCode}` : "not-filtering",
      ]
    : ["productThreshold"];
};

export const useProductThresholdCount = () => {
  return useSuspenseQuery({
    queryKey: ["productThreshold", "count"],
    queryFn: () => getProductThresholdCount(),
  });
};

export const useProductThresholds = (
  isServerSide: boolean,
  page?: number,
  sort?: Sort,
  filter?: ProductFilter,
  size?: number
) => {
  const queryKey = createUseProductThresholdQueryKey(
    isServerSide,
    page!,
    sort,
    filter
  );

  if (isServerSide) {
    return useSuspenseQuery({
      queryKey,
      queryFn: () => getProductThresholdsPaged(page!, sort, filter),
    });
  } else {
    return useSuspenseQuery({
      queryKey,
      queryFn: () => getProductThresholds(size!),
    });
  }
};

export const useUpdateThreshold = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (updateThresholdRequestDto: UpdateThresholdRequestDto) =>
      updateThreshold(updateThresholdRequestDto),
    onSuccess: afterMutate(queryClient, "productThreshold"),
  });
};
