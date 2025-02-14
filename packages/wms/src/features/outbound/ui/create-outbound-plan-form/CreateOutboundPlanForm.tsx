import { MainInput } from "@/shared";
import styles from "./CreateOutboundPlanForm.module.css";
import { useCreateOutboundPlanForm } from "../../model";

interface CreateOutboundPlanFormProps {
  onSubmitValid: (
    productionPlanNumber: string,
    outboundScheduleDate: string,
    planDate: string
  ) => void;
}

const inputWidth = "240px";

export const CreateOutboundPlanForm = ({
  onSubmitValid,
}: CreateOutboundPlanFormProps) => {
  const { inputProps, onSubmit } = useCreateOutboundPlanForm(onSubmitValid);

  return (
    <form
      id="createOutboundPlan"
      className={styles.container}
      onSubmit={onSubmit}
    >
      <MainInput
        label="주문 번호"
        width={inputWidth}
        {...inputProps.productionPlanNumber}
      />
      <MainInput
        label="출고예정 날짜"
        width={inputWidth}
        disabled
        type="date"
        defaultValue={new Date(Date.now()).toISOString().substring(0, 10)}
        {...inputProps.outboundScheduleDate}
      />
      <MainInput
        label="주문 날짜"
        width={inputWidth}
        type="date"
        {...inputProps.planDate}
      />
    </form>
  );
};
