import styles from "./CreateOrderModal.module.css";
import { BasicModal, useModalStore } from "@/shared";
import {
  CreateOrderDefaultValues,
  CreateOrderModalInfo,
  CreateOrderRequestDto,
  SupplierProductDto,
  useCreateOrder,
  useUpdateOrder,
} from "../../model";
import { CreateOrderForm } from "../create-order-form";
import { useCallback, useMemo, useState } from "react";
import { OutboundProductTable } from "@/features/product/ui";
import { useQueryClient } from "@tanstack/react-query";

interface CreateOrderModalProps {
  modalInfo: CreateOrderModalInfo;
}

export const CreateOrderModal = ({ modalInfo }: CreateOrderModalProps) => {
  const { supplier, order } = modalInfo;
  const supplierId = order
    ? order.supplierId
    : supplier
    ? supplier.supplierId
    : -1;
  const supplierName = order
    ? order.supplierName
    : supplier
    ? supplier.supplierName
    : "";

  const defaultValues: CreateOrderDefaultValues = useMemo(() => {
    const productList = order
      ? order.productList.map((product) => ({
          productId: product.productId,
          productCode: product.productCode,
          productName: product.productName,
          productCount: product.productCount,
        }))
      : supplier
      ? supplier.productList.map((product) => ({
          productId: product.productId,
          productCode: product.productCode,
          productName: product.productName,
          productCount: 0,
        }))
      : [];

    return {
      supplierId,
      supplierName,
      productList,
    };
  }, [supplierId, supplierName, supplier]);

  const [selectedProductList, setSelectedProductList] = useState<
    SupplierProductDto[]
  >(defaultValues.productList);

  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();

  const { mutate: createOrder } = useCreateOrder(queryClient);
  const { mutate: updateOrder } = useUpdateOrder(queryClient);

  const handleSubmitValid = () => {
    const productList: SupplierProductDto[] = [];

    selectedProductList.forEach((product) => {
      if (!(Number.isNaN(product.productCount) || product.productCount === 0))
        productList.push(product);
    });

    const data: CreateOrderRequestDto = {
      supplierId,
      productList,
    };

    console.log(data);

    if (!order) {
      // 발주 생성
      createOrder(data);
      closeModal();
    } else {
      // 발주 수정
      updateOrder({
        orderId: order.orderId,
        productList,
      });
      closeModal();
    }
  };

  const handleChangeProductCount = useCallback(
    (productId: number, productCount: number) => {
      console.log(productId, productCount);

      setSelectedProductList((prev) => {
        const newProductList = [...prev];
        const product = newProductList.find((p) => p.productId === productId);
        if (!product) return prev;
        product.productCount = productCount;

        return newProductList;
      });
    },
    []
  );

  return (
    <BasicModal
      modalInfo={{
        key: "basic",
        title: `발주 ${order ? "수정" : "추가"}`,
        buttons: [
          {
            label: "취소",
            onClick: closeModal,
            color: "gray",
          },
          { label: "저장", onClick: () => {}, form: "createOrder" },
        ],
      }}
    >
      <div className={styles.container}>
        <CreateOrderForm
          onSubmitValid={handleSubmitValid}
          defaultValues={defaultValues}
        />
        <div className={styles["table-box"]}>
          <div className={`${styles["table-wrapper"]} shadow-md`}>
            <OutboundProductTable
              data={selectedProductList}
              canCount
              onChangeProductCount={handleChangeProductCount}
            />
          </div>
        </div>
      </div>
    </BasicModal>
  );
};
