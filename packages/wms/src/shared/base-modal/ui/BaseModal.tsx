import "@shared/config/styles/keyframes.module.css";
import { ReactNode } from "react";
import styles from "./BaseModal.module.css";

interface BaseModalProps {
  children: ReactNode;
}

export const BaseModal = ({ children }: BaseModalProps) => {
  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.container} shadow-md`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
