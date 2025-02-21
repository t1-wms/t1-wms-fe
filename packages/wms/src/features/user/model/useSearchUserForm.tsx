import { SubmitHandler, useForm } from "react-hook-form";

interface SearchUserFormInputs {
  staffNumber: string;
}

export const useSearchUserForm = (onValid: (staffNubmer: string) => void) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SearchUserFormInputs>();

  const handleValid: SubmitHandler<SearchUserFormInputs> = (data) => {
    onValid(data.staffNumber);
  };

  return {
    inputProps: {
      staffNumber: {
        ...register("staffNumber", {}),
        error: errors.staffNumber,
      },
    },
    onSubmit: handleSubmit(handleValid),
  };
};
