import styles from "./ReceivedOrderDrawer.module.css";
import { BaseDrawer, MainButton, MainInput } from "@/shared";
import { OrderResponseDto, useApproveOrder } from "../../model";
import { OutboundProductTable } from "@/features";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface ReceivedOrderDrawerProps {
  data: OrderResponseDto;
  onClose: () => void;
}

export const ReceivedOrderDrawer = ({
  data,
  onClose,
}: ReceivedOrderDrawerProps) => {
  const { orderNumber, orderDate, supplierName, productList } = data;

  const queryClient = useQueryClient();

  const { mutate: approveOrder } = useApproveOrder(queryClient);

  const handleClickApprove = useCallback(() => {
    approveOrder(data.orderId);
    onClose();
  }, [onClose, data, approveOrder]);

  return (
    <BaseDrawer title={`발주 조회`} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles["input-box"]}>
          <MainInput
            defaultValue={orderNumber}
            label="발주번호"
            error={null}
            width="fullWidth"
            disabled
          />
          <MainInput
            defaultValue={orderDate}
            label="발주날짜"
            error={null}
            width="fullWidth"
            disabled
          />
          <MainInput
            defaultValue={supplierName}
            label="납품업체"
            error={null}
            width="fullWidth"
            disabled
          />
        </div>
        <p className={`font-b-md ${styles.header}}`}>발주 품목</p>
        <OutboundProductTable data={productList} />
        <div className={styles["button-box"]}>
          <MainButton size="sm" padding="sm" onClick={handleClickApprove}>
            승인
          </MainButton>
        </div>
      </div>
    </BaseDrawer>
  );
};
