import styles from "./CreateOutboundLoadingModal.module.css";
import { BasicModal, useModalStore } from "@/shared";
import {
  CreateOutboundLoadingModalInfo,
  OutboundLoadingResponseDto,
  OutboundPackingResponseDto,
} from "../../model";
import { useMemo } from "react";
import { OutboundProductTable } from "@/features/product";
import { CreateOutboundLoadingForm } from "../create-outbound-loading-form";

interface CreateOutboundLoadingModalProps {
  modalInfo: CreateOutboundLoadingModalInfo;
}

const isOutboundLoading = (
  outbound: OutboundPackingResponseDto | OutboundLoadingResponseDto
): outbound is OutboundLoadingResponseDto => {
  return "outboundLoadingNumber" in outbound;
};

export const CreateOutboundLoadingModal = ({
  modalInfo,
}: CreateOutboundLoadingModalProps) => {
  const { outbound } = modalInfo;

  const defaultValues: OutboundLoadingResponseDto = useMemo(() => {
    return isOutboundLoading(outbound)
      ? {
          ...outbound,
        }
      : {
          ...outbound,
          outboundLoadingNumber: "",
          outboundLoadingDate: new Date(Date.now())
            .toISOString()
            .substring(0, 10),
        };
  }, [outbound]);

  const { closeModal } = useModalStore();
  // const queryClient = useQueryClient();

  const handleSubmitValid = (outboundLoadingDate: string) => {
    console.log(outboundLoadingDate);
  };

  return (
    <BasicModal
      modalInfo={{
        key: "basic",
        title: `출하상차 ${isOutboundLoading(outbound) ? "수정" : "추가"}`,
        buttons: [
          {
            label: "취소",
            onClick: closeModal,
            color: "gray",
          },
          { label: "저장", onClick: () => {}, form: "createOutboundLoading" },
        ],
      }}
    >
      <div className={styles.container}>
        <CreateOutboundLoadingForm
          onSubmitValid={handleSubmitValid}
          defaultValues={defaultValues}
        />
        <p className="font-b-md">출하상차 품목</p>
        <div className={styles["table-box"]}>
          <OutboundProductTable data={outbound.productList} />
        </div>
      </div>
    </BasicModal>
  );
};
