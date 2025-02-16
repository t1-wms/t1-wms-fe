import { useSuspenseQuery } from "@tanstack/react-query";
import { getOrderCount, getOrders, getOrdersPaged } from "../api";
import { Sort } from "@/shared";
import { OrderFilter } from "./types";

export const createUseOrderQueryKey = (
  key: string,
  isServerSide: boolean,
  page?: number,
  sort?: Sort,
  filter?: OrderFilter
) => {
  return isServerSide
    ? [
        key,
        page!,
        sort ? `${sort.sortField}-${sort.sortOrder}` : "not-sorting",
        filter
          ? `${filter.number}/${filter.startDate}/${filter.endDate}`
          : "not-filtering",
      ]
    : [key];
};

export const useOrderCount = () => {
  return useSuspenseQuery({
    queryKey: ["order", "count"],
    queryFn: () => getOrderCount(),
  });
};

export const useOrders = (
  isServerSide: boolean,
  page?: number,
  sort?: Sort,
  filter?: OrderFilter
) => {
  const queryKey = createUseOrderQueryKey(
    "order",
    isServerSide,
    page!,
    sort,
    filter
  );

  if (isServerSide) {
    return useSuspenseQuery({
      queryKey,
      queryFn: () => getOrdersPaged(page!, sort, filter),
    });
  } else {
    return useSuspenseQuery({
      queryKey,
      queryFn: () => getOrders(),
    });
  }
};
