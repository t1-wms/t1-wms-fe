import { ReactNode } from "react";
import styles from "./BaseDrawer.module.css";

interface BaseDrawerProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export const BaseDrawer = ({ title, children, onClose }: BaseDrawerProps) => {
  return (
    <div className={styles.wrapper} onClick={onClose}>
      <div className={styles.container}>
        <div
          className={`${styles.box} shadow-md`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`${styles.title} font-h4`}>{title}</div>
          {children}
        </div>
      </div>
    </div>
  );
};
