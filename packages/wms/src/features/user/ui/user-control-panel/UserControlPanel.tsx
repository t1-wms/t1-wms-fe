import styles from "./UserControlPanel.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback } from "react";
import { MainButton, MainInput, useModalStore } from "@/shared";
import { CreateUserModalInfo } from "../../model";

interface UserSearchFormInputs {
  staffNumber: string;
}

export const UserControlPanel = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserSearchFormInputs>();

  const { openModal } = useModalStore();

  const onSubmit: SubmitHandler<UserSearchFormInputs> = (data) => {
    console.log(data);
  };

  const handleClickAdd = useCallback(() => {
    const modalInfo: CreateUserModalInfo = {
      key: "createUser",
    };
    openModal(modalInfo);
  }, [openModal]);

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
        <MainButton size="sm" type="button" onClick={handleClickAdd}>
          추가
        </MainButton>
      </div>
    </form>
  );
};
