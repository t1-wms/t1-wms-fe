import styles from "./InboundCheckDrawer.module.css";
import { BaseDrawer, MainButton, MainInput, useModalStore } from "@/shared";
import {
  CreateInboundCheckModalInfo,
  InboundCheckResponseDto,
} from "../../model";
import { useCallback } from "react";
import { InboundCheckProductTable } from "../inbound-check-product-table";

interface InboundCheckDrawerProps {
  data: InboundCheckResponseDto;
  onClose: () => void;
}

export const InboundCheckDrawer = ({
  data,
  onClose,
}: InboundCheckDrawerProps) => {
  const { scheduleNumber, checkNumber, checkDate, productList } = data;

  const { openModal } = useModalStore();

  const handleClickUpdate = useCallback(() => {
    const modalInfo: CreateInboundCheckModalInfo = {
      key: "createInboundCheck",
      inboundCheck: data,
    };

    openModal(modalInfo);
  }, [openModal, data]);

  return (
    <BaseDrawer title={`입하검사 조회`} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles["input-box"]}>
          <MainInput
            defaultValue={scheduleNumber}
            label="입하예정번호"
            error={null}
            width="fullWidth"
            disabled
          />
          <MainInput
            defaultValue={checkNumber}
            label="입하검사번호"
            error={null}
            width="fullWidth"
            disabled
          />
          <MainInput
            defaultValue={checkDate}
            label="입하검사날짜"
            error={null}
            width="fullWidth"
            disabled
          />
        </div>
        <p className={`font-b-md ${styles.header}}`}>입하검사 품목</p>
        <InboundCheckProductTable data={productList} />
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
