import clsx from "clsx";
import styles from "./styles.module.scss";

interface Props {
  className?: string;
  isOpen: boolean;
  target: React.ReactNode;
  onClose: () => void;
}

const Dropdown = ({ children, className, isOpen, target, onClose }: React.PropsWithChildren<Props>) => {
  return (
    <div className={clsx(styles.dropdown, className)}>
      {target}

      {isOpen && <div className={styles.menu}>{children}</div>}

      {isOpen && <div className={styles.blanket} onClick={onClose} />}
    </div>
  );
};

export default Dropdown;
