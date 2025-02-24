import { create } from 'zustand';
import { OutboundTask } from '@/pages/tasklist/types/tasktypes';
import { outboundData } from '@/shared/api/mocks';

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
      pickingSeq: number;
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
  setPickingList: (task: OutboundTask) => {
    const selectedOutbound = outboundData.find((item) => item.outboundId === task.outboundId);
    if (selectedOutbound) {
      set({
        pickingList: {
          pickingId: String(task.outboundId),
          items: selectedOutbound.lotLocations.map((lot, index) => {
            return {
              id: lot.lotId,
              code: lot.productCode,
              name: lot.productName,
              image: lot.productImage,
              quantity: 1,
              pickingSeq: index + 1,
              location: {
                zone: lot.zone,
                aisle: String(lot.aisle).padStart(2, '0'),
                rack: String(lot.rowNum).padStart(2, '0'),
                floor: String(lot.floor).padStart(2, '0')
              },
              isLocationScanned: false,
              isItemScanned: false
            };
          }),
          currentItemIndex: 0
        }
      });
    }
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