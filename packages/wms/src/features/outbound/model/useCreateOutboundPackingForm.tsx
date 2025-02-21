import { formMessages } from "@/shared";
import { SubmitHandler, useForm } from "react-hook-form";

interface CreateOutboundPackingFormInputs {
  outboundPackingDate: string;
}

export const useCreateOutboundPackingForm = (
  onValid: (outboundPackingDate: string) => void
) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateOutboundPackingFormInputs>();

  const handleValid: SubmitHandler<CreateOutboundPackingFormInputs> = (
    data
  ) => {
    onValid(data.outboundPackingDate);
  };

  return {
    inputProps: {
      outboundPackingDate: {
        ...register("outboundPackingDate", {
          required: { value: true, message: formMessages.required },
        }),
        error: errors.outboundPackingDate,
      },
    },
    onSubmit: handleSubmit(handleValid),
  };
};
