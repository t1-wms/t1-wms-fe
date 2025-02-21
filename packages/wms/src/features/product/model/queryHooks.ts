import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getProductSimple, getProductsPaged } from "../api";
import { Sort } from "@/shared";
import { ProductFilter } from "./types";

export const createUseProductQueryKey = (
  page?: number,
  sort?: Sort,
  filter?: ProductFilter
) => {
  return [
    "product",
    page!,
    sort ? `${sort.sortField}-${sort.sortOrder}` : "not-sorting",
    filter ? `p=${filter.productCode}` : "not-filtering",
  ];
};

export const useSimpleProducts = () => {
  return useQuery({
    queryKey: ["product", "simple"],
    queryFn: () => getProductSimple(),
    staleTime: 10000,
  });
};

export const useProducts = (
  page?: number,
  sort?: Sort,
  filter?: ProductFilter
) => {
  return useSuspenseQuery({
    queryKey: createUseProductQueryKey(page!, sort, filter),
    queryFn: () => getProductsPaged(page!, sort, filter),
  });
};
