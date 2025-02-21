import { SubmitHandler, useForm } from "react-hook-form";

export const useCreateInboundPutAwayForm = (onValid: () => void) => {
  const { handleSubmit } = useForm<{}>();

  const handleValid: SubmitHandler<{}> = () => {
    onValid();
  };

  return {
    onSubmit: handleSubmit(handleValid),
  };
};
