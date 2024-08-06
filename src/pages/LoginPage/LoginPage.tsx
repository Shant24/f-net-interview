import { useEffect, useState } from "react";
import type { ZodType } from "zod";
import { z } from "zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { FakeRequestService } from "@/utils/fakeRequestService";
import { loggedInData, useAuth } from "@/store/hooks";
import { PagesEnum } from "@/types/enums";
import { lazyRoutes } from "@/routes";
import { history } from "@/utils/history";
import { Action } from "history";
import EyeOpenIcon from "@/components/icons/EyeOpenIcon";
import EyeCoseIcon from "@/components/icons/EyeCoseIcon";
import AuthFormCard from "@/components/AuthFormCard";
import FormInput from "@/components/Form/FormInput";
import ErrorModal from "@/components/ErrorModal";
import Button from "@/components/Button";
import styles from "./styles.module.scss";

interface ILoginRequest {
  email: string;
  password: string;
}

const defaultValues: ILoginRequest = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const { t } = useTranslation(["form", "auth"]);
  const location = useLocation();
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
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

  useEffect(() => {
    const clearLocationState = () => {
      window.history.replaceState({}, "");
    };

    window.addEventListener("beforeunload", clearLocationState);

    return () => {
      clearLocationState();
      window.removeEventListener("beforeunload", clearLocationState);
    };
  }, []);

  useEffect(() => {
    history.listen(({ location, action }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      if (location.pathname !== PagesEnum.LOGIN && location.state) {
        window.history.replaceState({}, "");
      } else if (action === Action.Pop && location.state) {
        navigate(PagesEnum.LOGIN, { replace: true, state: {} });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePasswordVisibility = () => {
    setIsPasswordHidden((prevState) => !prevState);
  };

  const handleClearRequestError = () => setRequestError(null);

  const handleFormSubmit = async (formData: ILoginRequest) => {
    lazyRoutes.HomePage.preload();
    setIsLoading(true);

    try {
      const response = await FakeRequestService.post("/login", formData, loggedInData);

      signIn(response.data);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setRequestError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
                  <Button
                    name="password-toggle"
                    aria-label="password toggle"
                    variant="icon"
                    onClick={togglePasswordVisibility}
                  >
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

              <Button
                type="submit"
                name="sign-in-button"
                className={styles.signInButton}
                isLoading={isLoading}
                fullWidth
              >
                {t("auth:signIn")}
              </Button>
            </div>
          </AuthFormCard.Body>
        </FormProvider>

        <AuthFormCard.Message
          status={location.state?.status}
          message={location.state?.message ? t(location.state.message) : undefined}
        />

        <AuthFormCard.Footer>
          <div className={styles.footer}>
            <p>{t("auth:registerAsA")}</p>

            <div className="twoColumns">
              <Button as={Link} to={PagesEnum.REGISTER_AS_TEACHER} variant="secondary" textSize="sm">
                {t("auth:teacher")}
              </Button>
              <Button as={Link} to={PagesEnum.REGISTER_AS_DONOR} variant="secondary" textSize="sm">
                {t("auth:donor")}
              </Button>
            </div>
          </div>
        </AuthFormCard.Footer>
      </AuthFormCard>

      <ErrorModal isOpen={!!requestError} errorMessage={requestError} onClose={handleClearRequestError} />
    </>
  );
};

export default LoginPage;
