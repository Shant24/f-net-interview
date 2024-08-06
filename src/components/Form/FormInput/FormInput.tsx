import { forwardRef, memo } from "react";
import type { FiledWrapperProps } from "@/components/Form/FiledWrapper";
import clsx from "clsx";
import FiledWrapper from "@/components/Form/FiledWrapper";
import styles from "./styles.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  errorMessage?: string;
  errorWithoutMessage?: true | null;
  wrapperProps?: FiledWrapperProps;
  endIcon?: React.ReactNode;
}

const FormInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    className,
    containerClassName,
    errorMessage,
    errorWithoutMessage = null,
    wrapperProps,
    endIcon,
    ...inputProps
  } = props;

  return (
    <FiledWrapper
      {...wrapperProps}
      className={containerClassName}
      errorMessage={errorWithoutMessage === null ? errorMessage : undefined}
    >
      <input
        {...inputProps}
        ref={ref}
        className={clsx(
          styles.input,
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          (errorWithoutMessage || errorMessage) && styles.error,
          endIcon && styles.withEndIcon,
          className,
        )}
      />

      {endIcon && <div className={styles.endIcon}>{endIcon}</div>}
    </FiledWrapper>
  );
});

export default memo(FormInput);
