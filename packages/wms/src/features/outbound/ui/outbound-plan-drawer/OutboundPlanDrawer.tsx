import { OutboundProductTable } from "@/features";
import { BaseDrawer, MainButton, MainInput, useModalStore } from "@/shared";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  CreateOutboundPlanModalInfo,
  OutboundPlanResponseDto,
  useDeleteOutboundPlan,
} from "../../model";
import styles from "./OutboundPlanDrawer.module.css";

interface OutboundPlanDrawerProps {
  data: OutboundPlanResponseDto;
  onClose: () => void;
}

export const OutboundPlanDrawer = ({
  data,
  onClose,
}: OutboundPlanDrawerProps) => {
  const {
    outboundScheduleNumber,
    outboundScheduleDate,
    planDate,
    productionPlanNumber,
    productList,
  } = data;

  const { openModal } = useModalStore();
  const queryClient = useQueryClient();

  const { mutate: deleteOutboundPlan } = useDeleteOutboundPlan(queryClient);

  const handleClickUpdate = useCallback(() => {
    const modalInfo: CreateOutboundPlanModalInfo = {
      key: "createOutboundPlan",
      outboundPlan: data,
    };

    openModal(modalInfo);
    onClose();
  }, [openModal, onClose, data]);

  const handleClickDelete = useCallback(() => {
    deleteOutboundPlan(data.outboundPlanId);

    onClose();
  }, [data]);

  console.log(data);
  console.log(productList);

  return (
    <BaseDrawer title={`출고예정 조회`} onClose={onClose}>
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
            defaultValue={outboundScheduleDate}
            label="출고예정날짜"
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
        <p className={`font-b-md ${styles.header}}`}>출고예정 품목</p>
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
