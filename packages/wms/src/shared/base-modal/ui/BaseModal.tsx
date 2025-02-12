import { ReactNode, useCallback } from "react";
import { useModalStore } from "../model/modalStore";
import styles from "./BaseModal.module.css";
import "@shared/config/styles/keyframes.module.css";

interface BaseModalProps {
  children: ReactNode;
}

export const BaseModal = ({ children }: BaseModalProps) => {
  const { closeModal } = useModalStore();

  const handleCloseModal = useCallback(() => {
    closeModal();
  }, [closeModal]);

  return (
    <div className={styles.wrapper} onClick={handleCloseModal}>
      <div
        className={`${styles.container} shadow-md`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
