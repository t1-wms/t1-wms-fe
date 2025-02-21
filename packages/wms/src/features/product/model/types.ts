export interface ProductResponseDto {
  productId: number;
  productCode: string;
  productName: string;
  purchasePrice: number;
  salePrice: number;
  productCount: number;
  availableQuantity: number;
  supplierName: string;
  category: string;
  threshold: number;
  leadTime: number;
  locationBinCode: string;
  abcGrade: string;
}

export interface ProductFilter {
  productCode?: string;
}
