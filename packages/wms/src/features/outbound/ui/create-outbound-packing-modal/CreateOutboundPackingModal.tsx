import styles from "./CreateOutboundPackingModal.module.css";
import { BasicModal, useModalStore } from "@/shared";
import {
  CreateOutboundPackingModalInfo,
  OutboundPackingResponseDto,
  OutboundPickingResponseDto,
  useCreateOutboundPacking,
  useUpdateOutboundPacking,
} from "../../model";
import { useMemo } from "react";
import { OutboundProductTable } from "@/features/product";
import { CreateOutboundPackingForm } from "../create-outbound-packing-form";
import { useQueryClient } from "@tanstack/react-query";

interface CreateOutboundPackingModalProps {
  modalInfo: CreateOutboundPackingModalInfo;
}

const isOutboundPacking = (
  outbound: OutboundPickingResponseDto | OutboundPackingResponseDto
): outbound is OutboundPackingResponseDto => {
  return "outboundPackingNumber" in outbound;
};

export const CreateOutboundPackingModal = ({
  modalInfo,
}: CreateOutboundPackingModalProps) => {
  const { outbound } = modalInfo;

  const defaultValues: OutboundPackingResponseDto = useMemo(() => {
    return isOutboundPacking(outbound)
      ? {
          ...outbound,
        }
      : {
          ...outbound,
          outboundPackingNumber: "",
          outboundPackingDate: new Date(Date.now())
            .toISOString()
            .substring(0, 10),
        };
  }, [outbound]);

  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();

  const { mutate: createOutboundPacking } =
    useCreateOutboundPacking(queryClient);
  const { mutate: updateOutboundPacking } =
    useUpdateOutboundPacking(queryClient);

  const handleSubmitValid = (outboundPackingDate: string) => {
    if (!isOutboundPacking(outbound)) {
      // 출고지시 생성
      createOutboundPacking(outbound.outboundPlanId);

      closeModal();
    } else {
      // 출고지시 수정
      updateOutboundPacking({
        outboundId: outbound.outboundId,
        outboundPackingDate,
      });

      closeModal();
    }
  };

  return (
    <BasicModal
      modalInfo={{
        key: "basic",
        title: `출고패킹 ${isOutboundPacking(outbound) ? "수정" : "추가"}`,
        buttons: [
          {
            label: "취소",
            onClick: closeModal,
            color: "gray",
          },
          { label: "저장", onClick: () => {}, form: "createOutboundPacking" },
        ],
      }}
    >
      <div className={styles.container}>
        <CreateOutboundPackingForm
          onSubmitValid={handleSubmitValid}
          defaultValues={defaultValues}
        />
        <p className="font-b-md">출고패킹 품목</p>
        <div className={styles["table-box"]}>
          <OutboundProductTable data={outbound.productList} />
        </div>
      </div>
    </BasicModal>
  );
};
