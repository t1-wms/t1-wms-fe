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

export interface OutboundAssignResponseDto {
  process: string;
  outboundScheduleNumber: string;
  outboundAssignNumber: string;
  outboundAssignDate: string;
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

export interface OutboundFilter {
  number?: string;
  startDate?: string;
  endDate?: string;
}

export interface CreateOutboundPlanModalInfo extends ModalInfoBase {
  key: "createOutboundPlan";
  outboundPlan?: OutboundPlanResponseDto;
}

export interface CreateOutboundAssignModalInfo extends ModalInfoBase {
  key: "createOutboundAssign";
  outboundAssign?: OutboundAssignResponseDto;
}
