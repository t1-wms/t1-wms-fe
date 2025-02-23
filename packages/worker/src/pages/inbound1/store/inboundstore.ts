import { create } from 'zustand';
import { PickingItem } from '@/shared/types/items';

const dummyInboundItems: PickingItem[] = [
  // {
  //   pickingSeq: 1,
  //   id: 1,
  //   code: "AX-100",
  //   name: "부품 A",
  //   quantity: 2,
  //   location: {
  //     zone: "A",
  //     aisle: "01",
  //     rack: "01",
  //     shelf: "03"
  //   },
  //   isLocationScanned: false,
  //   isItemScanned: false,
  //   isInspectionComplete: false
  // },
  // {
  //   pickingSeq: 2,
  //   id: 2,
  //   code: "BX-200",
  //   name: "부품 B",
  //   quantity: 1,
  //   location: {
  //     zone: "B",
  //     aisle: "02",
  //     rack: "03",
  //     shelf: "01"
  //   },
  //   isLocationScanned: false,
  //   isItemScanned: false,
  //   isInspectionComplete: false
  // }
];

interface InboundStore {
  inboundList: {
    inboundId: string;
    items: PickingItem[];
    currentItemIndex: number;
  };
  setInspectionComplete: () => void;
  setItemScanned: () => void;
  setLocationScanned: () => void;
  moveToNextItem: () => void;
  resetInbound: () => void;
}

export const useInboundStore = create<InboundStore>((set) => ({
  inboundList: {
    inboundId: 'I001',
    items: dummyInboundItems, // 더미데이터 초기화
    currentItemIndex: 0
  },

  setInspectionComplete: () => set((state) => ({
    inboundList: {
      ...state.inboundList,
      items: state.inboundList.items.map((item, index) =>
        index === state.inboundList.currentItemIndex
          ? { ...item, isInspectionComplete: true }
          : item
      )
    }
  })),

  setItemScanned: () => set((state) => ({
    inboundList: {
      ...state.inboundList,
      items: state.inboundList.items.map((item, index) =>
        index === state.inboundList.currentItemIndex
          ? { ...item, isItemScanned: true }
          : item
      )
    }
  })),

  setLocationScanned: () => set((state) => ({
    inboundList: {
      ...state.inboundList,
      items: state.inboundList.items.map((item, index) =>
        index === state.inboundList.currentItemIndex
          ? { ...item, isLocationScanned: true }
          : item
      )
    }
  })),

  moveToNextItem: () => set((state) => ({
    inboundList: {
      ...state.inboundList,
      currentItemIndex: state.inboundList.currentItemIndex + 1
    }
  })),

  resetInbound: () => set((state) => ({
    inboundList: {
      ...state.inboundList,
      currentItemIndex: 0,
      items: state.inboundList.items.map(item => ({
        ...item,
        isInspectionComplete: false,
        isItemScanned: false,
        isLocationScanned: false
      }))
    }
  }))
}));