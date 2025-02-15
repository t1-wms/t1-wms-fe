import { SubmitHandler, useForm } from "react-hook-form";

interface SearchOutboundPlanFormInputs {
  number: string;
  startDate: string;
  endDate: string;
}

export const useSearchOutboundPlanForm = (
  onValid: (number: string, startDate: string, endDate: string) => void
) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SearchOutboundPlanFormInputs>();

  const handleValid: SubmitHandler<SearchOutboundPlanFormInputs> = (data) => {
    onValid(data.number, data.startDate, data.endDate);
  };

  return {
    inputProps: {
      number: {
        ...register("number", {}),
        error: errors.number,
      },
      startDate: {
        ...register("startDate", {}),
        error: errors.startDate,
      },
      endDate: {
        ...register("endDate", {}),
        error: errors.endDate,
      },
    },
    onSubmit: handleSubmit(handleValid),
  };
};
