import { BasicModal, useModalStore } from "@/shared";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  CreateInboundPutAwayModalInfo,
  InboundPutAwayDefaultValues,
  useCreateInboundPutAway,
} from "../../model";
import { CreateInboundPutAwayForm } from "../create-inbound-put-away-form";
import { InboundLotTable } from "../inbound-lot-table";
import styles from "./CreateInboundPutAwayModal.module.css";

interface CreateInboundPutAwayModalProps {
  modalInfo: CreateInboundPutAwayModalInfo;
}

export const CreateInboundPutAwayModal = ({
  modalInfo,
}: CreateInboundPutAwayModalProps) => {
  const { inboundCheck } = modalInfo;

  const inboundId = inboundCheck.inboundId;

  const defaultValues: InboundPutAwayDefaultValues = useMemo(() => {
    return {
      inboundId,
      checkDate: inboundCheck.checkDate,
      scheduleNumber: inboundCheck.scheduleNumber,
      checkNumber: inboundCheck.checkNumber,
      lotList: inboundCheck.lotList,
    };
  }, [inboundId, inboundCheck]);

  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();

  const { mutate: createInboundPutAway } = useCreateInboundPutAway(queryClient);

  const handleSubmitValid = () => {
    createInboundPutAway(inboundId);
    closeModal();
  };

  return (
    <BasicModal
      modalInfo={{
        key: "basic",
        title: `입고적치 추가`,
        buttons: [
          {
            label: "취소",
            onClick: closeModal,
            color: "gray",
          },
          { label: "저장", onClick: () => {}, form: "createInboundPutAway" },
        ],
      }}
    >
      <div className={styles.container}>
        <CreateInboundPutAwayForm
          onSubmitValid={handleSubmitValid}
          defaultValues={defaultValues}
        />
        <div className={styles["table-box"]}>
          <div className={`${styles["table-wrapper"]} shadow-md`}>
            <InboundLotTable data={inboundCheck.lotList} />
          </div>
        </div>
      </div>
    </BasicModal>
  );
};
