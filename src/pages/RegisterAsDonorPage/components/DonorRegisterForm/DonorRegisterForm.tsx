import { useEffect, useState } from "react";
import type { StepComponentProps } from "@/components/AuthFormSteps";
import type { ZodType } from "zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { FakeRequestService } from "@/utils/fakeRequestService";
import { PagesEnum } from "@/types/enums";
import { lazyRoutes } from "@/routes";
import { useAddress } from "@/hooks";
import { UnsavedChangesModal } from "@/components/UnsavedChangesModal";
import PhoneNumberInput from "@/components/Form/PhoneNumberInput";
import EyeOpenIcon from "@/components/icons/EyeOpenIcon";
import EyeCoseIcon from "@/components/icons/EyeCoseIcon";
import FormSelect from "@/components/Form/FormSelect";
import AuthFormCard from "@/components/AuthFormCard";
import FormInput from "@/components/Form/FormInput";
import ErrorModal from "@/components/ErrorModal";
import Button from "@/components/Button";
import styles from "./styles.module.scss";

interface IRegisterAsDonorRequest {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  regionState: string;
  city: string;
  password: string;
  confirmPassword: string;
}

const defaultValues: IRegisterAsDonorRequest = {
  email: "",
  name: "",
  lastName: "",
  phone: "",
  country: "",
  regionState: "",
  city: "",
  password: "",
  confirmPassword: "",
};

const DonorRegisterForm = ({ nextStep }: StepComponentProps) => {
  const { t } = useTranslation(["form", "auth"]);
  const [isNewPasswordHidden, setIsNewPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  const registerAsTeacherSchema: ZodType<IRegisterAsDonorRequest> = z
    .object({
      name: z
        .string()
        .min(1, {
          message: t("form:errors.name.required"),
        })
        .max(30, {
          message: t("form:errors.name.max"),
        }),

      lastName: z
        .string()
        .min(1, {
          message: t("form:errors.lastName.required"),
        })
        .max(30, {
          message: t("form:errors.lastName.max"),
        }),

      email: z
        .string()
        .min(1, {
          message: t("form:errors.email.required"),
        })
        .email({ message: t("form:errors.email.invalid") }),

      phone: z
        .string()
        .min(1, {
          message: t("form:errors.phone.required"),
        })
        .refine((value) => isValidPhoneNumber(value), {
          message: t("form:errors.phone.invalid"),
        }),

      country: z.string().min(1, {
        message: t("form:errors.country.required"),
      }),

      regionState: z.string().min(1, {
        message: t("form:errors.regionState.required"),
      }),

      city: z.string().min(1, {
        message: t("form:errors.city.required"),
      }),

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

      confirmPassword: z
        .string()
        .min(1, {
          message: t("form:errors.confirmPassword.required"),
        })
        .min(8, {
          message: t("form:errors.confirmPassword.min"),
        })
        .max(30, {
          message: t("form:errors.confirmPassword.max"),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("form:errors.confirmPassword.match"),
      path: ["confirmPassword"],
    });

  const methods = useForm<IRegisterAsDonorRequest>({
    defaultValues,
    reValidateMode: "onSubmit",
    resolver: zodResolver(registerAsTeacherSchema),
  });

  const {
    formState: { errors, isDirty },
    watch,
    register,
    setValue,
    handleSubmit,
  } = methods;

  const { country, regionState } = watch();

  const { countryOptions, regionStateOptions, cityOptions } = useAddress({
    selectedCountryCode: country,
    selectedRegionState: regionState,
  });

  useEffect(() => {
    setValue("regionState", "");
    setValue("city", "");
  }, [country, setValue]);

  useEffect(() => {
    setValue("city", "");
  }, [regionState, setValue]);

  useEffect(() => {
    lazyRoutes.RegisterAsTeacherPage.preload();
  }, []);

  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordHidden((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordHidden((prevState) => !prevState);
  };

  const handleClearRequestError = () => setRequestError(null);

  const handleFormSubmit = async (formData: IRegisterAsDonorRequest) => {
    setIsLoading(true);

    try {
      const response = await FakeRequestService.post("/register-as-donor", formData, formData);
      nextStep({ from: "donor", data: response.data });

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
        <AuthFormCard.Header title={t("auth:signUp")} subtitle={t("auth:itIsQuick")} />

        <FormProvider {...methods}>
          <AuthFormCard.Body className={styles.fieldsWrapper}>
            <div className="twoColumns">
              <FormInput
                type="text"
                placeholder={t("form:titles.name")}
                errorMessage={errors.name?.message}
                {...register("name")}
              />
              <FormInput
                type="text"
                placeholder={t("form:titles.lastName")}
                errorMessage={errors.lastName?.message}
                {...register("lastName")}
              />
            </div>

            <FormInput
              type="email"
              autoComplete="email"
              placeholder={t("form:titles.email")}
              errorMessage={errors.email?.message}
              {...register("email")}
            />

            <PhoneNumberInput<IRegisterAsDonorRequest> fieldKey="phone" />

            <FormSelect<IRegisterAsDonorRequest>
              fieldKey="country"
              label={t("form:titles.country")}
              options={countryOptions}
            />

            <FormSelect<IRegisterAsDonorRequest>
              fieldKey="regionState"
              label={t("form:titles.regionState")}
              options={regionStateOptions}
            />

            <FormSelect<IRegisterAsDonorRequest> fieldKey="city" label={t("form:titles.city")} options={cityOptions} />

            <FormInput
              type={isNewPasswordHidden ? "password" : "text"}
              autoComplete="new-password"
              placeholder={t("form:titles.password")}
              errorMessage={errors.password?.message}
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
              {...register("password")}
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
          </AuthFormCard.Body>
        </FormProvider>

        <AuthFormCard.Footer>
          <Link to={PagesEnum.REGISTER_AS_TEACHER} className={styles.link}>
            {t("auth:registerAsATeacher")}
          </Link>

          <Button type="submit" variant="primary" textSize="sm" isLoading={isLoading}>
            {t("auth:ok")}
          </Button>
        </AuthFormCard.Footer>
      </AuthFormCard>

      <UnsavedChangesModal isPageDirty={isDirty} shouldBlockRouting={isDirty} />

      <ErrorModal isOpen={!!requestError} errorMessage={requestError} onClose={handleClearRequestError} />
    </>
  );
};

export default DonorRegisterForm;
