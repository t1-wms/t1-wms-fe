import { ModalInfo, useModalStore } from "@shared/base-modal";
import { BasicModal, BasicModalInfo } from "@shared/basic-modal";
import { ReactNode } from "react";

interface ModalProviderProps {
  children: ReactNode;
}

const isBasicModalInfo = (info: ModalInfo): info is BasicModalInfo => {
  return "title" in info;
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const { openedModal } = useModalStore();

  console.log(openedModal);

  if (!openedModal) return children;

  if (isBasicModalInfo(openedModal)) {
    return (
      <>
        {children}
        {openedModal && isBasicModalInfo(openedModal) ? (
          <BasicModal info={openedModal}>
            <div style={{ width: "800px" }}>asdf</div>
          </BasicModal>
        ) : (
          <></>
        )}
      </>
    );
  }

  return children;
};
