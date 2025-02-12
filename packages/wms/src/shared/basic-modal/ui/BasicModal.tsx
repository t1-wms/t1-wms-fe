import { BaseModal } from "@shared/base-modal";
import styles from "./BasicModal.module.css";
import { ReactNode } from "react";
import { BasicModalInfo } from "../model/types";
import { MainButton } from "@shared/main-button";

export interface BasicModalProps {
  modalInfo: BasicModalInfo;
  children: ReactNode;
}

export const BasicModal = ({ modalInfo, children }: BasicModalProps) => {
  const { title, buttons = [] } = modalInfo;
  return (
    <BaseModal>
      <h1 className={`${styles.title} font-h4`}>{title}</h1>
      <div className={styles.content}>{children}</div>
      {buttons.length > 0 && (
        <div className={styles.footer}>
          {buttons.map((button, i) => (
            <MainButton key={i} color={button.color} onClick={button.onClick}>
              {button.label}
            </MainButton>
          ))}
        </div>
      )}
    </BaseModal>
  );
};
