import { SubmitHandler, useForm } from "react-hook-form";

interface SearchThresholdFormInputs {
  productCode: string;
}

export const useSearchThresholdForm = (
  onValid: (productCode: string) => void
) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SearchThresholdFormInputs>();

  const handleValid: SubmitHandler<SearchThresholdFormInputs> = (data) => {
    onValid(data.productCode);
  };

  return {
    inputProps: {
      productCode: {
        ...register("productCode", {}),
        error: errors.productCode,
      },
    },
    onSubmit: handleSubmit(handleValid),
  };
};
