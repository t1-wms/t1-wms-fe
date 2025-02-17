export interface ProductResponseDto {
  productId: number;
  productCode: string;
  productName: string;
  purchasePrice: number;
  salePrice: number;
  lotUnit: number;
  supplierId: number;
  stockLotCount: number;
  category: string;
  threshold: number;
  leadTime: number;
  locationBinCode: string;
  abcGrade: string;
}
