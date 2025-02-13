import { formMessages } from "@/shared";
import { SubmitHandler, useForm } from "react-hook-form";

interface SearchOutboundPlanFormInputs {
  number: string;
  startDate: string;
  endDate: string;
}

export const useSearchOutboundPlanForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SearchOutboundPlanFormInputs>();

  const onSubmit: SubmitHandler<SearchOutboundPlanFormInputs> = (data) => {
    console.log(data);
  };

  return {
    inputProps: {
      number: {
        ...register("number", {
          required: { value: true, message: formMessages.required },
          maxLength: { value: 10, message: formMessages.outboundNumberLength },
          minLength: { value: 10, message: formMessages.outboundNumberLength },
        }),
        error: errors.number,
      },
      startDate: {
        ...register("startDate", {
          required: { value: true, message: formMessages.required },
        }),
        error: errors.startDate,
      },
      endDate: {
        ...register("endDate", {
          required: { value: true, message: formMessages.required },
        }),
        error: errors.endDate,
      },
    },
    onSubmit: handleSubmit(onSubmit),
  };
};
