import { MainInput } from "@/shared";
import styles from "./CreateOutboundPlanForm.module.css";
import {
  InboundCheckDefaultValues,
  useCreateInboundCheckForm,
} from "../../model";

interface CreateInboundCheckFormProps {
  onSubmitValid: (checkDate: string) => void;
  defaultValues: InboundCheckDefaultValues;
}

const inputWidth = "240px";

export const CreateInboundCheckForm = ({
  onSubmitValid,
  defaultValues,
}: CreateInboundCheckFormProps) => {
  const { inputProps, onSubmit } = useCreateInboundCheckForm(onSubmitValid);

  return (
    <form
      id="createInboundCheck"
      className={styles.container}
      onSubmit={onSubmit}
    >
      <MainInput
        label="입하예정 번호"
        width={inputWidth}
        disabled
        defaultValue={defaultValues.scheduleNumber}
      />
      <MainInput
        label="입하검사 날짜"
        width={inputWidth}
        type="date"
        defaultValue={defaultValues.checkDate}
        {...inputProps.checkDate}
      />
    </form>
  );
};
