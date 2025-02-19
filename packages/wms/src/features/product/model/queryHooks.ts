import { useSuspenseQuery } from "@tanstack/react-query";
import {
  getProductCount,
  getProducts,
  getProductSimple,
  getProductsPaged,
} from "../api";
import { Sort } from "@/shared";
import { ProductFilter } from "./types";

export const createUseProductQueryKey = (
  isServerSide: boolean,
  page?: number,
  sort?: Sort,
  filter?: ProductFilter
) => {
  return isServerSide
    ? [
        "product",
        page!,
        sort ? `${sort.sortField}-${sort.sortOrder}` : "not-sorting",
        filter ? `${filter.productCode}` : "not-filtering",
      ]
    : ["product"];
};

export const useSimpleProducts = () => {
  return useSuspenseQuery({
    queryKey: ["product", "simple"],
    queryFn: () => getProductSimple(),
    staleTime: 10000,
  });
};

export const useProductCount = () => {
  return useSuspenseQuery({
    queryKey: ["product", "count"],
    queryFn: () => getProductCount(),
  });
};

export const useProducts = (
  isServerSide: boolean,
  page?: number,
  sort?: Sort,
  filter?: ProductFilter,
  size?: number
) => {
  const queryKey = createUseProductQueryKey(isServerSide, page!, sort, filter);

  if (isServerSide) {
    return useSuspenseQuery({
      queryKey,
      queryFn: () => getProductsPaged(page!, sort, filter),
    });
  } else {
    return useSuspenseQuery({
      queryKey,
      queryFn: () => getProducts(size!),
    });
  }
};
