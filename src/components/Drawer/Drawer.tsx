import { useCallback, useEffect, useId, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export type DrawerRef = { onClose?: () => void } | null;

interface Props {
  id?: string;
  closeRef?: React.MutableRefObject<DrawerRef>;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const delay = 300;

const Drawer = ({ children, className, id, closeRef, isOpen, onClose }: React.PropsWithChildren<Props>) => {
  const [isClosing, setIsClosing] = useState(false);
  const uid = useId();
  const newId = id ?? uid;

  const handleClose = useCallback(() => {
    setIsClosing(true);

    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, delay);
  }, [onClose]);

  useEffect(() => {
    if (closeRef && !closeRef.current) {
      closeRef.current = { onClose: handleClose };
    }

    return () => {
      if (closeRef?.current) {
        closeRef.current = null;
      }
    };
  }, [closeRef, handleClose]);

  return (
    <Dialog id={newId} open={isOpen} as="div" className={styles.drawer} onClose={handleClose}>
      <div className={clsx(styles.backdrop, isOpen && styles.open, isClosing && styles.closing)}>
        <div className={styles.wrapper}>
          <DialogPanel
            transition
            className={clsx(styles.panel, isOpen && styles.open, isClosing && styles.closing, className)}
            style={{ animationDuration: `${delay}ms` }}
          >
            <div className={styles.slider} />
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Drawer;
