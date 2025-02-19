import { SubmitHandler, useForm } from "react-hook-form";

interface SearchSupplierFormInputs {
  businessNumber: string;
}

export const useSearchSupplierForm = (
  onValid: (businessNumber: string) => void
) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SearchSupplierFormInputs>();

  const handleValid: SubmitHandler<SearchSupplierFormInputs> = (data) => {
    onValid(data.businessNumber);
  };

  return {
    inputProps: {
      businessNumber: {
        ...register("businessNumber", {}),
        error: errors.businessNumber,
      },
    },
    onSubmit: handleSubmit(handleValid),
  };
};
