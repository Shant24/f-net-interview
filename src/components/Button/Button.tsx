import { forwardRef } from "react";
import { typedMemo } from "@/helpers";
import clsx from "clsx";
import LoadingIcon from "@/components/LoadingIcon";
import styles from "./styles.module.scss";

export type ButtonProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    as?: C extends string ? "button" | "a" : C;
    isLoading?: boolean;
    fullWidth?: boolean;
    disabled?: boolean;
    variant?: "primary" | "secondary" | "danger" | "icon";
    textSize?: "sm" | "lg";
  }
>;

type ButtonComponent = <C extends React.ElementType = "button">(
  props: ButtonProps<C>,
) => React.ReactElement | null | React.ReactNode;

const Button: ButtonComponent = forwardRef(
  <C extends React.ElementType>(props: ButtonProps<C>, ref?: PolymorphicRef<C>) => {
    const {
      as = "button",
      children,
      className,
      type = "button",
      isLoading = false,
      disabled = false,
      fullWidth = false,
      variant = "primary",
      textSize = "lg",
      ...restProps
    } = props;

    const Component = as;

    return (
      <Component
        {...restProps}
        ref={ref}
        type={type}
        className={clsx(
          styles.button,
          fullWidth && styles.fullWidth,
          variant && styles[variant],
          textSize && styles[textSize + "Font"],
          (isLoading || disabled) && styles.disabled,
          className,
        )}
        disabled={isLoading || disabled}
        aria-disabled={isLoading || disabled}
      >
        {children}

        {isLoading && <LoadingIcon className={styles.loadingIcon} color="inherit" />}
      </Component>
    );
  },
);

export default typedMemo(Button);
