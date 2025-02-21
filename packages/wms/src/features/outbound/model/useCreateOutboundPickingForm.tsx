import { formMessages } from "@/shared";
import { SubmitHandler, useForm } from "react-hook-form";

interface CreateOutboundPickingFormInputs {
  outboundPickingDate: string;
}

export const useCreateOutboundPickingForm = (
  onValid: (outboundPickingDate: string) => void
) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateOutboundPickingFormInputs>();

  const handleValid: SubmitHandler<CreateOutboundPickingFormInputs> = (
    data
  ) => {
    onValid(data.outboundPickingDate);
  };

  return {
    inputProps: {
      outboundPickingDate: {
        ...register("outboundPickingDate", {
          required: { value: true, message: formMessages.required },
        }),
        error: errors.outboundPickingDate,
      },
    },
    onSubmit: handleSubmit(handleValid),
  };
};
