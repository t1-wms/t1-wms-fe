import { CurrentUser, useLogin, useUserStore } from "@/features";
import LogoImg from "@assets/logo.svg?react";
import { MainButton } from "@shared/main-button";
import { MainInput } from "@shared/main-input";
import { AxiosError, AxiosResponse } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import styles from "./LoginPage.module.css";

interface LoginFormInputs {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<LoginFormInputs>();

  const { setUser, setToken } = useUserStore();

  const { mutate: login } = useLogin(
    (data: AxiosResponse<CurrentUser>) => {
      const authorization: string = (
        data.headers.getAuthorization as Function
      )();
      const at = authorization.substring(7);

      setUser(data.data);
      setToken(at);

      navigate(
        data.data.userRole === "공급업체" ? "/received-order" : "/dashboard"
      );
    },
    (error: Error) => {
      const e = error as AxiosError;

      if (e.status === 401) {
        setError("email", { message: "존재하지 않는 계정입니다" });
        setError("password", {});
      }
    }
  );

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    login({
      staffNumber: data.email,
      password: data.password,
    });
  };

  return (
    <div className={styles.container}>
      <div className={`${styles["login-box"]} shadow-md`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["logo-box"]}>
            <LogoImg />
            <span className="font-h3">StockHolmes</span>
            <div className="shadow-md" />
          </div>
          <MainInput
            {...register("email", {
              required: true,
            })}
            placeholder="사원번호"
            autoFocus
            width="fullWidth"
            shrink
            error={errors.email}
          />
          <MainInput
            placeholder="비밀번호"
            {...register("password", {
              required: true,
            })}
            type="password"
            width="fullWidth"
            shrink
            error={errors.password}
          />
          <MainButton>Login</MainButton>
        </form>
      </div>
    </div>
  );
};
