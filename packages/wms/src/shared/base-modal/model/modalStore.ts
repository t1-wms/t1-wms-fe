import { create } from "zustand";

interface ModalStore {
  openedModal: any;
  openModal: (modal: any) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  openedModal: false,
  openModal: (modal) => set(() => ({ openedModal: modal })),
}));
