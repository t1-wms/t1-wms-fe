import styles from "./CreateOutboundPickingModal.module.css";
import { BasicModal, useModalStore } from "@/shared";
import {
  CreateOutboundPickingModalInfo,
  OutboundPickingResponseDto,
  OutboundAssignResponseDto,
} from "../../model";
import { useMemo } from "react";
import { OutboundProductTable } from "@/features/product";
import { CreateOutboundPickingForm } from "../create-outbound-picking-form";

interface CreateOutboundPickingModalProps {
  modalInfo: CreateOutboundPickingModalInfo;
}

const isOutboundPicking = (
  outbound: OutboundAssignResponseDto | OutboundPickingResponseDto
): outbound is OutboundPickingResponseDto => {
  return "outboundPickingNumber" in outbound;
};

export const CreateOutboundPickingModal = ({
  modalInfo,
}: CreateOutboundPickingModalProps) => {
  const { outbound } = modalInfo;

  const defaultValues: OutboundPickingResponseDto = useMemo(() => {
    return isOutboundPicking(outbound)
      ? {
          ...outbound,
        }
      : {
          ...outbound,
          outboundPickingNumber: "",
          outboundPickingDate: new Date(Date.now())
            .toISOString()
            .substring(0, 10),
        };
  }, [outbound]);

  const { closeModal } = useModalStore();
  // const queryClient = useQueryClient();

  const handleSubmitValid = () => {};

  return (
    <BasicModal
      modalInfo={{
        key: "basic",
        title: `출고피킹 ${isOutboundPicking(outbound) ? "수정" : "추가"}`,
        buttons: [
          {
            label: "취소",
            onClick: closeModal,
            color: "gray",
          },
          { label: "저장", onClick: () => {}, form: "createOutboundPicking" },
        ],
      }}
    >
      <div className={styles.container}>
        <CreateOutboundPickingForm
          onSubmitValid={handleSubmitValid}
          defaultValues={defaultValues}
        />
        <p className="font-b-md">출고피킹 품목</p>
        <div className={styles["table-box"]}>
          <OutboundProductTable data={outbound.productList} />
        </div>
      </div>
    </BasicModal>
  );
};
