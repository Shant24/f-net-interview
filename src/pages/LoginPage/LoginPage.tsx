import { useEffect, useState } from "react";
import type { ZodType } from "zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { PagesEnum } from "@/types/enums";
import { lazyRoutes } from "@/routes";
import EyeOpenIcon from "@/components/icons/EyeOpenIcon";
import EyeCoseIcon from "@/components/icons/EyeCoseIcon";
import AuthFormCard from "@/components/AuthFormCard";
import FormInput from "@/components/Form/FormInput";
import Button from "@/components/Button";
import styles from "./styles.module.scss";

const defaultValues: ILoginRequest = {
  email: "",
  password: "",
};

interface ILoginRequest {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { t } = useTranslation(["form", "auth"]);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const loginSchema: ZodType<ILoginRequest> = z.object({
    email: z
      .string()
      .min(1, {
        message: t("form:errors.email.required"),
      })
      .email({ message: t("form:errors.email.invalid") }),

    password: z
      .string()
      .min(1, {
        message: t("form:errors.password.required"),
      })
      .min(8, {
        message: t("form:errors.password.min"),
      })
      .max(30, {
        message: t("form:errors.password.max"),
      }),
  });

  const methods = useForm<ILoginRequest>({
    defaultValues,
    reValidateMode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = methods;

  useEffect(() => {
    lazyRoutes.RecoveryPassword.preload();
    lazyRoutes.RegisterAsTeacherPage.preload();
    lazyRoutes.RegisterAsDonorPage.preload();
  }, []);

  const togglePasswordVisibility = () => {
    setIsPasswordHidden((prevState) => !prevState);
  };

  const handleFormSubmit = (data: ILoginRequest) => {
    lazyRoutes.HomePage.preload();
    // eslint-disable-next-line no-console
    console.log("data", data);
  };

  return (
    <AuthFormCard onSubmit={handleSubmit(handleFormSubmit)}>
      <AuthFormCard.Header title={t("auth:signIn")} subtitle={t("auth:welcomeBack")} />

      <FormProvider {...methods}>
        <AuthFormCard.Body>
          <div className={styles.fieldsWrapper}>
            <FormInput
              type="email"
              autoComplete="email"
              placeholder={t("form:titles.email")}
              errorMessage={errors.email?.message}
              {...register("email")}
            />

            <FormInput
              type={isPasswordHidden ? "password" : "text"}
              autoComplete="password"
              placeholder={t("form:titles.password")}
              errorMessage={errors.password?.message}
              endIcon={
                <Button variant="icon" onClick={togglePasswordVisibility}>
                  {isPasswordHidden ? <EyeOpenIcon /> : <EyeCoseIcon />}
                </Button>
              }
              {...register("password")}
            />
          </div>

          <div className={styles.actions}>
            <Link to={PagesEnum.FORGOT_PASSWORD} className={styles.toForgotPassword}>
              {t("auth:forgotPassword")}
            </Link>

            <Button type="submit" fullWidth className={styles.signInButton}>
              {t("auth:signIn")}
            </Button>
          </div>
        </AuthFormCard.Body>
      </FormProvider>

      {/* <AuthFormCard.Message></AuthFormCard.Message> */}

      <AuthFormCard.Footer resetStyles className={styles.footer}>
        <p>{t("auth:registerAsA")}</p>

        <div className="twoColumns">
          <Button as={Link} to={PagesEnum.REGISTER_AS_TEACHER} variant="secondary" textSize="sm">
            {t("auth:teacher")}
          </Button>
          <Button as={Link} to={PagesEnum.REGISTER_AS_DONOR} variant="secondary" textSize="sm">
            {t("auth:donor")}
          </Button>
        </div>
      </AuthFormCard.Footer>
    </AuthFormCard>
  );
};

export default LoginPage;
