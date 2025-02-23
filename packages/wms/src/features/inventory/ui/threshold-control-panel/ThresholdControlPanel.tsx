import { MainButton, MainInput } from "@/shared";
import { useSearchThresholdForm } from "../../model";
import styles from "./ThresholdControlPanel.module.css";

interface ThresholdControlPanelProps {
  onSearch: (productCode: string) => void;
  isLoading: boolean;
}

export const ThresholdControlPanel = ({
  onSearch,
  isLoading,
}: ThresholdControlPanelProps) => {
  const { inputProps, onSubmit } = useSearchThresholdForm(onSearch);

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <div className={styles["input-box"]}>
        <MainInput
          label={`품목코드`}
          width="120px"
          fontSize="sm"
          autoFocus
          {...inputProps.productCode}
        />
      </div>
      <div className={styles["button-box"]}>
        <MainButton size="sm" isLoading={isLoading}>
          조회
        </MainButton>
      </div>
    </form>
  );
};
