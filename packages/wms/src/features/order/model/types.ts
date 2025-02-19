import { ProductListDto } from "@/entities";
import { ModalInfoBase } from "@/shared";

export interface OrderChartData {
  notApproved: number;
  approved: number;
}

export interface ProductInSupplierDto {
  productId: number;
  supplierId: number;
  productCode: string;
  productName: string;
}

export interface SupplierProductDto {
  productId: number;
  productCode: string;
  productName: string;
  productCount: number;
}

export interface CreateOrderDefaultValues {
  supplierId: number;
  supplierName: string;
  productList: SupplierProductDto[];
}

export interface SupplierResponseDto {
  supplierId: number;
  supplierName: string;
  businessNumber: string;
  representativeName: string;
  address: string;
  supplierPhone: string;
  managerPhone: string;
  productList: ProductInSupplierDto[];
}

export interface OrderResponseDto {
  orderId: number;
  orderNumber: string;
  orderStatus: string;
  supplierId: number;
  supplierName: string;
  orderDate: string;
  orderQuantity: number;
  isApproved: boolean;
  isReturnOrder: boolean;
  deliveryDeadline: string;
  orderProductList: ProductListDto[];
}

export interface CreateOrderRequestDto {
  supplierId: number;
  productList: SupplierProductDto[];
}

export interface CreateOrderModalInfo extends ModalInfoBase {
  key: "createOrder";
  supplier?: SupplierResponseDto;
  order?: OrderResponseDto;
}

export interface SupplierFilter {
  businessNumber?: string;
}

export interface OrderFilter {
  number?: string;
  startDate?: string;
  endDate?: string;
}
