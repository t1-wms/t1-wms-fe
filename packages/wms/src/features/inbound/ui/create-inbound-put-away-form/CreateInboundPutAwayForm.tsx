import { MainInput } from "@/shared";
import {
  InboundPutAwayDefaultValues,
  useCreateInboundPutAwayForm,
} from "../../model";
import styles from "./CreateInboundPutAwayForm.module.css";

interface CreateInboundPutAwayFormProps {
  onSubmitValid: () => void;
  defaultValues: InboundPutAwayDefaultValues;
}

const inputWidth = "240px";

export const CreateInboundPutAwayForm = ({
  onSubmitValid,
  defaultValues,
}: CreateInboundPutAwayFormProps) => {
  const { onSubmit } = useCreateInboundPutAwayForm(onSubmitValid);

  return (
    <form
      id="createInboundPutAway"
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
        label="입하검사 번호"
        width={inputWidth}
        disabled
        defaultValue={defaultValues.checkNumber}
      />
      <MainInput
        label="입하검사 날짜"
        width={inputWidth}
        type="date"
        disabled
        defaultValue={defaultValues.checkDate}
      />
    </form>
  );
};
