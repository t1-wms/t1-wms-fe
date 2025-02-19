import { Sort } from "@/shared";
import { InboundFilter } from "./types";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  getInboundChart,
  getInboundCheckCount,
  getInboundChecks,
  getInboundChecksPaged,
  getInboundScheduleCount,
  getInboundSchedules,
  getInboundSchedulesPaged,
} from "../api";

export const createUseInboundQueryKey = (
  key: string,
  isServerSide: boolean,
  page?: number,
  sort?: Sort,
  filter?: InboundFilter
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

export const useInboundChart = () => {
  return useSuspenseQuery({
    queryKey: ["inboundChart"],
    queryFn: () => getInboundChart(),
    staleTime: 1000,
  });
};

export const useInboundScheduleCount = () => {
  return useSuspenseQuery({
    queryKey: ["inboundSchedule", "count"],
    queryFn: () => getInboundScheduleCount(),
  });
};

export const useInboundSchedules = (
  isServerSide: boolean,
  page?: number,
  sort?: Sort,
  filter?: InboundFilter,
  size?: number
) => {
  const queryKey = createUseInboundQueryKey(
    "inboundSchedule",
    isServerSide,
    page!,
    sort,
    filter
  );

  if (isServerSide) {
    return useSuspenseQuery({
      queryKey,
      queryFn: () => getInboundSchedulesPaged(page!, sort, filter),
    });
  } else {
    return useSuspenseQuery({
      queryKey,
      queryFn: () => getInboundSchedules(size!),
    });
  }
};

export const useInboundCheckCount = () => {
  return useSuspenseQuery({
    queryKey: ["inboundCheck", "count"],
    queryFn: () => getInboundCheckCount(),
  });
};

export const useInboundChecks = (
  isServerSide: boolean,
  page?: number,
  sort?: Sort,
  filter?: InboundFilter,
  size?: number
) => {
  const queryKey = createUseInboundQueryKey(
    "inboundCheck",
    isServerSide,
    page!,
    sort,
    filter
  );

  if (isServerSide) {
    return useSuspenseQuery({
      queryKey,
      queryFn: () => getInboundChecksPaged(page!, sort, filter),
    });
  } else {
    return useSuspenseQuery({
      queryKey,
      queryFn: () => getInboundChecks(size!),
    });
  }
};
