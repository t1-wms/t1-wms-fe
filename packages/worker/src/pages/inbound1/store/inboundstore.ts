import { create } from 'zustand';
import { PickingItem } from '@/shared/types/items';
import { inboundData } from '@/shared/api/mocks';

interface InboundStore {
  inboundList: {
    inboundId: string;
    checkNumber?: string;
    items: PickingItem[];
    currentItemIndex: number;
    rejectedItems: number[];
  };
  setInboundTask: (inboundId: number) => void;
  setInboundLocations: (checkNumber: string, lotList: any[]) => void;
  setInspectionComplete: (acceptedItems: number[], rejectedItems: number[]) => void;
  setItemScanned: () => void;
  setLocationScanned: () => void;
  moveToNextItem: () => void;
  resetInbound: () => void;
}

export const useInboundStore = create<InboundStore>((set) => ({
  inboundList: {
    inboundId: '',
    items: [],
    currentItemIndex: 0,
    rejectedItems: []
  },

  setInboundTask: (inboundId: number) => {
    const selectedInbound = inboundData.find(item => item.inboundId === inboundId);
    if (selectedInbound) {
      set({
        inboundList: {
          inboundId: String(inboundId),
          items: selectedInbound.productList.map((product, index) => ({
            id: product.productId,
            code: product.productCode,
            name: product.productName,
            image: product.productImage,
            quantity: 1,
            pickingSeq: index + 1,
            location: {
              zone: '',
              aisle: '',
              rack: '',
              floor: ''
            },
            isLocationScanned: false,
            isItemScanned: false,
            isInspectionComplete: false
          })),
          currentItemIndex: 0,
          rejectedItems: []
        }
      });
    }
  },

  setInboundLocations: (checkNumber: string, lotList) => set((state) => ({
    inboundList: {
      ...state.inboundList,
      checkNumber,
      items: state.inboundList.items.map(item => {
        const lot = lotList.find(l => l.ProductId === item.id);
        if (lot) {
          const [zone, aisle, rack, floor] = lot.binCode.split('-');
          return {
            ...item,
            location: {
              zone,
              aisle,
              rack,
              floor
            }
          };
        }
        return item;
      })
    }
  })),

  setInspectionComplete: (acceptedItems: number[], rejectedItems: number[]) => set((state) => ({
    inboundList: {
      ...state.inboundList,
      rejectedItems,
      items: state.inboundList.items.map(item => ({
        ...item,
        isInspectionComplete: true,
        // 정상 품목과 불량 품목에 따라 스캔 상태 설정
        isLocationScanned: rejectedItems.includes(item.id) || !acceptedItems.includes(item.id),
        isItemScanned: rejectedItems.includes(item.id) || !acceptedItems.includes(item.id)
      }))
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

  moveToNextItem: () => set((state) => {
    let nextIndex = state.inboundList.currentItemIndex + 1;
    
    while (
      nextIndex < state.inboundList.items.length && 
      state.inboundList.rejectedItems.includes(state.inboundList.items[nextIndex].id)
    ) {
      nextIndex++;
    }

    return {
      inboundList: {
        ...state.inboundList,
        currentItemIndex: nextIndex
      }
    };
  }),

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