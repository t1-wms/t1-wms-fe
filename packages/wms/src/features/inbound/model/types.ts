import { ProductListDto } from "@/entities";
import { ModalInfoBase } from "@/shared";

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
  productList: ProductListDto[];
}

export interface CreateInboundCheckModalInfo extends ModalInfoBase {
  key: "createInboundCheck";
  inboundSchedule?: InboundScheduleResponseDto;
  inboundCheck?: InboundCheckResponseDto;
}

export interface InboundFilter {
  number?: string;
  startDate?: string;
  endDate?: string;
}
