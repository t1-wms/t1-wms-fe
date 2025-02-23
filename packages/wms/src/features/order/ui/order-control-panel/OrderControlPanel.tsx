import { MainButton, MainDateRangePicker, MainInput } from "@/shared";
import { useSearchOrderForm } from "../../model";
import styles from "./OrderControlPanel.module.css";

interface OrderControlPanelProps {
  onSearch: (number: string, startDate: string, endDate: string) => void;
  onClickCreate: () => void;
  isLoading: boolean;
  isError: boolean;
}

export const OrderControlPanel = ({
  onSearch,
  onClickCreate,
  isLoading,
}: OrderControlPanelProps) => {
  const { inputProps, onSubmit } = useSearchOrderForm(onSearch);

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <div className={styles["input-box"]}>
        <MainInput
          label="발주번호"
          width="120px"
          fontSize="sm"
          autoFocus
          {...inputProps.number}
        />
        <MainDateRangePicker
          label="발주날짜"
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
          disabled={isLoading}
        >
          추가
        </MainButton>
      </div>
    </form>
  );
};
