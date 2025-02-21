import { PageResponse, Sort } from "@/shared";
import { noAuthAxios } from "@/shared/api/base";
import {
  CreateInboundCheckRequestDto,
  InboundChartData,
  InboundCheckResponseDto,
  InboundFilter,
  InboundPutAwayResponseDto,
  InboundScheduleResponseDto,
} from "../model";

export const getInboundChart = async () => {
  const response = await noAuthAxios.get<InboundChartData>(
    `api/dashboard/inbound-status`
  );

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

export const getInboundPutAwaysPaged = async (
  page: number,
  sort?: Sort,
  filter?: InboundFilter
) => {
  const response = await noAuthAxios.get<
    PageResponse<InboundPutAwayResponseDto>
  >(
    `api/inboundPutAway?page=${page}${
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

export const createInboundCheck = async (
  inboundId: number,
  reqDto: CreateInboundCheckRequestDto
) => {
  const response = await noAuthAxios.post<void>(
    `/api/inboundCheck/${inboundId}`,
    reqDto
  );

  return response;
};
