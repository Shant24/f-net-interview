/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useOnMount } from "@/hooks/useOnMount";

interface IUseRegisterProps<MetaData = any> {
  shouldRequireSave: boolean;
  onSave: () => Promise<void>;
  onDiscard: () => void;
  metaData: MetaData;
}

interface IUnsavedChangesHandlers<MetaData = any> {
  onSave: () => void;
  onContinue: () => void;
  onLeave: () => void;
  isVisible: boolean;
  isSavePending: boolean;
  metaData: (MetaData | undefined)[];
}

interface IHandleSaveProps<MetaData = any> {
  isBlockerActive?: (registeredBlocker: IUseRegisterProps<MetaData>) => boolean;
}

interface IGlobalContainer {
  blockers: Record<string, IUseRegisterProps>;
  resolveCallbacks: (() => void)[];
  rejectCallbacks: (() => void)[];
  subscribers: ((info: IUnsavedChangesHandlers) => void)[];
  isPending: boolean;
}

const getEmptyContainer = (): IGlobalContainer => ({
  blockers: {},
  resolveCallbacks: [],
  rejectCallbacks: [],
  subscribers: [],
  isPending: false,
});

let globalContainer = getEmptyContainer();

export const useUnsavedChanges = () => {
  const clearAll = () => {
    globalContainer = getEmptyContainer();
  };

  const useRegisterUnsavedChanges = <MetaData = unknown>(props: IUseRegisterProps<MetaData>) => {
    const key = useRef(Math.random()).current.toString();

    useEffect(() => {
      globalContainer.blockers[key] = props;
      return () => {
        delete globalContainer.blockers[key];
      };
    });
  };

  const shouldRequireSave = (
    isBlockerActive: IHandleSaveProps["isBlockerActive"] = (props) => props.shouldRequireSave,
  ) => {
    return Object.entries(globalContainer.blockers).some(([, props]) => isBlockerActive(props));
  };

  const rerender = () => {
    const info = getInfo();

    globalContainer.subscribers.forEach((cb) => {
      cb(info);
    });
  };

  const handleUnsavedChanges = <MetaData = any>(props: IHandleSaveProps<MetaData> = {}): Promise<void> => {
    if (!shouldRequireSave(props.isBlockerActive)) {
      discardAll();
      rerender();
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const cleanUp = () => {
        globalContainer.resolveCallbacks = globalContainer.resolveCallbacks.filter((cb) => cb !== handleResolve);
        globalContainer.rejectCallbacks = globalContainer.rejectCallbacks.filter((cb) => cb !== handleReject);
      };

      const handleResolve = () => {
        cleanUp();
        resolve();
      };

      const handleReject = () => {
        cleanUp();
        reject();
      };

      globalContainer.resolveCallbacks.push(handleResolve);
      globalContainer.rejectCallbacks.push(handleReject);

      rerender();
    });
  };

  const subscribe = (cb: (info: IUnsavedChangesHandlers) => void) => {
    globalContainer.subscribers.push(cb);

    return () => {
      globalContainer.subscribers = globalContainer.subscribers.filter((fn) => fn !== cb);
    };
  };

  const discardAll = () => {
    Object.entries(globalContainer.blockers).forEach(([, props]) => props.onDiscard());
  };

  const getInfo = (): IUnsavedChangesHandlers => {
    const registered = Object.entries(globalContainer.blockers)
      .filter(([, props]) => props.shouldRequireSave)
      .map(([, props]) => props);

    const resolveAll = () => {
      globalContainer.resolveCallbacks.forEach((fn) => fn());
    };
    const rejectAll = () => {
      globalContainer.rejectCallbacks.forEach((fn) => fn());
    };

    return {
      isVisible: globalContainer.resolveCallbacks.length > 0,
      isSavePending: globalContainer.isPending,
      metaData: registered.map((props) => props.metaData),
      onSave: () => {
        const onSaves = registered.map((props) => props.onSave());
        globalContainer.isPending = true;
        rerender();
        return Promise.all(onSaves)
          .then(resolveAll)
          .catch(rejectAll)
          .finally(() => {
            globalContainer.isPending = false;
            rerender();
          });
      },
      onContinue: () => {
        rejectAll();
        rerender();
      },
      onLeave: () => {
        discardAll();
        resolveAll();
        rerender();
      },
    };
  };

  const useHandlers = <MetaData = unknown>(): IUnsavedChangesHandlers<MetaData> => {
    const [state, setState] = useState(getInfo);

    useOnMount(() => {
      const unsubscribe = subscribe(setState);

      return () => {
        unsubscribe();
      };
    });

    return state as IUnsavedChangesHandlers<MetaData>;
  };

  return { useRegisterUnsavedChanges, useHandlers, handleUnsavedChanges, clearAll };
};
