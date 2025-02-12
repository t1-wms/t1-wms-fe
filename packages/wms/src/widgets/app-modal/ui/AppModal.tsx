import { BasicModal, BasicModalInfo } from "@shared/basic-modal";
import { ModalInfoBase, useModalStore } from "@shared/model";

const isBasicModalInfo = (info: ModalInfoBase): info is BasicModalInfo => {
  return "title" in info;
};

export const AppModal = () => {
  const { openedModal } = useModalStore();

  if (openedModal && isBasicModalInfo(openedModal)) {
    return openedModal && isBasicModalInfo(openedModal) ? (
      <BasicModal modalInfo={openedModal}>
        <div style={{ width: "800px" }}>asdf</div>
      </BasicModal>
    ) : (
      <></>
    );
  }
};
