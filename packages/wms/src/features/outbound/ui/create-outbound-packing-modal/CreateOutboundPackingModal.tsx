import styles from "./CreateOutboundPackingModal.module.css";
import { BasicModal, useModalStore } from "@/shared";
import {
  CreateOutboundPackingModalInfo,
  OutboundPackingResponseDto,
  OutboundPickingResponseDto,
} from "../../model";
import { useMemo } from "react";
import { OutboundProductTable } from "@/features/product";
import { CreateOutboundPackingForm } from "../create-outbound-packing-form";

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
  // const queryClient = useQueryClient();

  const handleSubmitValid = (outboundPackingDate: string) => {
    console.log(outboundPackingDate);
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
