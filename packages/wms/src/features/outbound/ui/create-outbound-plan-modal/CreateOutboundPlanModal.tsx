import styles from "./CreateOutboundPlanModal.module.css";
import { BasicModal, Spinner, useModalStore } from "@/shared";
import {
  CreateOutboundPlanModalInfo,
  CreateOutboundPlanRequestDto,
  OutboundPlanResponseDto,
  useCreateOutboundPlan,
  useUpdateOutboundPlan,
} from "../../model";
import { CreateOutboundPlanForm } from "../create-outbound-plan-form";
import { Suspense, useCallback, useMemo, useState } from "react";
import { ProductListDto } from "@/entities";
import { OutboundProductTable } from "@/features/product/ui";
import { SimpleProductTable } from "@/features/product/ui/simple-product-table";
import { useQueryClient } from "@tanstack/react-query";

interface CreateOutboundPlanModalProps {
  modalInfo: CreateOutboundPlanModalInfo;
}

export const CreateOutboundPlanModal = ({
  modalInfo,
}: CreateOutboundPlanModalProps) => {
  const { outboundPlan } = modalInfo;

  const defaultValues: OutboundPlanResponseDto = useMemo(() => {
    return outboundPlan
      ? {
          ...outboundPlan,
        }
      : {
          outboundPlanId: -1,
          process: "",
          outboundScheduleNumber: "",
          outboundScheduleDate: new Date(Date.now())
            .toISOString()
            .substring(0, 10),
          productionPlanNumber: "",
          planDate: "",
          productList: [],
        };
  }, [outboundPlan]);

  const [selectedProductList, setSelectedProductList] = useState<
    ProductListDto[]
  >(defaultValues.productList);

  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const { mutate: createOutboundPlan } = useCreateOutboundPlan(queryClient);
  const { mutate: updateOutboundPlan } = useUpdateOutboundPlan(queryClient);

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

    if (outboundPlan) {
      // 출고예정 수정
      updateOutboundPlan({
        outboundPlanId: outboundPlan.outboundPlanId,
        newOutboundPlan: data,
      });

      closeModal();
    } else {
      // 출고예정 생성
      createOutboundPlan({ newOutboundPlan: data });

      closeModal();
    }
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

  return (
    <BasicModal
      modalInfo={{
        key: "basic",
        title: `출고예정 ${outboundPlan ? "수정" : "추가"}`,
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
        <CreateOutboundPlanForm
          onSubmitValid={handleSubmitValid}
          defaultValues={defaultValues}
        />
        <div className={styles["table-box"]}>
          <div className={`${styles.products} shadow-md`}>
            <Suspense
              fallback={<Spinner message="품목 리스트를 가져오는 중" />}
            >
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
