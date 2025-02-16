import { MainInput } from "@/shared";
import styles from "./CreateOutboundPickingForm.module.css";
import { OutboundPickingResponseDto } from "../../model";

interface CreateOutboundPickingFormProps {
  onSubmitValid: () => void;
  defaultValues: OutboundPickingResponseDto;
}

const inputWidth = "200px";

export const CreateOutboundPickingForm = ({
  onSubmitValid,
  defaultValues,
}: CreateOutboundPickingFormProps) => {
  return (
    <form
      id="createOutboundPlan"
      className={styles.container}
      onSubmit={onSubmitValid}
    >
      <div>
        <MainInput
          label="주문 번호"
          width={inputWidth}
          defaultValue={defaultValues.productionPlanNumber}
          disabled
        />
        <MainInput
          label="주문 날짜"
          width={inputWidth}
          type="date"
          defaultValue={defaultValues.planDate}
          disabled
        />
      </div>
      <div>
        <MainInput
          label="출고예정 번호"
          width={inputWidth}
          defaultValue={defaultValues.outboundScheduleNumber}
          disabled
        />
        <MainInput
          label="출고지시 번호"
          width={inputWidth}
          defaultValue={defaultValues.outboundAssignNumber}
          disabled
        />
        <MainInput
          label="출고피킹 날짜"
          width={inputWidth}
          disabled
          type="date"
          defaultValue={defaultValues.outboundPickingDate}
        />
      </div>
    </form>
  );
};
