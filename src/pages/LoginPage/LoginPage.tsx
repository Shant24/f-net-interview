import type { ZodType } from "zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ILoginRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

const LoginPage = () => {
  const loginSchema: ZodType<ILoginRequest> = z
    .object({
      email: z.string().email(),
      password: z
        .string()
        .min(8, {
          message: "Password is too short",
        })
        .max(30, {
          message: "Password is too long",
        }),
      confirmPassword: z
        .string()
        .min(8, {
          message: "Confirm password is too short",
        })
        .max(30, {
          message: "Confirm password is too long",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const { register, handleSubmit } = useForm<ILoginRequest>({
    defaultValues: {
      email: "",
      password: "",
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
        <input type="text" placeholder="Email" {...register("email", { required: true })} />

        <input type="password" placeholder="Password" {...register("password", { required: true })} />

        <input type="password" placeholder="Confirm Password" {...register("confirmPassword", { required: true })} />
      </div>

      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginPage;
