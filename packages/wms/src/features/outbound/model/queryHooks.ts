import { afterMutate, Sort } from "@/shared";
import {
  QueryClient,
  useMutation,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  getOutboundAssignCount,
  getOutboundAssigns,
  getOutboundAssignsPaged,
  getOutboundPlanCount,
  getOutboundPlans,
  getOutboundPlansPaged,
  getOutboundPickingCount,
  getOutboundPickings,
  getOutboundPickingsPaged,
  getOutboundPackingCount,
  getOutboundPackingsPaged,
  getOutboundPackings,
  getOutboundLoadingCount,
  getOutboundLoadingsPaged,
  getOutboundLoadings,
  createOutboundPlan,
  updateOutboundPlan,
  getOutboundChart,
  deleteOutboundPlan,
  createOutboundAssign,
  updateOutboundAssign,
  deleteOutboundAssign,
  deleteOutboundLoading,
  updateOutboundLoading,
  createOutboundLoading,
  deleteOutboundPacking,
  updateOutboundPacking,
  createOutboundPacking,
  deleteOutboundPicking,
  updateOutboundPicking,
  createOutboundPicking,
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

export const useOutboundPlanCount = () => {
  return useSuspenseQuery({
    queryKey: ["outboundPlan", "count"],
    queryFn: () => getOutboundPlanCount(),
  });
};

export const createUseOutboundQueryKey = (
  key: string,
  isServerSide: boolean,
  page?: number,
  sort?: Sort,
  filter?: OutboundFilter
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

export const useOutboundPlans = (
  isServerSide: boolean,
  page?: number,
  sort?: Sort,
  filter?: OutboundFilter,
  size?: number
) => {
  console.log("useOutboundPlans");
  console.log(size);

  const queryKey = createUseOutboundQueryKey(
    "outboundPlan",
    isServerSide,
    page!,
    sort,
    filter
  );

  if (isServerSide) {
    return useSuspenseQuery({
      queryKey,
      queryFn: () => getOutboundPlansPaged(page!, sort, filter),
    });
  } else {
    return useSuspenseQuery({
      queryKey,
      queryFn: () => getOutboundPlans(size!),
    });
  }
};

export const useOutboundAssignCount = () => {
  return useSuspenseQuery({
    queryKey: ["outboundAssign", "count"],
    queryFn: () => getOutboundAssignCount(),
  });
};

export const useOutboundAssigns = (
  isServerSide: boolean,
  page?: number,
  sort?: Sort,
  filter?: OutboundFilter,
  size?: number
) => {
  if (isServerSide) {
    return useSuspenseQuery({
      queryKey: createUseOutboundQueryKey(
        "outboundAssign",
        isServerSide,
        page!,
        sort,
        filter
      ),
      queryFn: () => getOutboundAssignsPaged(page!, sort, filter),
    });
  } else {
    return useSuspenseQuery({
      queryKey: createUseOutboundQueryKey(
        "outboundAssign",
        isServerSide,
        page!,
        sort,
        filter
      ),
      queryFn: () => getOutboundAssigns(size!),
    });
  }
};

export const useOutboundPickingCount = () => {
  return useSuspenseQuery({
    queryKey: ["outboundPicking", "count"],
    queryFn: () => getOutboundPickingCount(),
  });
};

export const useOutboundPickings = (
  isServerSide: boolean,
  page?: number,
  sort?: Sort,
  filter?: OutboundFilter,
  size?: number
) => {
  if (isServerSide) {
    return useSuspenseQuery({
      queryKey: createUseOutboundQueryKey(
        "outboundPicking",
        isServerSide,
        page!,
        sort,
        filter
      ),
      queryFn: () => getOutboundPickingsPaged(page!, sort, filter),
    });
  } else {
    return useSuspenseQuery({
      queryKey: createUseOutboundQueryKey(
        "outboundPicking",
        isServerSide,
        page!,
        sort,
        filter
      ),
      queryFn: () => getOutboundPickings(size!),
    });
  }
};

export const useOutboundPackingCount = () => {
  return useSuspenseQuery({
    queryKey: ["outboundPacking", "count"],
    queryFn: () => getOutboundPackingCount(),
  });
};

export const useOutboundPackings = (
  isServerSide: boolean,
  page?: number,
  sort?: Sort,
  filter?: OutboundFilter,
  size?: number
) => {
  console.log(filter);
  if (isServerSide) {
    return useSuspenseQuery({
      queryKey: createUseOutboundQueryKey(
        "outboundPacking",
        isServerSide,
        page!,
        sort,
        filter
      ),
      queryFn: () => getOutboundPackingsPaged(page!, sort, filter),
    });
  } else {
    return useSuspenseQuery({
      queryKey: createUseOutboundQueryKey(
        "outboundPacking",
        isServerSide,
        page!,
        sort,
        filter
      ),
      queryFn: () => getOutboundPackings(size!),
    });
  }
};

export const useOutboundLoadingCount = () => {
  return useSuspenseQuery({
    queryKey: ["outboundLoading", "count"],
    queryFn: () => getOutboundLoadingCount(),
  });
};

export const useOutboundLoadings = (
  isServerSide: boolean,
  page?: number,
  sort?: Sort,
  filter?: OutboundFilter,
  size?: number
) => {
  if (isServerSide) {
    return useSuspenseQuery({
      queryKey: createUseOutboundQueryKey(
        "outboundLoading",
        isServerSide,
        page!,
        sort,
        filter
      ),
      queryFn: () => getOutboundLoadingsPaged(page!, sort, filter),
    });
  } else {
    return useSuspenseQuery({
      queryKey: createUseOutboundQueryKey(
        "outboundLoading",
        isServerSide,
        page!,
        sort,
        filter
      ),
      queryFn: () => getOutboundLoadings(size!),
    });
  }
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
