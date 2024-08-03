import { useState } from "react";
import type { ZodType } from "zod";
import type { IOption } from "@/types";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneNumberInput from "@/components/PhoneNumberInput";
import CustomSelect from "@/components/CustomSelect";
import FormInput from "@/components/FormInput";
import names from "@/data/names.json";
import styles from "./styles.module.scss";

interface ILoginRequest {
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

const LoginPage = () => {
  const { t } = useTranslation("form");
  const [namesOption, setNamesOption] = useState<IOption | null>(null);

  const loginSchema: ZodType<ILoginRequest> = z
    .object({
      email: z
        .string()
        .min(1, {
          message: t("errors.email.required"),
        })
        .email({ message: t("errors.email.invalid") }),
      password: z
        .string()
        .min(1, {
          message: t("errors.password.required"),
        })
        .min(8, {
          message: t("errors.password.min"),
        })
        .max(30, {
          message: t("errors.password.max"),
        }),
      confirmPassword: z
        .string()
        .min(1, {
          message: t("errors.confirmPassword.required"),
        })
        .min(8, {
          message: t("errors.password.min"),
        })
        .max(30, {
          message: t("errors.password.max"),
        }),
      phone: z
        .string()
        .min(2, t("errors.phone.invalid"))
        .refine((value) => isValidPhoneNumber(value), {
          message: t("errors.phone.invalid"),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("errors.confirmPassword.match"),
      path: ["confirmPassword"],
    });

  const methods = useForm<ILoginRequest>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
    reValidateMode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = methods;

  const handleFormSubmit = (data: ILoginRequest) => {
    // eslint-disable-next-line no-console
    console.log("data", data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FormProvider {...methods}>
        <div className={styles.fieldsWrapper}>
          <FormInput
            type="text"
            placeholder={t("titles.email")}
            errorMessage={errors.email?.message}
            {...register("email")}
          />

          <FormInput
            type="password"
            placeholder={t("titles.password")}
            errorMessage={errors.password?.message}
            {...register("password")}
          />

          <FormInput
            type="password"
            placeholder={t("titles.confirmPassword")}
            errorMessage={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <PhoneNumberInput fieldKey="phone" />

          <CustomSelect
            options={names}
            value={namesOption}
            handleValueChange={setNamesOption}
            errorMessage={errors.phone?.message}
          />
        </div>
      </FormProvider>

      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginPage;
