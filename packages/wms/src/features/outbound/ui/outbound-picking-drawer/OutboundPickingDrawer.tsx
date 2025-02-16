import styles from "./OutboundPickingDrawer.module.css";
import { BaseDrawer, MainButton, MainInput, useModalStore } from "@/shared";
import {
  CreateOutboundPickingModalInfo,
  OutboundPickingResponseDto,
} from "../../model";
import { OutboundProductTable } from "@/features";
import { useCallback } from "react";

interface OutboundPickingDrawerProps {
  data: OutboundPickingResponseDto;
  onClose: () => void;
}

export const OutboundPickingDrawer = ({
  data,
  onClose,
}: OutboundPickingDrawerProps) => {
  const {
    outboundScheduleNumber,
    outboundAssignNumber,
    outboundPickingNumber,
    outboundPickingDate,
    planDate,
    productionPlanNumber,
    productList,
  } = data;

  const { openModal } = useModalStore();

  const handleClickUpdate = useCallback(() => {
    const modalInfo: CreateOutboundPickingModalInfo = {
      key: "createOutboundPicking",
      outbound: data,
    };

    openModal(modalInfo);
  }, [openModal, data]);

  return (
    <BaseDrawer title={`출고피킹 조회`} onClose={onClose}>
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
            defaultValue={outboundPickingNumber}
            label="출고피킹번호"
            error={null}
            width="fullWidth"
            disabled
          />
          <MainInput
            defaultValue={outboundPickingDate}
            label="출고피킹날짜"
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
        <p className={`font-b-md ${styles.header}}`}>출고피킹 품목</p>
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
