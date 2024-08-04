import clsx from "clsx";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import styles from "./styles.module.scss";

export interface DropdownButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "type"> {
  isOpen?: boolean;
  label?: string;
  valueLabel?: string;
  errorMessage?: string;
  hideIcon?: boolean;
}

const DropdownButton = (props: DropdownButtonProps) => {
  const { className, isOpen, label = "Select", valueLabel, errorMessage, hideIcon, ...restProps } = props;

  return (
    <button
      {...restProps}
      type="button"
      name="dropdown-button"
      className={clsx(styles.dropdownButton, errorMessage && styles.error, className)}
    >
      <div>
        {!valueLabel && label && <span>{label}</span>}

        {valueLabel && <span>{valueLabel}</span>}
      </div>

      {!hideIcon && <ChevronDownIcon className={clsx(styles.buttonIcon, isOpen && styles.rotate)} />}
    </button>
  );
};

export default DropdownButton;
