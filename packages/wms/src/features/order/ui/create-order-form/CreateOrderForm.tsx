import { MainInput } from "@/shared";
import styles from "./CreateOrderForm.module.css";
import { CreateOrderDefaultValues } from "../../model";

interface CreateOrderFormProps {
  onSubmitValid: () => void;
  defaultValues: CreateOrderDefaultValues;
}

const inputWidth = "240px";

export const CreateOrderForm = ({
  onSubmitValid,
  defaultValues,
}: CreateOrderFormProps) => {
  return (
    <form
      id="createOrder"
      className={styles.container}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitValid();
      }}
    >
      <MainInput
        label="납품업체"
        width={inputWidth}
        disabled
        defaultValue={defaultValues.supplierName}
      />
    </form>
  );
};
