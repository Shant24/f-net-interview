import { useEffect, useState } from "react";
import type { ZodType } from "zod";
import type { IStepComponentProps } from "@/components/AuthFormSteps";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FakeRequestService } from "@/utils/fakeRequestService";
import { PagesEnum } from "@/types/enums";
import { lazyRoutes } from "@/routes";
import { z } from "zod";
import { UnsavedChangesModal } from "@/components/UnsavedChangesModal";
import AuthFormCard from "@/components/AuthFormCard";
import FormInput from "@/components/Form/FormInput";
import Button from "@/components/Button";
import ErrorModal from "@/components/ErrorModal";

interface IRegisterVerificationCardRequest {
  code: string;
}

const defaultValues: IRegisterVerificationCardRequest = {
  code: "",
};

const RegisterVerificationCard = ({ step, totalSteps, componentsState }: IStepComponentProps) => {
  const { t } = useTranslation(["form", "auth"]);
  const navigate = useNavigate();
  const [requestError, setRequestError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const registerAsTeacherSchema: ZodType<IRegisterVerificationCardRequest> = z.object({
    code: z.string().min(1, {
      message: t("form:errors.code.required"),
    }),
  });

  const methods = useForm<IRegisterVerificationCardRequest>({
    defaultValues,
    reValidateMode: "onSubmit",
    resolver: zodResolver(registerAsTeacherSchema),
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = methods;

  useEffect(() => {
    lazyRoutes.LoginPage.preload();
  }, []);

  const handleClearRequestError = () => {
    setRequestError(null);
  };

  const handleFormSubmit = async (formData: IRegisterVerificationCardRequest) => {
    setIsLoading(true);
    setIsSubmitted(true);

    try {
      const verifyPrevData = componentsState[step - 1].data ?? {};
      await FakeRequestService.post("/verify", { ...formData, ...verifyPrevData }, { successData: formData });

      const from = componentsState[step - 1].from;

      const getMessage = () => {
        switch (from) {
          case "teacher":
            return "auth:successfullyRegisteredAsATeacher";

          case "donor":
            return "auth:successfullyRegisteredAsADonor";

          default:
            return "auth:successfullyRegistered";
        }
      };

      navigate(PagesEnum.LOGIN, {
        replace: true,
        state: { status: "success", message: getMessage() },
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setRequestError(error.message);
      setIsSubmitted(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthFormCard onSubmit={handleSubmit(handleFormSubmit)} onlyOneFooterButton>
        <AuthFormCard.Header title={t("auth:verifyAccount")} subtitle={t("auth:pleaseCheckEmail")} />

        <FormProvider {...methods}>
          <AuthFormCard.Body step={step} totalSteps={totalSteps}>
            <FormInput
              type="text"
              placeholder={t("form:titles.code")}
              errorMessage={errors.code?.message}
              {...register("code")}
            />
          </AuthFormCard.Body>
        </FormProvider>

        <AuthFormCard.Footer>
          <Button type="submit" fullWidth variant="primary" textSize="lg" isLoading={isLoading}>
            {t("auth:ok")}
          </Button>
        </AuthFormCard.Footer>
      </AuthFormCard>

      <UnsavedChangesModal
        continueText={t("auth:continueRecoveryPassword")}
        isPageDirty={!isSubmitted}
        shouldBlockRouting={!isSubmitted}
      />

      <ErrorModal isOpen={!!requestError} errorMessage={requestError} onClose={handleClearRequestError} />
    </>
  );
};

export default RegisterVerificationCard;
