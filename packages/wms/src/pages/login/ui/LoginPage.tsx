import { MainButton } from "@shared/main-button";
import styles from "./LoginPage.module.css";
import { MainInput } from "@shared/main-input";
import { SubmitHandler, useForm } from "react-hook-form";
import { CurrentUser, useLogin, useUserStore } from "@/features";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router";

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
  } = useForm<LoginFormInputs>();

  const { setUser, setToken } = useUserStore();

  const { mutate: login } = useLogin((data: AxiosResponse<CurrentUser>) => {
    const authorization: string = (data.headers.getAuthorization as Function)();
    const at = authorization.substring(7);

    setUser(data.data);
    setToken(at);

    navigate("/dashboard");
  });

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
          <h1 className="font-h4">T1-WMS</h1>
          <MainInput
            {...register("email", {
              required: true,
              // maxLength: 10,
              // minLength: 10,
            })}
            placeholder="사원번호"
            autoFocus
            width="fullWidth"
            error={errors.email}
          />
          <MainInput
            placeholder="비밀번호"
            {...register("password", {
              required: true,
              // maxLength: 16,
              // minLength: 6,
            })}
            type="password"
            width="fullWidth"
            error={errors.password}
          />
          <MainButton>Login</MainButton>
        </form>
      </div>
    </div>
  );
};
