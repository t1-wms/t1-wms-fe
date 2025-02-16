import { ProductListDto } from "@/entities";
import { ModalInfoBase } from "@/shared";

export interface OrderResponseDto {
  orderId: number;
  orderNumber: string;
  orderStatus: string;
  supplierName: string;
  orderDate: string;
  orderQuantity: number;
  isApproved: boolean;
  isReturnOrder: boolean;
  deliveryDeadline: string;
  orderProductList: ProductListDto[];
}

export interface CreateOrderModalInfo extends ModalInfoBase {
  key: "createOrder";
  order?: OrderResponseDto;
}

export interface OrderFilter {
  number?: string;
  startDate?: string;
  endDate?: string;
}
