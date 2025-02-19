import { ProductListDto } from "@/entities/product";
import { ModalInfoBase } from "@/shared";

export interface OutboundChartData {
  outboundSchedule: number;
  outboundAssign: number;
  outboundPicking: number;
  outboundPacking: number;
  outboundLoading: number;
}

export interface OutboundPlanResponseDto {
  outboundPlanId: number;
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

export interface OutboundPickingResponseDto {
  process: string;
  outboundScheduleNumber: string;
  outboundAssignNumber: string;
  outboundPickingNumber: string;
  outboundPickingDate: string;
  productionPlanNumber: string;
  planDate: string;
  productList: ProductListDto[];
}

export interface OutboundPackingResponseDto {
  process: string;
  outboundScheduleNumber: string;
  outboundAssignNumber: string;
  outboundPickingNumber: string;
  outboundPackingNumber: string;
  outboundPackingDate: string;
  productionPlanNumber: string;
  planDate: string;
  productList: ProductListDto[];
}

export interface OutboundLoadingResponseDto {
  process: string;
  outboundScheduleNumber: string;
  outboundAssignNumber: string;
  outboundPickingNumber: string;
  outboundPackingNumber: string;
  outboundLoadingNumber: string;
  outboundLoadingDate: string;
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
  outbound: OutboundPlanResponseDto | OutboundAssignResponseDto;
}

export interface CreateOutboundPickingModalInfo extends ModalInfoBase {
  key: "createOutboundPicking";
  outbound: OutboundAssignResponseDto | OutboundPickingResponseDto;
}

export interface CreateOutboundPackingModalInfo extends ModalInfoBase {
  key: "createOutboundPacking";
  outbound: OutboundPickingResponseDto | OutboundPackingResponseDto;
}

export interface CreateOutboundLoadingModalInfo extends ModalInfoBase {
  key: "createOutboundLoading";
  outbound: OutboundPackingResponseDto | OutboundLoadingResponseDto;
}

export interface UseCreateOutboundPlanParams {
  newOutboundPlan: CreateOutboundPlanRequestDto;
}

export interface UseUpdateOutboundPlanParams {
  outboundPlanId: number;
  newOutboundPlan: CreateOutboundPlanRequestDto;
}
