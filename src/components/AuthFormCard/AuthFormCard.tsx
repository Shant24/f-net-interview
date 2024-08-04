import clsx from "clsx";
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
      <h3>{subtitle}</h3>
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

AuthFormCard.Message = ({ children, ...restProps }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div {...restProps} className={clsx(styles.cardMessage, restProps.className)}>
      {children}
    </div>
  );
};

interface AuthFormCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  resetStyles?: boolean;
}

AuthFormCard.Footer = ({ children, resetStyles, ...restProps }: React.PropsWithChildren<AuthFormCardFooterProps>) => {
  return (
    <div {...restProps} className={clsx(!resetStyles && styles.cardFooter, restProps.className)}>
      {children}
    </div>
  );
};

export default AuthFormCard;
