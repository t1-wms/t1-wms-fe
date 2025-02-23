import { BinResponseDto } from "@/features";

export interface ProductInBin {
  productCode: string;
  productName: string;
  productImageUrl: string;
}

export interface Lot {
  lotId: number;
  lotNumber: string;
  productId: number;
  binId: number;
  status: string;
  inboundId: number;
  outboundId: number;
  productInBinDto: ProductInBin;
}

export interface Bin {
  binId: number;
  binCode: string;
  zone: string;
  aisle: number;
  row: number;
  floor: number;
  amount: number;
  lotList: Lot[];
}

export interface RackProps {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  isOccupied: boolean;
  zone: string;
  aisle: number;
  row: number;
  binData?: BinResponseDto[];
}
