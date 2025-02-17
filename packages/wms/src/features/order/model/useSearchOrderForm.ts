import { SubmitHandler, useForm } from "react-hook-form";

interface SearchOrderFormInputs {
  number: string;
  startDate: string;
  endDate: string;
}

export const useSearchOrderForm = (
  onValid: (number: string, startDate: string, endDate: string) => void
) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SearchOrderFormInputs>();

  const handleValid: SubmitHandler<SearchOrderFormInputs> = (data) => {
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
