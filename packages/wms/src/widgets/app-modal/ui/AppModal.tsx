import {
  CreateInboundCheckModalInfo,
  CreateInboundPutAwayModal,
  CreateInboundPutAwayModalInfo,
  CreateOrderModalInfo,
  CreateOutboundAssignModal,
  CreateOutboundAssignModalInfo,
  CreateOutboundLoadingModal,
  CreateOutboundLoadingModalInfo,
  CreateOutboundPackingModal,
  CreateOutboundPackingModalInfo,
  CreateOutboundPickingModal,
  CreateOutboundPickingModalInfo,
  CreateOutboundPlanModal,
  CreateOutboundPlanModalInfo,
  CreateUserModal,
  CreateUserModalInfo,
} from "@/features";
import { CreateInboundCheckModal } from "@/features/inbound/ui/create-inbound-check-modal";
import { CreateOrderModal } from "@/features/order/ui/create-order-modal";
import {
  BasicModal,
  BasicModalInfo,
  ModalInfoBase,
  useModalStore,
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

const isCreateOutboundLoadingModalInfo = (
  info: ModalInfoBase
): info is CreateOutboundLoadingModalInfo => {
  return info.key === "createOutboundLoading";
};

const isCreateOrderModalInfo = (
  info: ModalInfoBase
): info is CreateOrderModalInfo => {
  return info.key === "createOrder";
};

const isCreateInboundCheckModalInfo = (
  info: ModalInfoBase
): info is CreateInboundCheckModalInfo => {
  return info.key === "createInboundCheck";
};

const isCreateInboundPutAwayModalInfo = (
  info: ModalInfoBase
): info is CreateInboundPutAwayModalInfo => {
  return info.key === "createInboundPutAway";
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
    ) : isCreateOutboundLoadingModalInfo(openedModal) ? (
      <CreateOutboundLoadingModal modalInfo={openedModal} />
    ) : isCreateOrderModalInfo(openedModal) ? (
      <CreateOrderModal modalInfo={openedModal} />
    ) : isCreateInboundCheckModalInfo(openedModal) ? (
      <CreateInboundCheckModal modalInfo={openedModal} />
    ) : isCreateInboundPutAwayModalInfo(openedModal) ? (
      <CreateInboundPutAwayModal modalInfo={openedModal} />
    ) : (
      <></>
    )
  ) : undefined;
};
