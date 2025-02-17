import { PageResponse, Sort } from "@/shared";
import { noAuthAxios } from "@/shared/api/base";
import {
  InboundCheckResponseDto,
  InboundFilter,
  InboundScheduleResponseDto,
} from "../model";

export const getInboundScheduleCount = async () => {
  const response = await noAuthAxios.get<
    PageResponse<InboundScheduleResponseDto>
  >(`api/inbound?page=0&size=1`);

  return response.data;
};

export const getInboundSchedules = async (size: number) => {
  const response = await noAuthAxios.get<
    PageResponse<InboundScheduleResponseDto>
  >(`api/inbound?page=0&size=${size}`);

  return response.data;
};

export const getInboundSchedulesPaged = async (
  page: number,
  sort?: Sort,
  filter?: InboundFilter
) => {
  const response = await noAuthAxios.get<
    PageResponse<InboundScheduleResponseDto>
  >(
    `api/inbound?page=${page}${
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

export const getInboundCheckCount = async () => {
  const response = await noAuthAxios.get<PageResponse<InboundCheckResponseDto>>(
    `api/inboundCheck?page=0&size=1`
  );

  return response.data;
};

export const getInboundChecks = async (size: number) => {
  const response = await noAuthAxios.get<PageResponse<InboundCheckResponseDto>>(
    `api/inboundCheck?page=0&size=${size}`
  );

  return response.data;
};

export const getInboundChecksPaged = async (
  page: number,
  sort?: Sort,
  filter?: InboundFilter
) => {
  const response = await noAuthAxios.get<PageResponse<InboundCheckResponseDto>>(
    `api/inboundCheck?page=${page}${
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
