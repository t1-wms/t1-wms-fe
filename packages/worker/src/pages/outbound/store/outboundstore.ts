import { create } from 'zustand';
import { PickingList, PickingItem } from '@/shared/types/items';

// 더미 데이터
const dummyPickingItems: PickingItem[] = [
  {
    pickingSeq: 1,
    id: 1,
    code: "AX-100",
    name: "부품 A",
    quantity: 2,
    location: {
      zone: "A",
      aisle: "01",
      rack: "01",
      shelf: "03"
    },
    isLocationScanned: false,
    isItemScanned: false
  },
  {
    pickingSeq: 2,
    id: 2,
    code: "BX-200",
    name: "부품 B",
    quantity: 1,
    location: {
      zone: "B",
      aisle: "02",
      rack: "03",
      shelf: "01"
    },
    isLocationScanned: false,
    isItemScanned: false
  }
];


interface PickingStore {
  pickingList: PickingList;
  setLocationScanned: () => void;
  setItemScanned: () => void;
  moveToNextItem: () => void;
  resetPicking: () => void;
}

export const usePickingStore = create<PickingStore>((set) => ({
  pickingList: {
    pickingId: 'P001',
    items: dummyPickingItems,
    currentItemIndex: 0
  },

  setLocationScanned: () => set((state) => ({
    pickingList: {
      ...state.pickingList,
      items: state.pickingList.items.map((item, index) => 
        index === state.pickingList.currentItemIndex
          ? { ...item, isLocationScanned: true }
          : item
      )
    }
  })),

  setItemScanned: () => set((state) => ({
    pickingList: {
      ...state.pickingList,
      items: state.pickingList.items.map((item, index) => 
        index === state.pickingList.currentItemIndex
          ? { ...item, isItemScanned: true }
          : item
      )
    }
  })),

  moveToNextItem: () => set((state) => ({
    pickingList: {
      ...state.pickingList,
      currentItemIndex: state.pickingList.currentItemIndex + 1
    }
  })),

  resetPicking: () => set((state) => ({
    pickingList: {
      ...state.pickingList,
      currentItemIndex: 0,
      items: state.pickingList.items.map(item => ({
        ...item,
        isLocationScanned: false,
        isItemScanned: false
      }))
    }
  }))
}));