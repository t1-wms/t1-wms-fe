import styles from "./OutboundAssignDrawer.module.css";
import { BaseDrawer, MainButton, MainInput, useModalStore } from "@/shared";
import {
  CreateOutboundAssignModalInfo,
  OutboundAssignResponseDto,
} from "../../model";
import { OutboundProductTable } from "@/features";
import { useCallback } from "react";

interface OutboundAssignDrawerProps {
  data: OutboundAssignResponseDto;
  onClose: () => void;
}

export const OutboundAssignDrawer = ({
  data,
  onClose,
}: OutboundAssignDrawerProps) => {
  const {
    outboundScheduleNumber,
    outboundAssignNumber,
    outboundAssignDate,
    planDate,
    productionPlanNumber,
    productList,
  } = data;

  const { openModal } = useModalStore();

  const handleClickUpdate = useCallback(() => {
    const modalInfo: CreateOutboundAssignModalInfo = {
      key: "createOutboundAssign",
      outbound: data,
    };

    openModal(modalInfo);
  }, [openModal, data]);

  return (
    <BaseDrawer title={`출고지시 조회`} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles["input-box"]}>
          <MainInput
            defaultValue={outboundScheduleNumber}
            label="출고예정번호"
            error={null}
            width="fullWidth"
            disabled
          />
          <MainInput
            defaultValue={outboundAssignNumber}
            label="출고지시번호"
            error={null}
            width="fullWidth"
            disabled
          />
          <MainInput
            defaultValue={outboundAssignDate}
            label="출고지시날짜"
            error={null}
            width="fullWidth"
            disabled
          />
          <MainInput
            defaultValue={productionPlanNumber}
            label="주문번호"
            error={null}
            width="fullWidth"
            disabled
          />
          <MainInput
            defaultValue={planDate}
            label="주문날짜"
            error={null}
            width="fullWidth"
            disabled
          />
        </div>
        <p className={`font-b-md ${styles.header}}`}>출고지시 품목</p>
        <OutboundProductTable data={productList} />
        <div className={styles["button-box"]}>
          <MainButton size="sm" padding="sm" onClick={handleClickUpdate}>
            수정
          </MainButton>
          <MainButton size="sm" padding="sm">
            삭제
          </MainButton>
        </div>
      </div>
    </BaseDrawer>
  );
};
