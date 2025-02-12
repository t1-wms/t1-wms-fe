import { useCallback } from "react";
import { useModalStore } from "../model/modalStore";
import styles from "./BaseModal.module.css";
import "@shared/config/styles/keyframes.module.css";

export const BaseModal = () => {
  const { openModal } = useModalStore();

  const handleCloseModal = useCallback(() => {
    openModal(null);
  }, [openModal]);

  return (
    <div className={styles.wrapper} onClick={handleCloseModal}>
      <div
        className={`${styles.container} shadow-md`}
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
};
