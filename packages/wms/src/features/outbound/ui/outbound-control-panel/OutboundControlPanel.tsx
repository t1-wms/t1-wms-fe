import { MainButton, MainDateRangePicker, MainInput } from "@/shared";
import { useSearchOutboundForm } from "../../model";
import styles from "./OutboundControlPanel.module.css";

interface OutboundControlPanelProps {
  label: "출고예정" | "출고지시" | "출고피킹" | "출고패킹" | "출하상차";
  onSearch: (number: string, startDate: string, endDate: string) => void;
  onClickCreate: () => void;
  isLoading: boolean;
  isError: boolean;
}

export const OutboundControlPanel = ({
  label,
  onSearch,
  onClickCreate,
  isLoading,
  isError,
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
        <MainButton size="sm" isLoading={isLoading}>
          조회
        </MainButton>
        <MainButton
          size="sm"
          type="button"
          onClick={onClickCreate}
          disabled={isError || isLoading}
        >
          추가
        </MainButton>
      </div>
    </form>
  );
};
