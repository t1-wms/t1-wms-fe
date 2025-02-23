import { OutboundProductTable } from "@/features";
import { BaseDrawer, MainButton, MainInput, useModalStore } from "@/shared";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  CreateOutboundPackingModalInfo,
  OutboundPackingResponseDto,
  useDeleteOutboundPacking,
} from "../../model";
import styles from "./OutboundPackingDrawer.module.css";

interface OutboundPackingDrawerProps {
  data: OutboundPackingResponseDto;
  onClose: () => void;
}

export const OutboundPackingDrawer = ({
  data,
  onClose,
}: OutboundPackingDrawerProps) => {
  const {
    outboundScheduleNumber,
    outboundAssignNumber,
    outboundPickingNumber,
    outboundPackingNumber,
    outboundPackingDate,
    planDate,
    productionPlanNumber,
    productList,
  } = data;

  const { openModal } = useModalStore();
  const queryClient = useQueryClient();

  const { mutate: deleteOutboundPacking } =
    useDeleteOutboundPacking(queryClient);

  const handleClickDelete = useCallback(() => {
    deleteOutboundPacking(data.outboundId);
  }, [data, deleteOutboundPacking]);

  const handleClickUpdate = useCallback(() => {
    const modalInfo: CreateOutboundPackingModalInfo = {
      key: "createOutboundPacking",
      outbound: data,
    };

    openModal(modalInfo);
    onClose();
  }, [onClose, openModal, data]);

  return (
    <BaseDrawer title={`출고패킹 조회`} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles["input-box"]}>
          <MainInput
            defaultValue={outboundScheduleNumber}
            label="출고예정번호"
            error={null}
            width="160px"
            disabled
          />
          <MainInput
            defaultValue={outboundAssignNumber}
            label="출고지시번호"
            error={null}
            width="160px"
            disabled
          />
          <MainInput
            defaultValue={outboundPickingNumber}
            label="출고피킹번호"
            error={null}
            width="160px"
            disabled
          />
          <MainInput
            defaultValue={outboundPackingNumber}
            label="출고패킹번호"
            error={null}
            width="160px"
            disabled
          />
          <MainInput
            defaultValue={outboundPackingDate}
            label="출고패킹날짜"
            error={null}
            width="160px"
            disabled
          />
          <MainInput
            defaultValue={productionPlanNumber}
            label="주문번호"
            error={null}
            width="160px"
            disabled
          />
          <MainInput
            defaultValue={planDate}
            label="주문날짜"
            error={null}
            width="160px"
            disabled
          />
        </div>
        <p className={`font-b-md ${styles.header}}`}>출고패킹 품목</p>
        <OutboundProductTable data={productList} />
        <div className={styles["button-box"]}>
          <MainButton size="sm" padding="sm" onClick={handleClickUpdate}>
            수정
          </MainButton>
          <MainButton size="sm" padding="sm" onClick={handleClickDelete}>
            삭제
          </MainButton>
        </div>
      </div>
    </BaseDrawer>
  );
};
