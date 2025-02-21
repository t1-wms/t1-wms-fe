import { Sort } from "@/shared";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  getInboundChart,
  getInboundChecksPaged,
  getInboundPutAwaysPaged,
  getInboundSchedulesPaged,
} from "../api";
import { InboundFilter } from "./types";

export const createUseInboundQueryKey = (
  key: string,
  page?: number,
  sort?: Sort,
  filter?: InboundFilter
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

export const useInboundChart = () => {
  return useSuspenseQuery({
    queryKey: ["inboundChart"],
    queryFn: () => getInboundChart(),
    staleTime: 1000,
  });
};

export const useInboundSchedules = (
  page?: number,
  sort?: Sort,
  filter?: InboundFilter
) => {
  return useQuery({
    queryKey: createUseInboundQueryKey("inboundSchedule", page!, sort, filter),
    queryFn: () => getInboundSchedulesPaged(page!, sort, filter),
  });
};

export const useInboundChecks = (
  page?: number,
  sort?: Sort,
  filter?: InboundFilter
) => {
  return useQuery({
    queryKey: createUseInboundQueryKey("inboundCheck", page!, sort, filter),
    queryFn: () => getInboundChecksPaged(page!, sort, filter),
  });
};

export const useInboundPutAways = (
  page?: number,
  sort?: Sort,
  filter?: InboundFilter
) => {
  return useQuery({
    queryKey: createUseInboundQueryKey("inboundPutAway", page!, sort, filter),
    queryFn: () => getInboundPutAwaysPaged(page!, sort, filter),
  });
};
