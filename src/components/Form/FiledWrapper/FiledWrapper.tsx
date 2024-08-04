import { memo } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export interface FiledWrapperProps {
  className?: string;
  errorMessage?: string;
  backgroundColor?: string;
}

const FiledWrapper = (props: React.PropsWithChildren<FiledWrapperProps>) => {
  const { children, className, backgroundColor = "var(--color-light)", errorMessage } = props;

  return (
    <div className={clsx(styles.wrapper, className)}>
      {children}
      {errorMessage && (
        <span className={styles.errorMessage} style={{ backgroundColor }}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default memo(FiledWrapper);
