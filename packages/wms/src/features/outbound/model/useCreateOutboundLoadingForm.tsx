import { formMessages } from "@/shared";
import { SubmitHandler, useForm } from "react-hook-form";

interface CreateOutboundLoadingFormInputs {
  outboundLoadingDate: string;
}

export const useCreateOutboundLoadingForm = (
  onValid: (outboundLoadingDate: string) => void
) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateOutboundLoadingFormInputs>();

  const handleValid: SubmitHandler<CreateOutboundLoadingFormInputs> = (
    data
  ) => {
    onValid(data.outboundLoadingDate);
  };

  return {
    inputProps: {
      outboundLoadingDate: {
        ...register("outboundLoadingDate", {
          required: { value: true, message: formMessages.required },
        }),
        error: errors.outboundLoadingDate,
      },
    },
    onSubmit: handleSubmit(handleValid),
  };
};
