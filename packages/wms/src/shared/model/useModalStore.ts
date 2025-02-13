import { create } from "zustand";
import { ModalInfoBase } from "./types";

interface ModalStore {
  openedModal: ModalInfoBase | null;
  openModal: (modal: ModalInfoBase) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  openedModal: null,
  openModal: (modal) => set(() => ({ openedModal: modal })),
  closeModal: () => set(() => ({ openedModal: null })),
}));
