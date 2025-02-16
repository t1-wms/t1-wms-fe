import { formMessages } from "@/shared";
import { SubmitHandler, useForm } from "react-hook-form";

interface CreateOutboundAssignFormInputs {
  outboundAssignDate: string;
}

export const useCreateOutboundAssignForm = (
  onValid: (outboundAssignDate: string) => void
) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateOutboundAssignFormInputs>();

  const handleValid: SubmitHandler<CreateOutboundAssignFormInputs> = (data) => {
    onValid(data.outboundAssignDate);
  };

  return {
    inputProps: {
      outboundAssignDate: {
        ...register("outboundAssignDate", {
          required: { value: true, message: formMessages.required },
        }),
        error: errors.outboundAssignDate,
      },
    },
    onSubmit: handleSubmit(handleValid),
  };
};
