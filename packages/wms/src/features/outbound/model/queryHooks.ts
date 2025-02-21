import { afterMutate, Sort } from "@/shared";
import {
  QueryClient,
  useMutation,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  createOutboundAssign,
  createOutboundLoading,
  createOutboundPacking,
  createOutboundPicking,
  createOutboundPlan,
  deleteOutboundAssign,
  deleteOutboundLoading,
  deleteOutboundPacking,
  deleteOutboundPicking,
  deleteOutboundPlan,
  getOutboundAssignsPaged,
  getOutboundChart,
  getOutboundLoadingsPaged,
  getOutboundPackingsPaged,
  getOutboundPickingsPaged,
  getOutboundPlansPaged,
  updateOutboundAssign,
  updateOutboundLoading,
  updateOutboundPacking,
  updateOutboundPicking,
  updateOutboundPlan,
} from "../api";
import {
  OutboundFilter,
  UseCreateOutboundPlanParams,
  UseUpdateOutboundAssignParams,
  UseUpdateOutboundLoadingParams,
  UseUpdateOutboundPackingParams,
  UseUpdateOutboundPickingParams,
  UseUpdateOutboundPlanParams,
} from "./types";

export const useOutboundChart = () => {
  return useSuspenseQuery({
    queryKey: ["outboundChart"],
    queryFn: () => getOutboundChart(),
  });
};

export const createUseOutboundQueryKey = (
  key: string,
  page?: number,
  sort?: Sort,
  filter?: OutboundFilter
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

export const useOutboundPlans = (
  page?: number,
  sort?: Sort,
  filter?: OutboundFilter
) => {
  return useQuery({
    queryKey: createUseOutboundQueryKey("outboundPlan", page!, sort, filter),
    queryFn: () => getOutboundPlansPaged(page!, sort, filter),
    placeholderData: (previousData) => previousData,
  }).isLoading;
};

export const useOutboundAssigns = (
  page?: number,
  sort?: Sort,
  filter?: OutboundFilter
) => {
  return useQuery({
    queryKey: createUseOutboundQueryKey("outboundAssign", page!, sort, filter),
    queryFn: () => getOutboundAssignsPaged(page!, sort, filter),
  });
};

export const useOutboundPickings = (
  page?: number,
  sort?: Sort,
  filter?: OutboundFilter
) => {
  return useQuery({
    queryKey: createUseOutboundQueryKey("outboundPicking", page!, sort, filter),
    queryFn: () => getOutboundPickingsPaged(page!, sort, filter),
  });
};

export const useOutboundPackings = (
  page?: number,
  sort?: Sort,
  filter?: OutboundFilter
) => {
  return useQuery({
    queryKey: createUseOutboundQueryKey("outboundPacking", page!, sort, filter),
    queryFn: () => getOutboundPackingsPaged(page!, sort, filter),
  });
};

export const useOutboundLoadings = (
  page?: number,
  sort?: Sort,
  filter?: OutboundFilter
) => {
  return useQuery({
    queryKey: createUseOutboundQueryKey("outboundLoading", page!, sort, filter),
    queryFn: () => getOutboundLoadingsPaged(page!, sort, filter),
  });
};

export const useCreateOutboundPlan = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: ({ newOutboundPlan }: UseCreateOutboundPlanParams) =>
      createOutboundPlan(newOutboundPlan),
    onSuccess: afterMutate(queryClient, "outboundPlan"),
  });
};

export const useUpdateOutboundPlan = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: ({
      outboundPlanId,
      newOutboundPlan,
    }: UseUpdateOutboundPlanParams) =>
      updateOutboundPlan(outboundPlanId, newOutboundPlan),
    onSuccess: afterMutate(queryClient, "outboundPlan"),
  });
};

export const useDeleteOutboundPlan = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (outboundPlanId: number) => deleteOutboundPlan(outboundPlanId),
    onSuccess: afterMutate(queryClient, "outboundPlan"),
  });
};

export const useCreateOutboundAssign = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (outboundPlanId: number) =>
      createOutboundAssign(outboundPlanId),
    onSuccess: afterMutate(queryClient, "outboundAssign"),
  });
};

export const useUpdateOutboundAssign = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: ({
      outboundId,
      outboundAssignDate,
    }: UseUpdateOutboundAssignParams) =>
      updateOutboundAssign(outboundId, outboundAssignDate),
    onSuccess: afterMutate(queryClient, "outboundAssign"),
  });
};

export const useDeleteOutboundAssign = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (outboundPlanId: number) =>
      deleteOutboundAssign(outboundPlanId),
    onSuccess: afterMutate(queryClient, "outboundAssign"),
  });
};

export const useCreateOutboundPicking = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (outboundPlanId: number) =>
      createOutboundPicking(outboundPlanId),
    onSuccess: afterMutate(queryClient, "outboundPicking"),
  });
};

export const useUpdateOutboundPicking = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: ({
      outboundId,
      outboundPickingDate,
    }: UseUpdateOutboundPickingParams) =>
      updateOutboundPicking(outboundId, outboundPickingDate),
    onSuccess: afterMutate(queryClient, "outboundPicking"),
  });
};

export const useDeleteOutboundPicking = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (outboundPlanId: number) =>
      deleteOutboundPicking(outboundPlanId),
    onSuccess: afterMutate(queryClient, "outboundPicking"),
  });
};

export const useCreateOutboundPacking = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (outboundPlanId: number) =>
      createOutboundPacking(outboundPlanId),
    onSuccess: afterMutate(queryClient, "outboundPacking"),
  });
};

export const useUpdateOutboundPacking = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: ({
      outboundId,
      outboundPackingDate,
    }: UseUpdateOutboundPackingParams) =>
      updateOutboundPacking(outboundId, outboundPackingDate),
    onSuccess: afterMutate(queryClient, "outboundPacking"),
  });
};

export const useDeleteOutboundPacking = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (outboundPlanId: number) =>
      deleteOutboundPacking(outboundPlanId),
    onSuccess: afterMutate(queryClient, "outboundPacking"),
  });
};

export const useCreateOutboundLoading = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (outboundPlanId: number) =>
      createOutboundLoading(outboundPlanId),
    onSuccess: afterMutate(queryClient, "outboundLoading"),
  });
};

export const useUpdateOutboundLoading = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: ({
      outboundId,
      outboundLoadingDate,
    }: UseUpdateOutboundLoadingParams) =>
      updateOutboundLoading(outboundId, outboundLoadingDate),
    onSuccess: afterMutate(queryClient, "outboundLoading"),
  });
};

export const useDeleteOutboundLoading = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (outboundPlanId: number) =>
      deleteOutboundLoading(outboundPlanId),
    onSuccess: afterMutate(queryClient, "outboundLoading"),
  });
};
