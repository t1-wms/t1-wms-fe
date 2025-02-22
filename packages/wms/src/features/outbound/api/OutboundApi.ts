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

export const getReceivedOutboundToday = async () => {
  const response = await noAuthAxios.get<{ data: number }>(
    `api/dashboard/today-received-outbound`
  );

  return response.data;
};

export const getCompletedOutboundToday = async () => {
  const response = await noAuthAxios.get<{ data: number }>(
    `api/dashboard/today-completed-outbound`
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

export const deleteOutboundPlan = async (outboundPlanId: number) => {
  const response = await noAuthAxios.delete<void>(
    `api/outbound/${outboundPlanId}`
  );

  return response.data;
};

export const createOutboundAssign = async (outboundPlanId: number) => {
  const response = await noAuthAxios.post<void>(
    `api/outboundAssign/register/${outboundPlanId}`
  );

  return response.data;
};

export const updateOutboundAssign = async (
  outboundId: number,
  outboundAssignDate: string
) => {
  const response = await noAuthAxios.put<void>(
    `api/outboundAssign/${outboundId}`,
    { date: outboundAssignDate }
  );

  return response.data;
};

export const deleteOutboundAssign = async (outboundId: number) => {
  const response = await noAuthAxios.put<void>(
    `api/outboundAssign/${outboundId}`
  );

  return response.data;
};

export const createOutboundPicking = async (outboundPlanId: number) => {
  const response = await noAuthAxios.put<void>(
    `api/outboundPicking/register/${outboundPlanId}`
  );
  return response.data;
};

export const updateOutboundPicking = async (
  outboundId: number,
  outboundPickingDate: string
) => {
  const response = await noAuthAxios.put<void>(
    `api/outboundPicking/${outboundId}`,
    { date: outboundPickingDate }
  );
  return response.data;
};

export const deleteOutboundPicking = async (outboundId: number) => {
  const response = await noAuthAxios.put<void>(
    `api/outboundPicking/${outboundId}`
  );
  return response.data;
};

export const createOutboundPacking = async (outboundPlanId: number) => {
  const response = await noAuthAxios.put<void>(
    `api/outboundPacking/register/${outboundPlanId}`
  );
  return response.data;
};

export const updateOutboundPacking = async (
  outboundId: number,
  outboundPackingDate: string
) => {
  const response = await noAuthAxios.put<void>(
    `api/outboundPacking/${outboundId}`,
    { date: outboundPackingDate }
  );
  return response.data;
};

export const deleteOutboundPacking = async (outboundId: number) => {
  const response = await noAuthAxios.put<void>(
    `api/outboundPacking/${outboundId}`
  );
  return response.data;
};

export const createOutboundLoading = async (outboundPlanId: number) => {
  const response = await noAuthAxios.put<void>(
    `api/outboundLoading/register/${outboundPlanId}`
  );
  return response.data;
};

export const updateOutboundLoading = async (
  outboundId: number,
  outboundLoadingDate: string
) => {
  const response = await noAuthAxios.put<void>(
    `api/outboundLoading/${outboundId}`,
    { date: outboundLoadingDate }
  );
  return response.data;
};

export const deleteOutboundLoading = async (outboundId: number) => {
  const response = await noAuthAxios.put<void>(
    `api/outboundLoading/${outboundId}`
  );
  return response.data;
};
