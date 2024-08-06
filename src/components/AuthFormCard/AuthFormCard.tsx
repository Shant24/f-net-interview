import clsx from "clsx";
import SuccessMessageIcon from "@/components/icons/SuccessMessageIcon";
import ErrorMessageIcon from "@/components/icons/ErrorMessageIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import Button from "@/components/Button";
import Steps from "@/components/Steps";
import styles from "./styles.module.scss";

interface IAuthFormCardProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onlyOneFooterButton?: boolean;
  onCloseWithButton?: () => void;
}

const AuthFormCard = (props: React.PropsWithChildren<IAuthFormCardProps>) => {
  const { children, onlyOneFooterButton, onCloseWithButton, ...formProps } = props;
  return (
    <form
      {...formProps}
      className={clsx(
        styles.card,
        onlyOneFooterButton && styles.onlyOneFooterButton,
        !!onCloseWithButton && styles.cardWithCloseButton,
        formProps.className,
      )}
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

interface AuthFormCardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  step?: number;
  totalSteps?: number;
}

AuthFormCard.Body = ({ children, step, totalSteps, ...restProps }: React.PropsWithChildren<AuthFormCardBodyProps>) => {
  return (
    <div>
      <div {...restProps} className={clsx(styles.cardBody, restProps.className)}>
        {children}
      </div>
      <Steps step={step} totalSteps={totalSteps} isMobile />
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
