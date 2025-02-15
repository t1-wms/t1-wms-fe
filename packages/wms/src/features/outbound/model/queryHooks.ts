import { Sort } from "@/shared";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  getOutboundAssignCount,
  getOutboundAssigns,
  getOutboundAssignsPaged,
  getOutboundPlanCount,
  getOutboundPlans,
  getOutboundPlansPaged,
} from "../api";
import { OutboundFilter } from "./types";

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
  filter?: OutboundFilter
) => {
  if (isServerSide) {
    return useSuspenseQuery({
      queryKey: createUseOutboundQueryKey(
        "outboundPlan",
        isServerSide,
        page!,
        sort,
        filter
      ),
      queryFn: () => getOutboundPlansPaged(page!, sort, filter),
    });
  } else {
    return useSuspenseQuery({
      queryKey: createUseOutboundQueryKey(
        "outboundPlan",
        isServerSide,
        page!,
        sort,
        filter
      ),
      queryFn: () => getOutboundPlans(),
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
  filter?: OutboundFilter
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
      queryFn: () => getOutboundAssigns(),
    });
  }
};
