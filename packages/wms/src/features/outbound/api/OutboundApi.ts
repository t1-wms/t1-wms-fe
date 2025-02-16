import { noAuthAxios } from "@shared/api/base";
import { Count, PageResponse, Sort } from "@shared/model";
import {
  OutboundAssignResponseDto,
  OutboundFilter,
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
