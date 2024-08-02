import clsx from "clsx";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import styles from "./styles.module.scss";

interface ButtonProps extends Omit<React.HTMLProps<HTMLButtonElement>, "children" | "type"> {
  isOpen?: boolean;
  label?: string;
  valueLabel?: string;
  errorMessage?: string;
}

const DropdownButton = (props: ButtonProps) => {
  const { className, isOpen, label = "Select", valueLabel, errorMessage, ...restProps } = props;

  return (
    <button
      {...restProps}
      type="button"
      className={clsx(styles.dropdownButton, errorMessage && styles.error, className)}
    >
      <div>
        {!valueLabel && label && <span>{label}</span>}

        {valueLabel && <span>{valueLabel}</span>}

        {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
      </div>

      <ChevronDownIcon className={clsx(styles.buttonIcon, isOpen && styles.rotate)} />
    </button>
  );
};

export default DropdownButton;
