import {
  QueryClient,
  useMutation,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  createOrder,
  getOrderChart,
  getOrderCount,
  getOrders,
  getOrdersPaged,
  getSupplierCount,
  getSuppliers,
  getSuppliersPaged,
} from "../api";
import { afterMutate, Sort } from "@/shared";
import { CreateOrderRequestDto, OrderFilter, SupplierFilter } from "./types";

export const useOrderChart = () => {
  return useSuspenseQuery({
    queryKey: ["orderChart"],
    queryFn: () => getOrderChart(),
  });
};

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

export const createUseSupplierQueryKey = (
  key: string,
  isServerSide: boolean,
  page?: number,
  sort?: Sort,
  filter?: SupplierFilter
) => {
  return isServerSide
    ? [
        key,
        page!,
        sort ? `${sort.sortField}-${sort.sortOrder}` : "not-sorting",
        filter ? `${filter.businessNumber}` : "not-filtering",
      ]
    : [key];
};

export const useSupplierCount = () => {
  return useSuspenseQuery({
    queryKey: ["supplier", "count"],
    queryFn: () => getSupplierCount(),
  });
};

export const useSuppliers = (
  isServerSide: boolean,
  page?: number,
  sort?: Sort,
  filter?: SupplierFilter,
  size?: number
) => {
  const queryKey = createUseSupplierQueryKey(
    "supplier",
    isServerSide,
    page!,
    sort,
    filter
  );

  if (isServerSide) {
    return useSuspenseQuery({
      queryKey,
      queryFn: () => getSuppliersPaged(page!, sort, filter),
    });
  } else {
    return useSuspenseQuery({
      queryKey,
      queryFn: () => getSuppliers(size!),
    });
  }
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
  filter?: OrderFilter,
  size?: number
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
      queryFn: () => getOrders(size!),
    });
  }
};

export const useCreateOrder = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (newOrder: CreateOrderRequestDto) => createOrder(newOrder),
    onSuccess: afterMutate(queryClient, "order"),
  });
};
