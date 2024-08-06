import clsx from "clsx";
import SuccessMessageIcon from "@/components/icons/SuccessMessageIcon";
import ErrorMessageIcon from "@/components/icons/ErrorMessageIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import Button from "@/components/Button";
import styles from "./styles.module.scss";

interface IAuthFormCardProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onCloseWithButton?: () => void;
}

const AuthFormCard = ({ children, onCloseWithButton, ...formProps }: React.PropsWithChildren<IAuthFormCardProps>) => {
  return (
    <form
      {...formProps}
      className={clsx(styles.card, !!onCloseWithButton && styles.cardWithCloseButton, formProps.className)}
    >
      {onCloseWithButton && (
        <Button variant="icon" className={styles.closeButton} onClick={onCloseWithButton}>
          <CloseIcon />
        </Button>
      )}
      {children}
    </form>
  );
};

interface AuthFormCardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  title: string;
  subtitle: string;
}

AuthFormCard.Header = ({ title, subtitle, ...restProps }: AuthFormCardHeaderProps) => {
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

AuthFormCard.Message = ({ status, message, ...restProps }: AuthFormCardMessageProps) => {
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
