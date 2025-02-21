export interface ProductThresholdDto {
  productId: number;
  productCode: string;
  productName: string;
  productCount: number;
  threshold: number;
  availableQuantity: number;
}

export interface UpdateThresholdRequestDto {
  productId: number;
  threshold: number;
}

export interface ProductInLotDto {
  productCode: string;
  productName: string;
  productImageUrl: string;
}

export interface LotInBinDto {
  lotId: number;
  lotNumber: string;
  productId: number;
  binId: number;
  status: string;
  inboundId: number;
  outboundId: number;
  productInBinDto: ProductInLotDto;
}

export interface BinResponseDto {
  binId: number;
  binCode: string;
  zone: string;
  aisle: number;
  row: number;
  floor: number;
  amount: number;
  lotList: LotInBinDto[];
}
