import styles from "./OutboundPlanDrawer.module.css";
import { BaseDrawer, MainButton, MainInput } from "@/shared";
import { OutboundPlanResponseDto } from "../../model";
import { OutboundProductTable } from "@/features";

interface OutboundPlanDrawerProps {
  data: OutboundPlanResponseDto;
  onClose: () => void;
}

export const OutboundPlanDrawer = ({
  data,
  onClose,
}: OutboundPlanDrawerProps) => {
  const {
    outboundScheduleNumber,
    outboundScheduleDate,
    planDate,
    productionPlanNumber,
    productList,
  } = data;

  return (
    <BaseDrawer title={`출고예정 조회`} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles["input-box"]}>
          <MainInput
            defaultValue={outboundScheduleNumber}
            label="출고예정번호"
            error={null}
            width="fullWidth"
            disabled
          />
          <MainInput
            defaultValue={outboundScheduleDate}
            label="출고예정날짜"
            error={null}
            width="fullWidth"
            disabled
          />
          <MainInput
            defaultValue={productionPlanNumber}
            label="주문번호"
            error={null}
            width="fullWidth"
            disabled
          />
          <MainInput
            defaultValue={planDate}
            label="주문날짜"
            error={null}
            width="fullWidth"
            disabled
          />
        </div>
        <p className={`font-b-md ${styles.header}}`}>출고예정 품목</p>
        <OutboundProductTable data={productList} />
        <div className={styles["button-box"]}>
          <MainButton size="sm" padding="sm">
            수정
          </MainButton>
          <MainButton size="sm" padding="sm">
            삭제
          </MainButton>
        </div>
      </div>
    </BaseDrawer>
  );
};
