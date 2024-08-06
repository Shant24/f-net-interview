import clsx from "clsx";
import SuccessMessageIcon from "@/components/icons/SuccessMessageIcon";
import ErrorMessageIcon from "@/components/icons/ErrorMessageIcon";
import styles from "./styles.module.scss";

const AuthFormCard = (props: React.PropsWithChildren<React.FormHTMLAttributes<HTMLFormElement>>) => {
  const { children, ...formProps } = props;
  return (
    <form {...formProps} className={clsx(styles.card, formProps.className)}>
      {children}
    </form>
  );
};

interface AuthFormCardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  title: string;
  subtitle: string;
}

AuthFormCard.Header = (props: AuthFormCardHeaderProps) => {
  const { title, subtitle, ...restProps } = props;
  return (
    <div {...restProps} className={clsx(styles.cardHeader, restProps.className)}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
};

AuthFormCard.Body = ({ children, ...restProps }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div {...restProps} className={clsx(styles.cardBody, restProps.className)}>
      {children}
    </div>
  );
};

interface AuthFormCardMessageProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  status?: "success" | "error";
  message?: string;
}

AuthFormCard.Message = (props: AuthFormCardMessageProps) => {
  const { status, message, ...restProps } = props;
  return status && message ? (
    <div
      {...restProps}
      className={clsx(
        styles.cardMessage,
        status === "success" && styles.success,
        status === "error" && styles.error,
        restProps.className,
      )}
    >
      {status === "success" && <SuccessMessageIcon />}
      {status === "error" && <ErrorMessageIcon />}
      <p>{message}</p>
    </div>
  ) : null;
};

AuthFormCard.Footer = ({ children, ...restProps }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div {...restProps} className={clsx(styles.cardFooter, restProps.className)}>
      {children}
    </div>
  );
};

export default AuthFormCard;
