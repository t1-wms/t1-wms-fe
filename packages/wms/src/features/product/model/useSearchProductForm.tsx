import { SubmitHandler, useForm } from "react-hook-form";

interface SearchProductFormInputs {
  productCode: string;
}

export const useSearchProductForm = (
  onValid: (productCode: string) => void
) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SearchProductFormInputs>();

  const handleValid: SubmitHandler<SearchProductFormInputs> = (data) => {
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
