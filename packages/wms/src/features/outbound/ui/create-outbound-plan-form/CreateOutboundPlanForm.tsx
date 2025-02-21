import { MainInput } from "@/shared";
import styles from "./CreateOutboundPlanForm.module.css";
import {
  OutboundPlanResponseDto,
  useCreateOutboundPlanForm,
} from "../../model";

interface CreateOutboundPlanFormProps {
  onSubmitValid: (
    productionPlanNumber: string,
    outboundScheduleDate: string,
    planDate: string
  ) => void;
  defaultValues: OutboundPlanResponseDto;
}

const inputWidth = "240px";

export const CreateOutboundPlanForm = ({
  onSubmitValid,
  defaultValues,
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
        defaultValue={defaultValues.productionPlanNumber}
        {...inputProps.productionPlanNumber}
      />
      <MainInput
        label="출고예정 날짜"
        width={inputWidth}
        disabled
        type="date"
        defaultValue={defaultValues.outboundScheduleDate}
        {...inputProps.outboundScheduleDate}
      />
      <MainInput
        label="주문 날짜"
        width={inputWidth}
        type="date"
        defaultValue={defaultValues.planDate}
        {...inputProps.planDate}
      />
    </form>
  );
};
