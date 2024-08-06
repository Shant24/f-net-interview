import { useTranslation } from "react-i18next";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import styles from "./styles.module.scss";

interface Props {
  isOpen: boolean;
  continueText: string;
  onContinue: () => void;
  onLeave: () => void;
}

const LeavePageConfirmModal = ({ isOpen, continueText, onContinue, onLeave }: Props) => {
  const { t } = useTranslation("auth");
  const title = t("pageLeaveMessage");

  return (
    <Modal id={title} isOpen={isOpen} onClose={onContinue}>
      <div className={styles.header}>
        <p>{title}</p>
      </div>
      <div className={styles.footer}>
        <Button variant="primary" fullWidth onClick={onContinue}>
          {continueText}
        </Button>

        <Button variant="secondary" fullWidth onClick={onLeave}>
          {t("leaveAnyway")}
        </Button>
      </div>
    </Modal>
  );
};

export default LeavePageConfirmModal;
