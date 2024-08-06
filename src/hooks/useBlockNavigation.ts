import { useContext, useEffect } from "react";
import type { History as HistoryLib, Blocker, Transition } from "history";
import { UNSAFE_NavigationContext } from "react-router-dom";
import { useLatestCallback } from "@/hooks/useLatestCallback";

export const useBlockNavigation = (blocker: Blocker, shouldBlockRouting = true) => {
  const navigator = useContext(UNSAFE_NavigationContext).navigator as HistoryLib;

  const latestBlocker = useLatestCallback(blocker);

  useEffect(() => {
    if (!shouldBlockRouting) return;

    const unblock = navigator.block(({ action, location, retry }: Transition) => {
      const autoUnblockingTx = {
        action,
        location,
        retry() {
          unblock();
          retry();
        },
      };

      latestBlocker(autoUnblockingTx);
    });

    return () => {
      unblock();
    };
  }, [latestBlocker, navigator, shouldBlockRouting]);
};
