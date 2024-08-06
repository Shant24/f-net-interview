import { useEffect, useState } from "react";
import type { ZodType } from "zod";
import type { IStepComponentProps } from "@/components/AuthFormSteps";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { FakeRequestService } from "@/utils/fakeRequestService";
import { PagesEnum } from "@/types/enums";
import { lazyRoutes } from "@/routes";
import { UnsavedChangesModal } from "@/components/UnsavedChangesModal";
import AuthFormCard from "@/components/AuthFormCard";
import FormInput from "@/components/Form/FormInput";
import ErrorModal from "@/components/ErrorModal";
import Button from "@/components/Button";

interface IRecoveryPasswordEmailFormRequest {
  email: string;
}

const defaultValues: IRecoveryPasswordEmailFormRequest = {
  email: "",
};

const RecoveryPasswordEmailForm = ({ step, totalSteps, nextStep }: IStepComponentProps) => {
  const { t } = useTranslation(["form", "auth"]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  const loginSchema: ZodType<IRecoveryPasswordEmailFormRequest> = z.object({
    email: z
      .string()
      .min(1, {
        message: t("form:errors.email.required"),
      })
      .email({ message: t("form:errors.email.invalid") }),
  });

  const methods = useForm<IRecoveryPasswordEmailFormRequest>({
    defaultValues,
    reValidateMode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });

  const {
    formState: { errors, isDirty },
    register,
    handleSubmit,
  } = methods;

  useEffect(() => {
    lazyRoutes.LoginPage.preload();
  }, []);

  const handleClearRequestError = () => setRequestError(null);

  const handleNavigateToLoginPage = () => navigate(PagesEnum.LOGIN);

  const handleFormSubmit = async (formData: IRecoveryPasswordEmailFormRequest) => {
    lazyRoutes.LoginPage.preload();
    setIsLoading(true);

    try {
      const response = await FakeRequestService.post("/recovery-password", formData, { successData: formData });

      nextStep({ from: "recovery-password", data: response.data });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
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
              type="email"
              autoComplete="email"
              placeholder={t("form:titles.email")}
              errorMessage={errors.email?.message}
              {...register("email")}
            />
          </AuthFormCard.Body>
        </FormProvider>

        <AuthFormCard.Footer>
          <Button type="submit" variant="primary" textSize="sm" fullWidth isLoading={isLoading}>
            {t("auth:send")}
          </Button>
        </AuthFormCard.Footer>
      </AuthFormCard>

      <UnsavedChangesModal
        continueText={t("auth:continueRecoveryPassword")}
        isPageDirty={isDirty}
        shouldBlockRouting={isDirty}
      />

      <ErrorModal isOpen={!!requestError} errorMessage={requestError} onClose={handleClearRequestError} />
    </>
  );
};

export default RecoveryPasswordEmailForm;
