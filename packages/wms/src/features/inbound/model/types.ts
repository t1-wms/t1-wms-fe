import { ProductListDto } from "@/entities";

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

export interface InboundFilter {
  number?: string;
  startDate?: string;
  endDate?: string;
}
