import { formMessages } from "@/shared";
import { SubmitHandler, useForm } from "react-hook-form";

interface CreateInboundCheckFormInputs {
  checkDate: string;
}

export const useCreateInboundCheckForm = (
  onValid: (checkDate: string) => void
) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateInboundCheckFormInputs>();

  const handleValid: SubmitHandler<CreateInboundCheckFormInputs> = (data) => {
    onValid(data.checkDate);
  };

  return {
    inputProps: {
      checkDate: {
        ...register("checkDate", {
          required: { value: true, message: formMessages.required },
        }),
        error: errors.checkDate,
      },
    },
    onSubmit: handleSubmit(handleValid),
  };
};
