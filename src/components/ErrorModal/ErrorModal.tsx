import ErrorMessageIcon from "@/components/icons/ErrorMessageIcon";
import Modal from "@/components/Modal";
import styles from "./styles.module.scss";

interface Props {
  errorMessage: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const ErrorModal = ({ errorMessage, isOpen, onClose }: Props) => {
  return (
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    <Modal id={errorMessage || "error-modal"} className={styles.modal} hasCloseButton isOpen={isOpen} onClose={onClose}>
      <div className={styles.content}>
        <ErrorMessageIcon />
        {errorMessage}
      </div>
    </Modal>
  );
};

export default ErrorModal;
