import { SubmitHandler, useForm } from "react-hook-form";

interface SearchInboundFormInputs {
  number: string;
  startDate: string;
  endDate: string;
}

export const useSearchInboundForm = (
  onValid: (number: string, startDate: string, endDate: string) => void
) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SearchInboundFormInputs>();

  const handleValid: SubmitHandler<SearchInboundFormInputs> = (data) => {
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
