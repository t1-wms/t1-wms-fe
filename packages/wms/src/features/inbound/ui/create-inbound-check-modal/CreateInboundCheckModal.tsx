import styles from "./CreateInboundCheckModal.module.css";
import { BasicModal, useModalStore } from "@/shared";
import {
  CreateInboundCheckModalInfo,
  CreateInboundCheckRequestDto,
  Defective,
  InboundCheckDefaultValues,
} from "../../model";
import { CreateInboundCheckForm } from "../create-inbound-check-form";
import { useCallback, useMemo, useState } from "react";
import {
  InboundCheckProductListDto,
  InboundCheckProductTable,
} from "@/features";

interface CreateInboundCheckModalProps {
  modalInfo: CreateInboundCheckModalInfo;
}

export const CreateInboundCheckModal = ({
  modalInfo,
}: CreateInboundCheckModalProps) => {
  const { inboundSchedule, inboundCheck } = modalInfo;

  const inboundId = inboundSchedule
    ? inboundSchedule.inboundId
    : inboundCheck!.inboundId;
  const scheduleNumber = inboundSchedule
    ? inboundSchedule.scheduleNumber
    : inboundCheck!.scheduleNumber;

  const defaultValues: InboundCheckDefaultValues = useMemo(() => {
    return inboundSchedule
      ? {
          inboundId,
          checkDate: "",
          scheduleNumber,
          checkedProductList: inboundSchedule.productList.map((product) => ({
            productId: product.productId,
            productCode: product.productCode,
            productName: product.productName,
            productCount: product.productCount,
            lotCount: 0,
            defectiveCount: 0,
          })),
        }
      : {
          inboundId,
          checkDate: inboundCheck!.checkDate,
          scheduleNumber,
          checkedProductList: inboundCheck!.productList,
        };
  }, [inboundId, scheduleNumber, inboundSchedule, inboundCheck]);

  const [productList, setProductList] = useState<InboundCheckProductListDto[]>(
    defaultValues.checkedProductList
  );

  const { closeModal } = useModalStore();
  // const queryClient = useQueryClient();

  const handleSubmitValid = (checkDate: string) => {
    const defectiveList: Defective[] = [];

    productList.forEach((product) => {
      defectiveList.push({
        productId: product.productId,
        defectiveCount: product.defectiveCount,
      });
    });

    const data: CreateInboundCheckRequestDto = {
      inboundId,
      checkDate,
      scheduleNumber,
      checkedProductList: defectiveList,
    };

    console.log(data);

    // if (outboundPlan) {
    //   queryClient.invalidateQueries({
    //     predicate: (q) => {
    //       const isOutboundPlan = (q.queryKey[0] as string) === "outboundPlan";
    //       const isNotCount =
    //         q.queryKey[1] === undefined ||
    //         !((q.queryKey[1] as string) === "count");

    //       return isOutboundPlan && isNotCount;
    //     },
    //   });

    //   closeModal();
    // }
  };

  const handleChangeDefectiveCount = useCallback(
    (productId: number, defectiveCount: number) => {
      setProductList((prev) => {
        const newProductList = [...prev];
        const product = newProductList.find((p) => p.productId === productId);
        if (!product) return prev;
        product.defectiveCount = defectiveCount;

        return newProductList;
      });
    },
    []
  );

  return (
    <BasicModal
      modalInfo={{
        key: "basic",
        title: `입하검사 ${inboundCheck ? "수정" : "추가"}`,
        buttons: [
          {
            label: "취소",
            onClick: closeModal,
            color: "gray",
          },
          { label: "저장", onClick: () => {}, form: "createInboundCheck" },
        ],
      }}
    >
      <div className={styles.container}>
        <CreateInboundCheckForm
          onSubmitValid={handleSubmitValid}
          defaultValues={defaultValues}
        />
        <div className={styles["table-box"]}>
          <div className={`${styles["table-wrapper"]} shadow-md`}>
            <InboundCheckProductTable
              data={productList}
              canCount
              onChangeProductCount={handleChangeDefectiveCount}
            />
          </div>
        </div>
      </div>
    </BasicModal>
  );
};
