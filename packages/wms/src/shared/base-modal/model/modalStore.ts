import { BasicModalInfo } from "@shared/basic-modal";
import { create } from "zustand";

export type ModalInfo = BasicModalInfo;

interface ModalStore {
  openedModal: ModalInfo | null;
  openModal: (modal: ModalInfo) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  openedModal: null,
  openModal: (modal) => set(() => ({ openedModal: modal })),
  closeModal: () => set(() => ({ openedModal: null })),
}));
