import { create } from 'zustand';
import { OutboundTask } from '@/pages/tasklist/types/tasktypes';

interface PickingStore {
  pickingList: {
    pickingId: string;
    items: Array<{
      id: number;
      code: string;
      name: string;
      image?: string;
      location: {
        zone: string;
        aisle: string;
        rack: string;
        floor: string;
      };
      isLocationScanned: boolean;
      isItemScanned: boolean;
      quantity: number;
    }>;
    currentItemIndex: number;
  };
  setPickingList: (task: OutboundTask) => void;
  setLocationScanned: () => void;
  setItemScanned: () => void;
  moveToNextItem: () => void;
  resetPicking: () => void;
}

export const usePickingStore = create<PickingStore>((set) => ({
  pickingList: {
    pickingId: '',
    items: [],
    currentItemIndex: 0
  },

  setPickingList: (task: OutboundTask) => set({
    pickingList: {
      pickingId: task.outboundAssignNumber,
      items: task.lotLocations.map(lot => ({
        id: lot.lotId,
        code: lot.productCode,
        name: lot.productName,
        image: lot.productImage,  
        location: {
          zone: lot.zone,
          aisle: lot.aisle.toString(),
          rack: lot.rowNum.toString(),
          floor: lot.floor.toString()
        },
        isLocationScanned: false,
        isItemScanned: false,
        quantity: 1
      })),
      currentItemIndex: 0
    }
  }),

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
      currentItemIndex: state.pickingList.currentItemIndex + 1,
      items: state.pickingList.items.map((item, index) => 
        // 다음 아이템의 스캔 상태를 초기화
        index === state.pickingList.currentItemIndex + 1 
          ? { 
              ...item, 
              isLocationScanned: false, 
              isItemScanned: false      
            }
          : item
      )
    }
  })),
  
  resetPicking: () => set({
    pickingList: {
      pickingId: '',
      items: [],
      currentItemIndex: 0
    }
  })
}));