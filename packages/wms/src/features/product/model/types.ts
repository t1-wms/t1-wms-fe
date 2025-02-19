export interface ProductResponseDto {
  productId: number;
  productCode: string;
  productName: string;
  purchasePrice: number;
  salePrice: number;
  productCount: number;
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
