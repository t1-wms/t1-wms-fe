import { noAuthAxios } from "@shared/api/base";
import { Count, PageResponse, Sort } from "@shared/model";
import {
  OutboundAssignResponseDto,
  OutboundFilter,
  OutboundPackingResponseDto,
  OutboundPickingResponseDto,
  OutboundPlanResponseDto,
} from "../model";

export const getOutboundPlanCount = async () => {
  const response = await noAuthAxios.get<Count>(`/api/outbound/count`);

  return response.data;
};

export const getOutboundPlans = async () => {
  const response = await noAuthAxios.get<PageResponse<OutboundPlanResponseDto>>(
    `api/outbound/no-page`
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
      sort ? `&sortField=${sort.sortField}&sortOrder=${sort.sortOrder}` : ""
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
  const response = await noAuthAxios.get<Count>(`/api/outbound/assign/count`);

  return response.data;
};

export const getOutboundAssigns = async () => {
  const response = await noAuthAxios.get<
    PageResponse<OutboundAssignResponseDto>
  >(`api/outbound/assign/no-page`);

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
    `api/outbound/assign?page=${page}${
      sort ? `&sortField=${sort.sortField}&sortOrder=${sort.sortOrder}` : ""
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
  const response = await noAuthAxios.get<Count>(`/api/outbound/picking/count`);

  return response.data;
};

export const getOutboundPickings = async () => {
  const response = await noAuthAxios.get<
    PageResponse<OutboundPickingResponseDto>
  >(`api/outbound/picking/no-page`);

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
    `api/outbound/picking?page=${page}${
      sort ? `&sortField=${sort.sortField}&sortOrder=${sort.sortOrder}` : ""
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
  const response = await noAuthAxios.get<Count>(`/api/outbound/packing/count`);

  return response.data;
};

export const getOutboundPackings = async () => {
  const response = await noAuthAxios.get<
    PageResponse<OutboundPackingResponseDto>
  >(`api/outbound/packing/no-page`);

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
    `api/outbound/packing?page=${page}${
      sort ? `&sortField=${sort.sortField}&sortOrder=${sort.sortOrder}` : ""
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
