// // 공통 타입
// export interface Product {
//   productId: number;
//   productCode: string;
//   productName: string;
// }

//입고 작업 타입
export interface InboundTask {
  type: 'inbound';
  inboundId: number;
  productList: {
    productId: number;
    productCode: string;
    productName: string;
    productImage?: string;
  }[];
}

//출고 작업 타입
export interface OutboundTask {
  type: 'outbound';
  outboundId: number;
  outboundAssignNumber: string;
  lotLocations: LotLocation[];
}

// 타입 가드 함수
export const isInboundTask = (task: Task): task is InboundTask => {
  return 'productList' in task;
};

export const isOutboundTask = (task: Task): task is OutboundTask => {
  return 'lotLocations' in task;
};

export interface LotLocation {
  lotId: number;
  binId?: number;
  binCode: string;
  zone: string;
  aisle: number;
  rowNum: number;
  floor: number;
  productImage: string;
  productName: string;
  productCode: string;
}


export interface TaskListPageProps {
  defaultTab?: TabType;
}

export type Task = InboundTask | OutboundTask;

export type TabType = 'inbound' | 'outbound';
