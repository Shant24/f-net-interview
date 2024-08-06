import { Dialog, DialogPanel } from "@headlessui/react";
import clsx from "clsx";
import Button from "@/components/Button";
import CloseIcon from "@/components/icons/CloseIcon";
import styles from "./styles.module.scss";

interface Props {
  id?: string;
  className?: string;
  isOpen: boolean;
  hasCloseButton?: boolean;
  onClose: () => void;
}

const Modal = ({ children, id, className, isOpen, hasCloseButton, onClose }: React.PropsWithChildren<Props>) => {
  return (
    <Dialog id={id} open={isOpen} as="div" className={styles.modal} onClose={onClose}>
      <div className={styles.backdrop}>
        <div className={styles.wrapper}>
          <DialogPanel transition className={clsx(styles.panel, className)}>
            {hasCloseButton && (
              <Button variant="icon" className={styles.closeButton} onClick={onClose}>
                <CloseIcon />
              </Button>
            )}
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
