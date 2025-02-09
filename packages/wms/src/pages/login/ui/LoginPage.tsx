import { MainButton } from "@shared/main-button";
import styles from "./LoginPage.module.css";
import { MainInput } from "@shared/main-input";
import { SubmitHandler, useForm } from "react-hook-form";

interface LoginFormInputs {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const {
    register,
    // formState: { errors },
    handleSubmit,
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <div className={`${styles["login-box"]} shadow-md`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="font-h4">T1-WMS</h1>
          <MainInput
            {...register("email", {
              required: true,
              maxLength: 10,
              minLength: 10,
            })}
            placeholder="사원번호"
            autoFocus
          />
          <MainInput
            placeholder="비밀번호"
            {...register("password", {
              required: true,
              maxLength: 16,
              minLength: 6,
            })}
            type="password"
          />
          <MainButton>Login</MainButton>
        </form>
      </div>
    </div>
  );
};
