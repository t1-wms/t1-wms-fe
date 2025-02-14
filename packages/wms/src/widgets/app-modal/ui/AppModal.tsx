import {
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
    ) : (
      <></>
    )
  ) : undefined;
};
