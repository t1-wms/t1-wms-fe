import { ProductListDto } from "@/entities/product";
import { ModalInfoBase } from "@/shared";

export interface OutboundPlanResponseDto {
  process: string;
  outboundScheduleNumber: string;
  outboundScheduleDate: string;
  productionPlanNumber: string;
  planDate: string;
  productList: ProductListDto[];
}

export interface CreateOutboundPlanRequestDto {
  outboundScheduleDate: string;
  planDate: string;
  productionPlanNumber: string;
  productList: ProductListDto[];
}

export interface CreateOutboundPlanModalInfo extends ModalInfoBase {
  key: "createOutboundPlan";
}

export interface OutboundFilter {
  number?: string;
  startDate?: string;
  endDate?: string;
}
