import { formMessages } from "@/shared";
import { SubmitHandler, useForm } from "react-hook-form";

interface CreateOutboundPlanFormInputs {
  productionPlanNumber: string;
  outboundScheduleDate: string;
  planDate: string;
}

export const useCreateOutboundPlanForm = (
  onValid: (
    productionPlanNumber: string,
    outboundScheduleDate: string,
    planDate: string
  ) => void
) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateOutboundPlanFormInputs>();

  const handleValid: SubmitHandler<CreateOutboundPlanFormInputs> = (data) => {
    onValid(
      data.productionPlanNumber,
      data.outboundScheduleDate,
      data.planDate
    );
  };

  return {
    inputProps: {
      productionPlanNumber: {
        ...register("productionPlanNumber", {
          required: { value: true, message: formMessages.required },
        }),
        error: errors.productionPlanNumber,
      },
      outboundScheduleDate: {
        ...register("outboundScheduleDate", {}),
        error: errors.outboundScheduleDate,
      },
      planDate: {
        ...register("planDate", {
          required: { value: true, message: formMessages.required },
        }),
        error: errors.planDate,
      },
    },
    onSubmit: handleSubmit(handleValid),
  };
};
