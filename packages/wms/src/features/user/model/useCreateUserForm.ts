import { formMessages, Gender } from "@/shared";
import { SubmitHandler, useForm } from "react-hook-form";

interface CreateUserFormInputs {
  name: string;
  staffNumber: string;
  phone: string;
  birthDate: string;
  gender: Gender;
}

export const useCreateUserForm = (
  onValid: (
    name: string,
    staffNumber: string,
    phone: string,
    birthDate: string,
    gender: Gender
  ) => void
) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserFormInputs>();

  const handleValid: SubmitHandler<CreateUserFormInputs> = (data) => {
    onValid(
      data.name,
      data.staffNumber,
      data.phone,
      data.birthDate,
      data.gender
    );
  };

  return {
    inputProps: {
      name: {
        ...register("name", {
          required: { value: true, message: formMessages.required },
        }),
        error: errors.name,
      },
      staffNumber: {
        ...register("staffNumber", {
          required: { value: true, message: formMessages.required },
          minLength: { value: 10, message: formMessages.staffNumberLength },
          maxLength: { value: 10, message: formMessages.staffNumberLength },
        }),
        error: errors.staffNumber,
      },
      phone: {
        ...register("phone", {
          required: { value: true, message: formMessages.required },
          minLength: { value: 11, message: formMessages.phoneLength },
          maxLength: { value: 11, message: formMessages.phoneLength },
        }),
        error: errors.phone,
      },
      birthDate: {
        ...register("birthDate", {
          required: { value: true, message: formMessages.required },
        }),
        error: errors.birthDate,
      },
      gender: { ...register("gender"), error: errors.gender },
    },
    onSubmit: handleSubmit(handleValid),
  };
};
