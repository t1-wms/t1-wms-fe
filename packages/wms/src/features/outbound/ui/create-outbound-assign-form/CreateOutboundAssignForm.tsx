import { MainInput } from "@/shared";
import styles from "./CreateOutboundAssignForm.module.css";
import { OutboundAssignResponseDto } from "../../model";

interface CreateOutboundAssignFormProps {
  onSubmitValid: () => void;
  defaultValues: OutboundAssignResponseDto;
}

const inputWidth = "200px";

export const CreateOutboundAssignForm = ({
  onSubmitValid,
  defaultValues,
}: CreateOutboundAssignFormProps) => {
  return (
    <form
      id="createOutboundPlan"
      className={styles.container}
      onSubmit={onSubmitValid}
    >
      <MainInput
        label="주문 번호"
        width={inputWidth}
        defaultValue={defaultValues.productionPlanNumber}
        disabled
      />
      <MainInput
        label="출고예정 번호"
        width={inputWidth}
        defaultValue={defaultValues.outboundScheduleNumber}
        disabled
      />
      <MainInput
        label="주문 날짜"
        width={inputWidth}
        type="date"
        defaultValue={defaultValues.planDate}
        disabled
      />
      <MainInput
        label="출고지시 날짜"
        width={inputWidth}
        disabled
        type="date"
        defaultValue={defaultValues.outboundAssignDate}
      />
    </form>
  );
};
