import { MainInput } from "@/shared";
import styles from "./CreateOutboundPackingForm.module.css";
import {
  OutboundPackingResponseDto,
  useCreateOutboundPackingForm,
} from "../../model";

interface CreateOutboundPackingFormProps {
  onSubmitValid: (outboundPackingDate: string) => void;
  defaultValues: OutboundPackingResponseDto;
}

const inputWidth = "200px";

export const CreateOutboundPackingForm = ({
  onSubmitValid,
  defaultValues,
}: CreateOutboundPackingFormProps) => {
  const { inputProps, onSubmit } = useCreateOutboundPackingForm(onSubmitValid);

  return (
    <form
      id="createOutboundPacking"
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
        <MainInput
          label="출고예정 번호"
          width={inputWidth}
          defaultValue={defaultValues.outboundScheduleNumber}
          disabled
        />
      </div>
      <div>
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
        <MainInput
          label="출고패킹 날짜"
          width={inputWidth}
          type="date"
          defaultValue={defaultValues.outboundPackingDate}
          {...inputProps.outboundPackingDate}
        />
      </div>
    </form>
  );
};
