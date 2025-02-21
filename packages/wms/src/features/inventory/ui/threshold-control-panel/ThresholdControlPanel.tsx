import styles from "./ThresholdControlPanel.module.css";
import { MainButton, MainInput } from "@/shared";
import { useSearchThresholdForm } from "../../model";

interface ThresholdControlPanelProps {
  onSearch: (productCode: string) => void;
}

export const ThresholdControlPanel = ({
  onSearch,
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
        <MainButton size="sm">조회</MainButton>
      </div>
    </form>
  );
};
