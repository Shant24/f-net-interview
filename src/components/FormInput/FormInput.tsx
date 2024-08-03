import { forwardRef, memo } from "react";
import type { FiledWrapperProps } from "@/components/FiledWrapper";
import clsx from "clsx";
import FiledWrapper from "@/components/FiledWrapper";
import styles from "./styles.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  errorMessage?: string;
  wrapperProps?: FiledWrapperProps;
}

const FormInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { className, containerClassName, errorMessage, wrapperProps, ...inputProps } = props;

  return (
    <FiledWrapper {...wrapperProps} className={containerClassName} errorMessage={errorMessage}>
      <input {...inputProps} ref={ref} className={clsx(styles.input, errorMessage && styles.error, className)} />
    </FiledWrapper>
  );
});

export default memo(FormInput);
