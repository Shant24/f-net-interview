import { useEffect, useState } from "react";
import type { IStepComponentProps } from "@/components/AuthFormSteps";
import type { ZodType } from "zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@/constants";
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
import schoolOptions from "@/data/schools.json";
import subjectOptions from "@/data/subjects.json";
import gradeOptions from "@/data/grades.json";
import styles from "./styles.module.scss";

interface IRegisterAsTeacherRequest {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  region: string;
  cityVillage: string;
  school: string;
  subject: string[];
  grade: string[];
  password: string;
  confirmPassword: string;
}

const defaultValues: IRegisterAsTeacherRequest = {
  email: "",
  name: "",
  lastName: "",
  phone: "",
  region: "",
  cityVillage: "",
  school: "",
  subject: [],
  grade: [],
  password: "",
  confirmPassword: "",
};

const TeacherRegisterForm = ({ nextStep }: IStepComponentProps) => {
  const { t } = useTranslation(["form", "auth"]);
  const [isNewPasswordHidden, setIsNewPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  const registerAsTeacherSchema: ZodType<IRegisterAsTeacherRequest> = z
    .object({
      name: z
        .string()
        .min(1, {
          message: t("form:errors.name.required"),
        })
        .max(PASSWORD_MAX_LENGTH, {
          message: t("form:errors.name.max"),
        }),

      lastName: z
        .string()
        .min(1, {
          message: t("form:errors.lastName.required"),
        })
        .max(PASSWORD_MAX_LENGTH, {
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

      region: z.string().min(1, {
        message: t("form:errors.region.required"),
      }),

      cityVillage: z.string().min(1, {
        message: t("form:errors.cityVillage.required"),
      }),

      school: z.string().min(1, {
        message: t("form:errors.school.required"),
      }),

      subject: z
        .array(
          z.string().min(1, {
            message: t("form:errors.subject.required"),
          }),
        )
        .min(1, {
          message: t("form:errors.subject.required"),
        }),

      grade: z
        .array(
          z.string().min(1, {
            message: t("form:errors.grade.required"),
          }),
        )
        .min(1, {
          message: t("form:errors.grade.required"),
        }),

      password: z
        .string()
        .min(1, {
          message: t("form:errors.password.required"),
        })
        .min(PASSWORD_MIN_LENGTH, {
          message: t("form:errors.password.min"),
        })
        .max(PASSWORD_MAX_LENGTH, {
          message: t("form:errors.password.max"),
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
    .refine((data) => data.password === data.confirmPassword, {
      message: t("form:errors.confirmPassword.match"),
      path: ["confirmPassword"],
    });

  const methods = useForm<IRegisterAsTeacherRequest>({
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

  const { region: countryCode } = watch();

  const { countryOptions, cityOptions } = useAddress({
    shouldCombineStatesToCities: true,
    selectedCountryCode: countryCode,
  });

  useEffect(() => {
    setValue("cityVillage", "");
  }, [countryCode, setValue]);

  useEffect(() => {
    lazyRoutes.RegisterAsDonorPage.preload();
  }, []);

  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordHidden((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordHidden((prevState) => !prevState);
  };

  const handleClearRequestError = () => setRequestError(null);

  const handleFormSubmit = async (formData: IRegisterAsTeacherRequest) => {
    setIsLoading(true);

    try {
      const response = await FakeRequestService.post("/register-as-teacher", formData, { successData: formData });
      nextStep({ from: "teacher", data: response.data });

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

            <PhoneNumberInput<IRegisterAsTeacherRequest> fieldKey="phone" />

            <FormSelect<IRegisterAsTeacherRequest>
              fieldKey="region"
              label={t("form:titles.region")}
              options={countryOptions}
            />

            <FormSelect<IRegisterAsTeacherRequest>
              fieldKey="cityVillage"
              label={t("form:titles.cityVillage")}
              options={cityOptions}
            />

            <FormSelect<IRegisterAsTeacherRequest>
              fieldKey="school"
              label={t("form:titles.school")}
              options={schoolOptions}
            />

            <FormSelect<IRegisterAsTeacherRequest>
              isMulti
              fieldKey="subject"
              label={t("form:titles.subject")}
              options={subjectOptions}
            />

            <FormSelect<IRegisterAsTeacherRequest>
              isMulti
              fieldKey="grade"
              label={t("form:titles.grade")}
              options={gradeOptions}
            />

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
          <Link to={PagesEnum.REGISTER_AS_DONOR} className={styles.link}>
            {t("auth:registerAsADonor")}
          </Link>

          <Button type="submit" variant="primary" textSize="sm" isLoading={isLoading}>
            {t("auth:ok")}
          </Button>
        </AuthFormCard.Footer>
      </AuthFormCard>

      <UnsavedChangesModal
        continueText={t("auth:continueRegistration")}
        isPageDirty={isDirty}
        shouldBlockRouting={isDirty}
      />

      <ErrorModal isOpen={!!requestError} errorMessage={requestError} onClose={handleClearRequestError} />
    </>
  );
};

export default TeacherRegisterForm;
