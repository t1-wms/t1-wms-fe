import styles from "./OutboundControlPanel.module.css";
import { MainButton, MainDateRangePicker, MainInput } from "@/shared";
import { useSearchOutboundForm } from "../../model";

interface OutboundControlPanelProps {
  label: "출고예정" | "출고지시" | "출고피킹" | "출고패킹" | "출하상차";
  onSearch: (number: string, startDate: string, endDate: string) => void;
  onClickCreate: () => void;
}

export const OutboundControlPanel = ({
  label,
  onSearch,
  onClickCreate,
}: OutboundControlPanelProps) => {
  const { inputProps, onSubmit } = useSearchOutboundForm(onSearch);

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <div className={styles["input-box"]}>
        <MainInput
          label={`${label}번호`}
          width="120px"
          fontSize="sm"
          autoFocus
          {...inputProps.number}
        />
        <MainDateRangePicker
          label={`${label}날짜`}
          width="120px"
          fontSize="sm"
          startDateInputProps={inputProps.startDate}
          endDateInputProps={inputProps.endDate}
        />
      </div>
      <div className={styles["button-box"]}>
        <MainButton size="sm">조회</MainButton>
        <MainButton size="sm" type="button" onClick={onClickCreate}>
          추가
        </MainButton>
      </div>
    </form>
  );
};
