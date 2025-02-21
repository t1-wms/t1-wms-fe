import { MainInput } from "@/shared";
import styles from "./CreateOutboundLoadingForm.module.css";
import {
  OutboundLoadingResponseDto,
  useCreateOutboundLoadingForm,
} from "../../model";

interface CreateOutboundLoadingFormProps {
  onSubmitValid: (outboundLoadingDate: string) => void;
  defaultValues: OutboundLoadingResponseDto;
}

const inputWidth = "200px";

export const CreateOutboundLoadingForm = ({
  onSubmitValid,
  defaultValues,
}: CreateOutboundLoadingFormProps) => {
  const { inputProps, onSubmit } = useCreateOutboundLoadingForm(onSubmitValid);

  return (
    <form
      id="createOutboundLoading"
      className={styles.container}
      onSubmit={onSubmit}
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
          label="출고피킹 번호"
          width={inputWidth}
          defaultValue={defaultValues.outboundPickingNumber}
          disabled
        />
      </div>
      <div>
        <MainInput
          label="출고패킹 번호"
          width={inputWidth}
          defaultValue={defaultValues.outboundPackingNumber}
          disabled
        />
        <MainInput
          label="출하상차 날짜"
          width={inputWidth}
          type="date"
          defaultValue={defaultValues.outboundLoadingDate}
          {...inputProps.outboundLoadingDate}
        />
      </div>
    </form>
  );
};
