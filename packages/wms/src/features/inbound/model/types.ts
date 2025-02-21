import { ProductListDto } from "@/entities";
import { ModalInfoBase } from "@/shared";

export interface InboundChartData {
  inboundSchedule: number;
  inboundCheck: number;
  inboundPutAway: number;
}

export interface InboundCheckProductListDto {
  productId: number;
  productCode: string;
  productName: string;
  productCount: number;
  lotCount: number;
  defectiveCount: number;
}

export interface InboundScheduleResponseDto {
  inboundId: number;
  inboundStatus: string;
  createdAt: string;
  scheduleNumber: string;
  scheduleDate: string;
  orderId: number;
  orderNumber: string;
  orderDate: string;
  supplierId: 0;
  supplierName: string;
  productList: ProductListDto[];
}

export interface InboundCheckResponseDto {
  inboundId: number;
  inboundStatus: string;
  createdAt: string;
  scheduleNumber: string;
  scheduleDate: string;
  checkNumber: string;
  checkDate: string;
  orderId: number;
  orderNumber: string;
  orderDate: string;
  supplierId: 0;
  supplierName: string;
  productList: InboundCheckProductListDto[];
}

export interface InboundPutAwayResponseDto {
  inboundId: number;
  process: string;
  createdAt: string;
  scheduleNumber: string;
  checkNumber: string;
  putAwayNumber: string;
  putAwayDate: string;
  orderId: number;
  orderNumber: string;
  orderDate: string;
  supplierId: number;
  supplierName: string;
  productList: ProductListDto[];
}

export interface InboundCheckDefaultValues {
  inboundId: number;
  checkDate: string;
  scheduleNumber: string;
  checkedProductList: InboundCheckProductListDto[];
}

export interface Defective {
  productId: number;
  defectiveCount: number;
}

export interface CreateInboundCheckRequestDto {
  checkedProductList: Defective[];
}

export interface UseCreateInboundCheckParams {
  inboundId: number;
  reqDto: CreateInboundCheckRequestDto;
}

export interface CreateInboundCheckModalInfo extends ModalInfoBase {
  key: "createInboundCheck";
  inboundSchedule?: InboundScheduleResponseDto;
  inboundCheck?: InboundCheckResponseDto;
}

export interface CreateInboundPutAwayModalInfo extends ModalInfoBase {
  key: "createInboundPutAway";
  inboundCheck: InboundCheckResponseDto;
}

export interface InboundFilter {
  number?: string;
  startDate?: string;
  endDate?: string;
}
