import styles from "./OutboundControlPanel.module.css";
import { MainButton, MainDateRangePicker, MainInput } from "@/shared";
import { useSearchInboundForm } from "../../model";

interface InboundControlPanelProps {
  label: "입하예정" | "입하검사" | "입고적치";
  onSearch: (number: string, startDate: string, endDate: string) => void;
  onClickCreate: () => void;
}

export const InboundControlPanel = ({
  label,
  onSearch,
  onClickCreate,
}: InboundControlPanelProps) => {
  const { inputProps, onSubmit } = useSearchInboundForm(onSearch);

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
        {label !== "입하예정" && (
          <MainButton size="sm" type="button" onClick={onClickCreate}>
            추가
          </MainButton>
        )}
      </div>
    </form>
  );
};
