import styles from "./ThresholdDrawer.module.css";
import { BaseDrawer, MainButton, MainInput } from "@/shared";
import {
  ProductThresholdDto,
  useUpdateThreshold,
  useUpdateThresholdForm,
} from "../../model";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface ThresholdDrawerProps {
  data: ProductThresholdDto;
  onClose: () => void;
}

export const ThresholdDrawer = ({ data, onClose }: ThresholdDrawerProps) => {
  const { productId, productCode, productName, productCount, threshold } = data;

  const queryClient = useQueryClient();

  const { mutate: updateThreshold } = useUpdateThreshold(queryClient);

  const handleSubmit = useCallback(
    (threshold: number) => {
      updateThreshold({
        productId,
        threshold,
      });

      onClose();
    },
    [updateThreshold, onClose]
  );

  const { inputProps, onSubmit } = useUpdateThresholdForm(handleSubmit);

  const handleClickUpdate = useCallback(() => {}, [onClose, data]);

  return (
    <BaseDrawer title={`품목 안전재고 조회`} onClose={onClose}>
      <div className={styles.container}>
        <form onSubmit={onSubmit} className={styles["input-box"]}>
          <MainInput
            defaultValue={productCode}
            label="품목코드"
            error={null}
            width="fullWidth"
            disabled
          />
          <MainInput
            defaultValue={productName}
            label="품목이름"
            error={null}
            width="fullWidth"
            disabled
          />
          <MainInput
            defaultValue={productCount}
            label="품목 수"
            error={null}
            width="fullWidth"
            disabled
          />
          <MainInput
            defaultValue={threshold}
            label="안전재고"
            width="fullWidth"
            {...inputProps.threshold}
          />
          <div className={styles["button-box"]}>
            <MainButton size="sm" padding="sm" onClick={handleClickUpdate}>
              저장
            </MainButton>
          </div>
        </form>
      </div>
    </BaseDrawer>
  );
};
