import styles from "./OrderControlPanel.module.css";
import { MainButton, MainInput } from "@/shared";
import { useSearchSupplierForm } from "../../model";

interface SupplierControlPanelProps {
  onSearch: (businessNumber: string) => void;
}

export const SupplierControlPanel = ({
  onSearch,
}: SupplierControlPanelProps) => {
  const { inputProps, onSubmit } = useSearchSupplierForm(onSearch);

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <div className={styles["input-box"]}>
        <MainInput
          label="사업자등록번호"
          width="120px"
          fontSize="sm"
          autoFocus
          {...inputProps.businessNumber}
        />
      </div>
      <div className={styles["button-box"]}>
        <MainButton size="sm">조회</MainButton>
      </div>
    </form>
  );
};
