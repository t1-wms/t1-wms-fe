import {
  InboundCheckProductListDto,
  InboundCheckProductTable,
} from "@/features";
import { BasicModal, useModalStore } from "@/shared";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import {
  CreateInboundCheckModalInfo,
  CreateInboundCheckRequestDto,
  Defective,
  InboundCheckDefaultValues,
  useCreateInboundCheck,
} from "../../model";
import { CreateInboundCheckForm } from "../create-inbound-check-form";
import styles from "./CreateInboundCheckModal.module.css";

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
  const queryClient = useQueryClient();

  const { mutate: createInboundCheck } = useCreateInboundCheck(queryClient);

  const handleSubmitValid = () => {
    const defectiveList: Defective[] = [];

    productList.forEach((product) => {
      defectiveList.push({
        productId: product.productId,
        defectiveCount: product.defectiveCount,
      });
    });

    const data: CreateInboundCheckRequestDto = {
      checkedProductList: defectiveList,
    };

    if (inboundSchedule) {
      // 입하검사 생성
      createInboundCheck({
        inboundId,
        reqDto: data,
      });

      closeModal();
    }
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
