import styles from "./InboundPutAwayDrawer.module.css";
import { BaseDrawer, MainInput } from "@/shared";
import { InboundPutAwayResponseDto } from "../../model";

interface InboundPutAwayDrawerProps {
  data: InboundPutAwayResponseDto;
  onClose: () => void;
}

export const InboundPutAwayDrawer = ({
  data,
  onClose,
}: InboundPutAwayDrawerProps) => {
  const {
    scheduleNumber,
    checkNumber,
    putAwayNumber,
    putAwayDate,
    // productList,
  } = data;

  return (
    <BaseDrawer title={`입하검사 조회`} onClose={onClose}>
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
            defaultValue={checkNumber}
            label="입하검사번호"
            error={null}
            width="fullWidth"
            disabled
          />
          <MainInput
            defaultValue={putAwayNumber}
            label="입고적치번호"
            error={null}
            width="fullWidth"
            disabled
          />
          <MainInput
            defaultValue={putAwayDate}
            label="입고적치날짜"
            error={null}
            width="fullWidth"
            disabled
          />
        </div>
        <p className={`font-b-md ${styles.header}}`}>입고적치 품목</p>
        {/* <InboundCheckProductTable data={productList} /> */}
      </div>
    </BaseDrawer>
  );
};
