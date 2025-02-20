import {
  QueryClient,
  useMutation,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  approveOrder,
  createOrder,
  deleteOrder,
  getOrderChart,
  getOrderCount,
  getOrders,
  getOrdersPaged,
  getReceivedOrderCount,
  getReceivedOrders,
  getReceivedOrdersPaged,
  getSuppliersPaged,
  updateOrder,
} from "../api";
import { afterMutate, Sort } from "@/shared";
import {
  CreateOrderRequestDto,
  OrderFilter,
  SupplierFilter,
  UseUpdateOrderParams,
} from "./types";

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
  page?: number,
  sort?: Sort,
  filter?: SupplierFilter
) => {
  return [
    key,
    page!,
    sort ? `${sort.sortField}-${sort.sortOrder}` : "not-sorting",
    filter ? `b=${filter.businessNumber}` : "not-filtering",
  ];
};

export const useSuppliers = (
  page?: number,
  sort?: Sort,
  filter?: SupplierFilter
) => {
  return useSuspenseQuery({
    queryKey: createUseSupplierQueryKey("supplier", page!, sort, filter),
    queryFn: () => getSuppliersPaged(page!, sort, filter),
  });
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

export const useReceivedOrderCount = () => {
  return useSuspenseQuery({
    queryKey: ["receivedOrder", "count"],
    queryFn: () => getReceivedOrderCount(),
  });
};

export const useReceivedOrdes = (
  isServerSide: boolean,
  page?: number,
  sort?: Sort,
  filter?: OrderFilter,
  size?: number
) => {
  const queryKey = createUseOrderQueryKey(
    "receivedOrder",
    isServerSide,
    page!,
    sort,
    filter
  );

  if (isServerSide) {
    return useSuspenseQuery({
      queryKey,
      queryFn: () => getReceivedOrdersPaged(page!, sort, filter),
    });
  } else {
    return useSuspenseQuery({
      queryKey,
      queryFn: () => getReceivedOrders(size!),
    });
  }
};

export const useCreateOrder = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (newOrder: CreateOrderRequestDto) => createOrder(newOrder),
    onSuccess: afterMutate(queryClient, "order"),
  });
};

export const useUpdateOrder = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: ({ orderId, productList }: UseUpdateOrderParams) =>
      updateOrder(orderId, productList),
    onSuccess: afterMutate(queryClient, "order"),
    onError: () => {
      alert("이미 승인된 발주입니다");
    },
  });
};

export const useDeleteOrder = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (orderId: number) => deleteOrder(orderId),
    onSuccess: afterMutate(queryClient, "order"),
    onError: () => {
      alert("이미 승인된 발주입니다");
    },
  });
};

export const useApproveOrder = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (orderId: number) => approveOrder(orderId),
    onSuccess: afterMutate(queryClient, "receivedOrder"),
    onError: () => {
      alert("이미 승인된 발주입니다");
    },
  });
};
