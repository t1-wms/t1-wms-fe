import styles from "./CreateOutboundAssignModal.module.css";
import { BasicModal, useModalStore } from "@/shared";
import {
  CreateOutboundAssignModalInfo,
  OutboundAssignResponseDto,
  OutboundPlanResponseDto,
  useCreateOutboundAssign,
  useUpdateOutboundAssign,
} from "../../model";
import { useMemo } from "react";
import { CreateOutboundAssignForm } from "../create-outbound-assign-form";
import { OutboundProductTable } from "@/features/product";
import { useQueryClient } from "@tanstack/react-query";

interface CreateOutboundAssignModalProps {
  modalInfo: CreateOutboundAssignModalInfo;
}

const isOutboundAssign = (
  outbound: OutboundPlanResponseDto | OutboundAssignResponseDto
): outbound is OutboundAssignResponseDto => {
  return "outboundAssignNumber" in outbound;
};

export const CreateOutboundAssignModal = ({
  modalInfo,
}: CreateOutboundAssignModalProps) => {
  const { outbound } = modalInfo;

  const defaultValues: OutboundAssignResponseDto = useMemo(() => {
    return isOutboundAssign(outbound)
      ? {
          ...outbound,
        }
      : {
          ...outbound,
          outboundId: -1,
          outboundAssignNumber: "",
          outboundAssignDate: new Date(Date.now())
            .toISOString()
            .substring(0, 10),
        };
  }, [outbound]);

  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const { mutate: createOutboundAssign } = useCreateOutboundAssign(queryClient);
  const { mutate: updateOutboundAssign } = useUpdateOutboundAssign(queryClient);

  const handleSubmitValid = (outboundAssignDate: string) => {
    if (!isOutboundAssign(outbound)) {
      // 출고지시 생성
      createOutboundAssign(outbound.outboundPlanId);

      closeModal();
    } else {
      // 출고지시 수정
      updateOutboundAssign({
        outboundPlanId: outbound.outboundId,
        outboundAssignDate,
      });

      closeModal();
    }
  };

  return (
    <BasicModal
      modalInfo={{
        key: "basic",
        title: `출고지시 ${isOutboundAssign(outbound) ? "수정" : "추가"}`,
        buttons: [
          {
            label: "취소",
            onClick: closeModal,
            color: "gray",
          },
          { label: "저장", onClick: () => {}, form: "createOutboundAssign" },
        ],
      }}
    >
      <div className={styles.container}>
        <CreateOutboundAssignForm
          onSubmitValid={handleSubmitValid}
          defaultValues={defaultValues}
          isUpdate={isOutboundAssign(outbound)}
        />
        <p className="font-b-md">출고지시 품목</p>
        <div className={styles["table-box"]}>
          <OutboundProductTable data={outbound.productList} />
        </div>
      </div>
    </BasicModal>
  );
};
