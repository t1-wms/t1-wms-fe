import styles from "./InboundScheduleDrawer.module.css";
import { BaseDrawer, MainButton, MainInput } from "@/shared";
import { InboundScheduleResponseDto } from "../../model";
import { OutboundProductTable } from "@/features";

interface InboundScheduleDrawerProps {
  data: InboundScheduleResponseDto;
  onClose: () => void;
}

export const InboundScheduleDrawer = ({
  data,
  onClose,
}: InboundScheduleDrawerProps) => {
  const { scheduleNumber, scheduleDate, productList } = data;

  return (
    <BaseDrawer title={`입하예정 조회`} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles["input-box"]}>
          <MainInput
            defaultValue={scheduleNumber}
            label="입하예정번호"
            error={null}
            width="fullWidth"
            disabled
          />
          <MainInput
            defaultValue={scheduleDate}
            label="입하예정날짜"
            error={null}
            width="fullWidth"
            disabled
          />
        </div>
        <p className={`font-b-md ${styles.header}}`}>입하예정 품목</p>
        <OutboundProductTable data={productList} />
        <div className={styles["button-box"]}>
          <MainButton size="sm" padding="sm">
            삭제
          </MainButton>
        </div>
      </div>
    </BaseDrawer>
  );
};
