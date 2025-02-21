import { SubmitHandler, useForm } from "react-hook-form";

interface UpdateThresholdFormInputs {
  threshold: number;
}

export const useUpdateThresholdForm = (
  onValid: (threshold: number) => void
) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateThresholdFormInputs>();

  const handleValid: SubmitHandler<UpdateThresholdFormInputs> = (data) => {
    onValid(data.threshold);
  };

  return {
    inputProps: {
      threshold: {
        ...register("threshold", {}),
        error: errors.threshold,
      },
    },
    onSubmit: handleSubmit(handleValid),
  };
};
