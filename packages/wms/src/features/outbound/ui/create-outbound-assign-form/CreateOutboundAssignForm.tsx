import { MainInput } from "@/shared";
import styles from "./CreateOutboundAssignForm.module.css";
import {
  OutboundAssignResponseDto,
  useCreateOutboundAssignForm,
} from "../../model";

interface CreateOutboundAssignFormProps {
  onSubmitValid: (outboundAssignDate: string) => void;
  defaultValues: OutboundAssignResponseDto;
}

const inputWidth = "200px";

export const CreateOutboundAssignForm = ({
  onSubmitValid,
  defaultValues,
}: CreateOutboundAssignFormProps) => {
  const { inputProps, onSubmit } = useCreateOutboundAssignForm(onSubmitValid);

  return (
    <form
      id="createOutboundAssign"
      className={styles.container}
      onSubmit={onSubmit}
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
        type="date"
        defaultValue={defaultValues.outboundAssignDate}
        {...inputProps.outboundAssignDate}
      />
    </form>
  );
};
