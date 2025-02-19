import { noAuthAxios } from "@shared/api/base";
import { PageResponse, Sort } from "@shared/model";
import {
  CreateOutboundPlanRequestDto,
  OutboundAssignResponseDto,
  OutboundChartData,
  OutboundFilter,
  OutboundLoadingResponseDto,
  OutboundPackingResponseDto,
  OutboundPickingResponseDto,
  OutboundPlanResponseDto,
} from "../model";

export const getOutboundChart = async () => {
  const response = await noAuthAxios.get<OutboundChartData>(
    `api/dashboard/outbound-status`
  );

  return response.data;
};

export const getOutboundPlanCount = async () => {
  const response = await noAuthAxios.get<PageResponse<OutboundPlanResponseDto>>(
    `api/outbound?page=0&size=1`
  );

  return response.data;
};

export const getOutboundPlans = async (size: number) => {
  console.log("getOutboundPlans");
  console.log(size);
  const response = await noAuthAxios.get<PageResponse<OutboundPlanResponseDto>>(
    `api/outbound?page=0&size=${size}`
  );

  return response.data;
};

export const getOutboundPlansPaged = async (
  page: number,
  sort?: Sort,
  filter?: OutboundFilter
) => {
  const response = await noAuthAxios.get<PageResponse<OutboundPlanResponseDto>>(
    `api/outbound?page=${page}${
      sort ? `&sort=${sort.sortField},${sort.sortOrder}` : ""
    }${
      filter
        ? `${filter.number ? `&number=${filter.number}` : ""}${
            filter.startDate ? `&startDate=${filter.startDate}` : ""
          }${filter.endDate ? `&endDate=${filter.endDate}` : ""}`
        : ""
    }`
  );

  return response.data;
};

export const getOutboundAssignCount = async () => {
  const response = await noAuthAxios.get<PageResponse<OutboundPlanResponseDto>>(
    `api/outboundAssign?page=0&size=1`
  );

  return response.data;
};

export const getOutboundAssigns = async (size: number) => {
  const response = await noAuthAxios.get<
    PageResponse<OutboundAssignResponseDto>
  >(`api/outboundAssign?page=0&size=${size}`);

  return response.data;
};

export const getOutboundAssignsPaged = async (
  page: number,
  sort?: Sort,
  filter?: OutboundFilter
) => {
  const response = await noAuthAxios.get<
    PageResponse<OutboundAssignResponseDto>
  >(
    `api/outboundAssign?page=${page}${
      sort ? `&sort=${sort.sortField},${sort.sortOrder}` : ""
    }${
      filter
        ? `${filter.number ? `&number=${filter.number}` : ""}${
            filter.startDate ? `&startDate=${filter.startDate}` : ""
          }${filter.endDate ? `&endDate=${filter.endDate}` : ""}`
        : ""
    }`
  );

  return response.data;
};

export const getOutboundPickingCount = async () => {
  const response = await noAuthAxios.get<PageResponse<OutboundPlanResponseDto>>(
    `api/outboundPicking?page=0&size=1`
  );

  return response.data;
};

export const getOutboundPickings = async (size: number) => {
  const response = await noAuthAxios.get<
    PageResponse<OutboundPickingResponseDto>
  >(`api/outboundPicking?page=0&size=${size}`);

  return response.data;
};

export const getOutboundPickingsPaged = async (
  page: number,
  sort?: Sort,
  filter?: OutboundFilter
) => {
  const response = await noAuthAxios.get<
    PageResponse<OutboundPickingResponseDto>
  >(
    `api/outboundPicking?page=${page}${
      sort ? `&sort=${sort.sortField},${sort.sortOrder}` : ""
    }${
      filter
        ? `${filter.number ? `&number=${filter.number}` : ""}${
            filter.startDate ? `&startDate=${filter.startDate}` : ""
          }${filter.endDate ? `&endDate=${filter.endDate}` : ""}`
        : ""
    }`
  );

  return response.data;
};

export const getOutboundPackingCount = async () => {
  const response = await noAuthAxios.get<PageResponse<OutboundPlanResponseDto>>(
    `api/outboundPacking?page=0&size=1`
  );

  return response.data;
};

export const getOutboundPackings = async (size: number) => {
  const response = await noAuthAxios.get<
    PageResponse<OutboundPackingResponseDto>
  >(`api/outboundPacking?page=0&size=${size}`);

  return response.data;
};

export const getOutboundPackingsPaged = async (
  page: number,
  sort?: Sort,
  filter?: OutboundFilter
) => {
  const response = await noAuthAxios.get<
    PageResponse<OutboundPackingResponseDto>
  >(
    `api/outboundPacking?page=${page}${
      sort ? `&sort=${sort.sortField},${sort.sortOrder}` : ""
    }${
      filter
        ? `${filter.number ? `&number=${filter.number}` : ""}${
            filter.startDate ? `&startDate=${filter.startDate}` : ""
          }${filter.endDate ? `&endDate=${filter.endDate}` : ""}`
        : ""
    }`
  );

  return response.data;
};

export const getOutboundLoadingCount = async () => {
  const response = await noAuthAxios.get<PageResponse<OutboundPlanResponseDto>>(
    `api/outboundLoading?page=0&size=1`
  );

  return response.data;
};

export const getOutboundLoadings = async (size: number) => {
  const response = await noAuthAxios.get<
    PageResponse<OutboundLoadingResponseDto>
  >(`api/outboundLoading?page=0&size=${size}`);

  return response.data;
};

export const getOutboundLoadingsPaged = async (
  page: number,
  sort?: Sort,
  filter?: OutboundFilter
) => {
  const response = await noAuthAxios.get<
    PageResponse<OutboundLoadingResponseDto>
  >(
    `api/outboundLoading?page=${page}${
      sort ? `&sort=${sort.sortField},${sort.sortOrder}` : ""
    }${
      filter
        ? `${filter.number ? `&number=${filter.number}` : ""}${
            filter.startDate ? `&startDate=${filter.startDate}` : ""
          }${filter.endDate ? `&endDate=${filter.endDate}` : ""}`
        : ""
    }`
  );

  return response.data;
};

export const createOutboundPlan = async (
  newOutboundPlan: CreateOutboundPlanRequestDto
) => {
  const response = await noAuthAxios.post<void>(
    `api/outbound/register`,
    newOutboundPlan
  );

  return response.data;
};

export const updateOutboundPlan = async (
  outboundPlanId: number,
  newOutboundPlan: CreateOutboundPlanRequestDto
) => {
  const response = await noAuthAxios.put<void>(
    `api/outbound/${outboundPlanId}`,
    newOutboundPlan
  );

  return response.data;
};
