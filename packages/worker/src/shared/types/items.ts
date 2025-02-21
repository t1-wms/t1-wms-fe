// 서버로부터 받는 제품 데이터 타입
export interface Product {
  id: number;                // product_id
  code: string;             // product_code
  name: string;             // product_name
  image?: string;           // product_image
  purchasePrice: number;    // purchase_price
  salePrice: number;        // sale_price
  lotUnit: number;          // lot_unit
  supplierId: number;       // supplier_id
  stockLotCount: number;    // stock_lot_count
  category: string;         // category
  threshold: number;        // threshold
  leadTime: number;         // lead_time
  locationBinCode: string;  // location_bin_code
}

// 위치 정보 타입
export interface Location {
  zone: string;
  aisle: string;
  rack: string;
  shelf: string;
}

//스캔 작업용 아이템 타입
export interface ScanningItem extends Pick<Product, 'id' | 'code' | 'name' | 'image'> {
  quantity: number;
  location: Location;
  scanned?: boolean;
}


// 스캔 컴포넌트 props
export interface LocationScanProps extends Location {
  onLocationScan: () => void;     // 위치 스캔 완료시 실행할 함수
  isLocationScanned: boolean;      // 위치 스캔 완료 여부
}

export interface ItemScanProps {
  item: ScanningItem;
  onScanComplete: () => void;
}

export interface PickingItem extends ScanningItem {
  pickingSeq: number;  // 집품 순서
  isLocationScanned: boolean;  // 위치 스캔 완료 여부
  isItemScanned: boolean;     // 물품 스캔 완료 여부
  isInspectionComplete?: boolean; // 입하 검사 완료 여부 추가
}

export interface PickingList {
  pickingId: string;
  items: PickingItem[];
  currentItemIndex: number;
}