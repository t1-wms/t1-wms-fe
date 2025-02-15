import { Sort } from "@/shared";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
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

export const createUseOutboundPlansQueryKey = (
  isServerSide: boolean,
  page?: number,
  sort?: Sort,
  filter?: OutboundFilter
) => {
  return isServerSide
    ? [
        "outboundPlan",
        page!,
        sort ? `${sort.sortField}-${sort.sortOrder}` : "not-sorting",
        filter
          ? `${filter.number}/${filter.startDate}/${filter.endDate}`
          : "not-filtering",
      ]
    : ["outboundPlan"];
};

export const useOutboundPlans = (
  isServerSide: boolean,
  page?: number,
  sort?: Sort,
  filter?: OutboundFilter
) => {
  if (isServerSide) {
    return useSuspenseQuery({
      queryKey: createUseOutboundPlansQueryKey(
        isServerSide,
        page!,
        sort,
        filter
      ),
      queryFn: () => getOutboundPlansPaged(page!, sort, filter),
    });
  } else {
    return useSuspenseQuery({
      queryKey: createUseOutboundPlansQueryKey(
        isServerSide,
        page!,
        sort,
        filter
      ),
      queryFn: () => getOutboundPlans(),
    });
  }
};
