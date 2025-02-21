export interface ProductThresholdDto {
  productId: number;
  productCode: string;
  productName: string;
  productCount: number;
  threshold: number;
}

export interface UpdateThresholdRequestDto {
  productId: number;
  threshold: number;
}
