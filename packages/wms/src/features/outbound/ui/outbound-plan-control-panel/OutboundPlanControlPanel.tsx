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

interface OutboundPlanControlPanelProps {
  onSearch: (number: string, startDate: string, endDate: string) => void;
}

export const OutboundPlanControlPanel = ({
  onSearch,
}: OutboundPlanControlPanelProps) => {
  const { inputProps, onSubmit } = useSearchOutboundPlanForm(onSearch);

  const { openModal } = useModalStore();

  const handleClickAdd = useCallback(() => {
    const modalInfo: CreateOutboundPlanModalInfo = {
      key: "createOutboundPlan",
    };
    openModal(modalInfo);
  }, [openModal]);

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
      </div>
    </form>
  );
};
