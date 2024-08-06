import { useCallback } from "react";
import type { Transition } from "history";
import { noop } from "@/helpers";
import { useBlockNavigation, useUnsavedChanges } from "@/hooks";
import { LeavePageConfirmModal } from "@/components/LeavePageConfirmModal";

interface PageMeta {
  isPageDirty: boolean;
}

interface Props {
  shouldBlockRouting?: boolean;
  isPageDirty?: boolean;
}

const UnsavedChangesModal = ({ shouldBlockRouting = false, isPageDirty = false }: Props) => {
  const { useHandlers, handleUnsavedChanges, useRegisterUnsavedChanges } = useUnsavedChanges();
  const { isVisible, onContinue, onLeave } = useHandlers<PageMeta>();

  useRegisterUnsavedChanges<PageMeta>({
    onSave: Promise.resolve,
    onDiscard: noop,
    shouldRequireSave: false,
    metaData: { isPageDirty },
  });

  const handleNavigationBlock = useCallback(
    (transition: Transition) => {
      handleUnsavedChanges<PageMeta>({
        isBlockerActive: (blocker) =>
          blocker.shouldRequireSave || !!(blocker.metaData as PageMeta | undefined)?.isPageDirty,
      })
        .then(transition.retry)
        .catch(noop);
    },
    [handleUnsavedChanges],
  );

  useBlockNavigation(handleNavigationBlock, shouldBlockRouting);

  return <LeavePageConfirmModal isOpen={isVisible} onContinue={onContinue} onLeave={onLeave} />;
};

export default UnsavedChangesModal;
