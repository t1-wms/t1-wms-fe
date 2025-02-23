import { OutboundProductTable } from "@/features";
import { BaseDrawer, MainButton, MainInput, useModalStore } from "@/shared";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  CreateOrderModalInfo,
  OrderResponseDto,
  useDeleteOrder,
} from "../../model";
import styles from "./OrderDrawer.module.css";

interface OrderDrawerProps {
  data: OrderResponseDto;
  onClose: () => void;
}

export const OrderDrawer = ({ data, onClose }: OrderDrawerProps) => {
  const { orderNumber, orderDate, supplierName, productList } = data;

  const { openModal } = useModalStore();
  const queryClient = useQueryClient();

  const { mutate: deleteOrder } = useDeleteOrder(queryClient);

  const handleClickUpdate = useCallback(() => {
    const modalInfo: CreateOrderModalInfo = {
      key: "createOrder",
      order: data,
    };

    openModal(modalInfo);
    onClose();
  }, [onClose, openModal, data]);

  const handleClickDelete = useCallback(() => {
    deleteOrder(data.orderId);
    onClose();
  }, [onClose, data, deleteOrder]);

  return (
    <BaseDrawer title={`발주 조회`} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles["input-box"]}>
          <MainInput
            defaultValue={orderNumber}
            label="발주번호"
            error={null}
            width="160px"
            disabled
          />
          <MainInput
            defaultValue={orderDate}
            label="발주날짜"
            error={null}
            width="160px"
            disabled
          />
          <MainInput
            defaultValue={supplierName}
            label="납품업체"
            error={null}
            width="160px"
            disabled
          />
        </div>
        <p className={`font-b-md ${styles.header}}`}>발주 품목</p>
        <OutboundProductTable data={productList} />
        <div className={styles["button-box"]}>
          <MainButton size="sm" padding="sm" onClick={handleClickUpdate}>
            수정
          </MainButton>
          <MainButton size="sm" padding="sm" onClick={handleClickDelete}>
            삭제
          </MainButton>
        </div>
      </div>
    </BaseDrawer>
  );
};
