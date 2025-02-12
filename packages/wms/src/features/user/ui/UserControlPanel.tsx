import { MainInput } from "@shared/main-input";
import styles from "./UserControlPanel.module.css";
import { MainButton } from "@shared/main-button";
import { SubmitHandler, useForm } from "react-hook-form";

interface UserSearchFormInputs {
  staffNumber: string;
}

export const UserControlPanel = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserSearchFormInputs>();

  const onSubmit: SubmitHandler<UserSearchFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles["input-box"]}>
        <MainInput
          label="사용자 ID"
          width="120px"
          fontSize="sm"
          autoFocus
          error={errors.staffNumber}
          {...register("staffNumber", {
            required: "필수로 입력해야합니다",
            maxLength: {
              value: 10,
              message: "최대 10글자까지 입력 가능합니다",
            },
          })}
        />
      </div>
      <div className={styles["button-box"]}>
        <MainButton size="sm">조회</MainButton>
        <MainButton size="sm" type="button">
          추가
        </MainButton>
      </div>
    </form>
  );
};
