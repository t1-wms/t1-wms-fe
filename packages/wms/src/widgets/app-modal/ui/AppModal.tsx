import {
  CreateOutboundAssignModal,
  CreateOutboundAssignModalInfo,
  CreateOutboundPackingModal,
  CreateOutboundPackingModalInfo,
  CreateOutboundPickingModal,
  CreateOutboundPickingModalInfo,
  CreateOutboundPlanModal,
  CreateOutboundPlanModalInfo,
  CreateUserModal,
  CreateUserModalInfo,
} from "@/features";
import {
  ModalInfoBase,
  useModalStore,
  BasicModal,
  BasicModalInfo,
} from "@/shared";

const isBasicModalInfo = (info: ModalInfoBase): info is BasicModalInfo => {
  return info.key === "basic";
};

const isCreateUserModalInfo = (
  info: ModalInfoBase
): info is CreateUserModalInfo => {
  return info.key === "createUser";
};

const isCreateOutboundPlanModalInfo = (
  info: ModalInfoBase
): info is CreateOutboundPlanModalInfo => {
  return info.key === "createOutboundPlan";
};

const isCreateOutboundAssignModalInfo = (
  info: ModalInfoBase
): info is CreateOutboundAssignModalInfo => {
  return info.key === "createOutboundAssign";
};

const isCreateOutboundPickingModalInfo = (
  info: ModalInfoBase
): info is CreateOutboundPickingModalInfo => {
  return info.key === "createOutboundPicking";
};

const isCreateOutboundPackingModalInfo = (
  info: ModalInfoBase
): info is CreateOutboundPackingModalInfo => {
  return info.key === "createOutboundPacking";
};

export const AppModal = () => {
  const { openedModal } = useModalStore();

  return openedModal ? (
    isBasicModalInfo(openedModal) ? (
      <BasicModal modalInfo={openedModal}>
        <div style={{ width: "800px" }}>asdf</div>
      </BasicModal>
    ) : isCreateUserModalInfo(openedModal) ? (
      <CreateUserModal modalInfo={openedModal}></CreateUserModal>
    ) : isCreateOutboundPlanModalInfo(openedModal) ? (
      <CreateOutboundPlanModal
        modalInfo={openedModal}
      ></CreateOutboundPlanModal>
    ) : isCreateOutboundAssignModalInfo(openedModal) ? (
      <CreateOutboundAssignModal modalInfo={openedModal} />
    ) : isCreateOutboundPickingModalInfo(openedModal) ? (
      <CreateOutboundPickingModal modalInfo={openedModal} />
    ) : isCreateOutboundPackingModalInfo(openedModal) ? (
      <CreateOutboundPackingModal modalInfo={openedModal} />
    ) : (
      <></>
    )
  ) : undefined;
};
