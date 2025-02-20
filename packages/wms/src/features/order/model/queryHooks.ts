import { afterMutate, Sort } from "@/shared";
import {
  QueryClient,
  useMutation,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  approveOrder,
  createOrder,
  deleteOrder,
  getOrderChart,
  getOrdersPaged,
  getReceivedOrdersPaged,
  getSuppliersPaged,
  updateOrder,
} from "../api";
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
  page?: number,
  sort?: Sort,
  filter?: OrderFilter
) => {
  return [
    key,
    page!,
    sort ? `${sort.sortField}-${sort.sortOrder}` : "not-sorting",
    filter
      ? `n=${filter.number}/s=${filter.startDate}/e=${filter.endDate}`
      : "not-filtering",
  ];
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
  return useQuery({
    queryKey: createUseSupplierQueryKey("supplier", page!, sort, filter),
    queryFn: () => getSuppliersPaged(page!, sort, filter),
  });
};

export const useOrders = (page?: number, sort?: Sort, filter?: OrderFilter) => {
  return useQuery({
    queryKey: createUseOrderQueryKey("order", page!, sort, filter),
    queryFn: () => getOrdersPaged(page!, sort, filter),
  });
};

export const useReceivedOrdes = (
  page?: number,
  sort?: Sort,
  filter?: OrderFilter
) => {
  return useQuery({
    queryKey: createUseOrderQueryKey("receivedOrder", page!, sort, filter),
    queryFn: () => getReceivedOrdersPaged(page!, sort, filter),
  });
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
