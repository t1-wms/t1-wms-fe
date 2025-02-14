import styles from "./CreateOutboundPlanModal.module.css";
import { BasicModal, useModalStore } from "@/shared";
import {
  CreateOutboundPlanModalInfo,
  CreateOutboundPlanRequestDto,
} from "../../model";
import { CreateOutboundPlanForm } from "../create-outbound-plan-form";
import { Suspense, useCallback, useState } from "react";
import { ProductListDto } from "@/entities";
import { OutboundProductTable } from "@/features/product/ui";
import { SimpleProductTable } from "@/features/product/ui/simple-product-table";

interface CreateOutboundPlanModalProps {
  modalInfo: CreateOutboundPlanModalInfo;
}

export const CreateOutboundPlanModal = ({}: CreateOutboundPlanModalProps) => {
  const [selectedProductList, setSelectedProductList] = useState<
    ProductListDto[]
  >([]);

  const { closeModal } = useModalStore();

  const handleSubmitValid = (
    productionPlanNumber: string,
    outboundScheduleDate: string,
    planDate: string
  ) => {
    const productList: ProductListDto[] = [];

    selectedProductList.forEach((product) => {
      if (!(Number.isNaN(product.productCount) || product.productCount === 0))
        productList.push(product);
    });

    const data: CreateOutboundPlanRequestDto = {
      productionPlanNumber,
      outboundScheduleDate,
      planDate,
      productList,
    };

    console.log(data);
  };

  const handleClickRow = useCallback((product: ProductListDto) => {
    setSelectedProductList((prev) => {
      if (prev.find((p) => p.productId === product.productId)) return prev;
      return [...prev, product];
    });
  }, []);

  const handleChangeProductCount = useCallback(
    (productId: number, productCount: number) => {
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

  console.log(selectedProductList);

  return (
    <BasicModal
      modalInfo={{
        key: "basic",
        title: "사용자 추가",
        buttons: [
          {
            label: "취소",
            onClick: closeModal,
            color: "gray",
          },
          { label: "저장", onClick: () => {}, form: "createOutboundPlan" },
        ],
      }}
    >
      <div className={styles.container}>
        <CreateOutboundPlanForm onSubmitValid={handleSubmitValid} />
        <div className={styles["table-box"]}>
          <div className={`${styles.products} shadow-md`}>
            <Suspense fallback={<>Loading...</>}>
              <SimpleProductTable onClickAdd={handleClickRow} />
            </Suspense>
          </div>
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
