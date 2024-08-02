import styles from "./styles.module.scss";

interface Props {
  isOpen: boolean;
  target: React.ReactNode;
  onClose: () => void;
}

const Dropdown = ({ children, isOpen, target, onClose }: React.PropsWithChildren<Props>) => {
  return (
    <div className={styles.dropdown}>
      {target}

      {isOpen && <div className={styles.menu}>{children}</div>}

      {isOpen && <div className={styles.blanket} onClick={onClose} />}
    </div>
  );
};

export default Dropdown;
