import { useModalStore } from "@shared/base-modal";
import { ReactNode } from "react";
import { BaseModal } from "@shared/base-modal";

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const { openedModal } = useModalStore();

  return (
    <>
      {children}
      {openedModal && <BaseModal />}
    </>
  );
};
