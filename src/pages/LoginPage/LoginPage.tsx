import type { ZodType } from "zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

interface ILoginRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

const LoginPage = () => {
  const { t } = useTranslation("form");

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
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("errors.confirmPassword.match"),
      path: ["confirmPassword"],
    });

  const { register, handleSubmit } = useForm<ILoginRequest>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    reValidateMode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });

  const handleFormSubmit = (data: ILoginRequest) => {
    // eslint-disable-next-line no-console
    console.log("data", data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <input type="text" placeholder={t("titles.email")} {...register("email", { required: true })} />

        <input type="password" placeholder={t("titles.password")} {...register("password", { required: true })} />

        <input
          type="password"
          placeholder={t("titles.confirmPassword")}
          {...register("confirmPassword", { required: true })}
        />
      </div>

      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginPage;
