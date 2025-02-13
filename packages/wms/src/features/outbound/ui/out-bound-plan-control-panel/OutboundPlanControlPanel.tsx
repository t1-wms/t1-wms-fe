import styles from "./OutboundPlanControlPanel.module.css";
import { useCallback } from "react";
import {
  MainButton,
  MainDateRangePicker,
  MainInput,
  useModalStore,
} from "@/shared";
import {
  CreateOutboundPlanModalInfo,
  useSearchOutboundPlanForm,
} from "../../model";

export const OutboundPlanControlPanel = () => {
  const { inputProps, onSubmit } = useSearchOutboundPlanForm();

  const { openModal } = useModalStore();

  const handleClickAdd = useCallback(() => {
    const modalInfo: CreateOutboundPlanModalInfo = {
      key: "createOutboundPlan",
    };
    openModal(modalInfo);
  }, [openModal]);

  const handleClickUpdate = useCallback(() => {
    const modalInfo: CreateOutboundPlanModalInfo = {
      key: "createOutboundPlan",
    };
    openModal(modalInfo);
  }, [openModal]);

  const handleClickDelete = useCallback(() => {}, [openModal]);

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <div className={styles["input-box"]}>
        <MainInput
          label="출고예정번호"
          width="120px"
          fontSize="sm"
          autoFocus
          {...inputProps.number}
        />
        <MainDateRangePicker
          label="출고예정날짜"
          width="120px"
          fontSize="sm"
          startDateInputProps={inputProps.startDate}
          endDateInputProps={inputProps.endDate}
        />
      </div>
      <div className={styles["button-box"]}>
        <MainButton size="sm">조회</MainButton>
        <MainButton size="sm" type="button" onClick={handleClickAdd}>
          추가
        </MainButton>
        <MainButton size="sm" type="button" onClick={handleClickUpdate}>
          수정
        </MainButton>
        <MainButton size="sm" type="button" onClick={handleClickDelete}>
          삭제
        </MainButton>
      </div>
    </form>
  );
};
