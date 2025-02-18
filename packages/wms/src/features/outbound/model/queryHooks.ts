import { Sort } from "@/shared";
import { useSuspenseQuery } from "@tanstack/react-query";
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
  getOutboundChart,
} from "../api";
import { OutboundFilter } from "./types";

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
