import { MainButton, MainInput } from "@/shared";
import { useSearchProductForm } from "../../model";
import styles from "./ProductControlPanel.module.css";

interface ProductControlPanelProps {
  onSearch: (productCode: string) => void;
  isLoading: boolean;
}

export const ProductControlPanel = ({
  onSearch,
  isLoading,
}: ProductControlPanelProps) => {
  const { inputProps, onSubmit } = useSearchProductForm(onSearch);

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
