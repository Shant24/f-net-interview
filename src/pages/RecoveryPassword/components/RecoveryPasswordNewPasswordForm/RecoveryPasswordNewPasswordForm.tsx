import { useEffect, useState } from "react";
import type { ZodType } from "zod";
import type { IStepComponentProps } from "@/components/AuthFormSteps";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { CODE_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@/constants";
import { FakeRequestService } from "@/utils/fakeRequestService";
import { PagesEnum } from "@/types/enums";
import { lazyRoutes } from "@/routes";
import { UnsavedChangesModal } from "@/components/UnsavedChangesModal";
import EyeOpenIcon from "@/components/icons/EyeOpenIcon";
import EyeCoseIcon from "@/components/icons/EyeCoseIcon";
import AuthFormCard from "@/components/AuthFormCard";
import FormInput from "@/components/Form/FormInput";
import ErrorModal from "@/components/ErrorModal";
import Button from "@/components/Button";
import styles from "./styles.module.scss";

interface IRecoveryPasswordNewPasswordFormRequest {
  code: string;
  newPassword: string;
  confirmPassword: string;
}

const defaultValues: IRecoveryPasswordNewPasswordFormRequest = {
  code: "",
  newPassword: "",
  confirmPassword: "",
};

const RecoveryPasswordNewPasswordForm = ({ step, totalSteps }: IStepComponentProps) => {
  const { t } = useTranslation(["form", "auth"]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isResendLoading, setResendIsLoading] = useState(false);
  const [isCodeError, setIsCodeError] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [isNewPasswordHidden, setIsNewPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);

  const invalidCodeMessage = t("form:errors.code.invalid");

  const loginSchema: ZodType<IRecoveryPasswordNewPasswordFormRequest> = z
    .object({
      code: z
        .string()
        .min(1, {
          message: t("form:errors.code.required"),
        })
        .min(CODE_LENGTH, {
          message: t("form:errors.code.min"),
        })
        .max(CODE_LENGTH, {
          message: t("form:errors.code.max"),
        }),

      newPassword: z
        .string()
        .min(1, {
          message: t("form:errors.newPassword.required"),
        })
        .min(PASSWORD_MIN_LENGTH, {
          message: t("form:errors.newPassword.min"),
        })
        .max(PASSWORD_MAX_LENGTH, {
          message: t("form:errors.newPassword.max"),
        }),

      confirmPassword: z
        .string()
        .min(1, {
          message: t("form:errors.confirmPassword.required"),
        })
        .min(PASSWORD_MIN_LENGTH, {
          message: t("form:errors.confirmPassword.min"),
        })
        .max(PASSWORD_MAX_LENGTH, {
          message: t("form:errors.confirmPassword.max"),
        }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t("form:errors.confirmPassword.match"),
      path: ["confirmPassword"],
    });

  const methods = useForm<IRecoveryPasswordNewPasswordFormRequest>({
    defaultValues,
    reValidateMode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });

  const {
    formState: { errors },
    trigger,
    register,
    setError,
    setValue,
    handleSubmit,
  } = methods;

  useEffect(() => {
    lazyRoutes.LoginPage.preload();
  }, []);

  const handleClearRequestError = () => setRequestError(null);

  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordHidden((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordHidden((prevState) => !prevState);
  };

  const handleNavigateToLoginPage = () => navigate(PagesEnum.LOGIN);

  const setCodeErrorData = (errorMessage: string) => {
    setError("code", { type: "manual", message: errorMessage });
    setIsCodeError(true);
    setValue("newPassword", "");
    setValue("confirmPassword", "");
  };

  const handleResendCode = async () => {
    setResendIsLoading(true);

    try {
      await FakeRequestService.post<undefined>("/recovery-password/verify", {});

      trigger("code", { shouldFocus: true });
      setValue("code", "");
      setIsCodeError(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setRequestError(error.message);
    } finally {
      setResendIsLoading(false);
    }
  };

  const handleFormSubmit = async (formData: IRecoveryPasswordNewPasswordFormRequest) => {
    trigger();
    lazyRoutes.LoginPage.preload();
    setIsLoading(true);
    setIsCodeError(false);
    setIsSuccessfullySubmitted(true);

    try {
      await FakeRequestService.post("/recovery-password", formData, {
        successData: formData,
        errorData: {
          status: 400,
          message: invalidCodeMessage,
        },
      });

      navigate(PagesEnum.LOGIN, {
        replace: true,
        state: { status: "success", message: "auth:successfullyRecover" },
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsSuccessfullySubmitted(false);

      if (error.status === 400 && error.message === invalidCodeMessage) {
        setCodeErrorData(error.message);
        return;
      }

      setRequestError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthFormCard
        onlyOneFooterButton
        onSubmit={handleSubmit(handleFormSubmit)}
        onCloseWithButton={handleNavigateToLoginPage}
      >
        <AuthFormCard.Header title={t("auth:recoverPassword")} subtitle={t("auth:pleaseEnterEmail")} />

        <FormProvider {...methods}>
          <AuthFormCard.Body step={step} totalSteps={totalSteps}>
            <FormInput
              type="number"
              autoComplete="one-time-code"
              placeholder={t("form:titles.code")}
              errorMessage={errors.code?.message}
              errorWithoutMessage={isCodeError || null}
              {...register("code")}
            />

            <div className={styles.resendCodeWrapper}>
              <span className={styles.codeErrorMessage}>{isCodeError && errors.code?.message}</span>

              <Button variant="icon" onClick={handleResendCode} disabled={isResendLoading}>
                {t("auth:resendCode")}
              </Button>
            </div>

            <div className={styles.passwordsWrapper}>
              <FormInput
                type={isNewPasswordHidden ? "password" : "text"}
                autoComplete="new-password"
                placeholder={t("form:titles.newPassword")}
                errorMessage={errors.newPassword?.message}
                endIcon={
                  <Button
                    name="password-toggle"
                    aria-label="password toggle"
                    variant="icon"
                    onClick={toggleNewPasswordVisibility}
                  >
                    {isNewPasswordHidden ? <EyeOpenIcon /> : <EyeCoseIcon />}
                  </Button>
                }
                {...register("newPassword")}
              />

              <FormInput
                type={isConfirmPasswordHidden ? "password" : "text"}
                autoComplete="new-password"
                placeholder={t("form:titles.confirmPassword")}
                errorMessage={errors.confirmPassword?.message}
                endIcon={
                  <Button
                    name="password-toggle"
                    aria-label="password toggle"
                    variant="icon"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {isConfirmPasswordHidden ? <EyeOpenIcon /> : <EyeCoseIcon />}
                  </Button>
                }
                {...register("confirmPassword")}
              />
            </div>

            <Button
              type="submit"
              className={styles.submitButton}
              variant="primary"
              textSize="sm"
              fullWidth
              isLoading={isLoading}
            >
              {t("auth:done")}
            </Button>
          </AuthFormCard.Body>
        </FormProvider>

        <AuthFormCard.Footer>
          <Button as={Link} to={PagesEnum.LOGIN} variant="secondary" textSize="lg" fullWidth>
            {t("auth:iRemember")}
          </Button>
        </AuthFormCard.Footer>
      </AuthFormCard>

      <UnsavedChangesModal
        continueText={t("auth:continueRecoveryPassword")}
        isPageDirty={!isSuccessfullySubmitted}
        shouldBlockRouting={!isSuccessfullySubmitted}
      />

      <ErrorModal isOpen={!!requestError} errorMessage={requestError} onClose={handleClearRequestError} />
    </>
  );
};

export default RecoveryPasswordNewPasswordForm;
