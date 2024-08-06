import { useEffect } from "react";
import { useLatestCallback } from "@/hooks/useLatestCallback";

const useOnUnmount = (callback: () => void) => {
  const latestCallback = useLatestCallback(callback);

  useEffect(() => {
    return function cleanup() {
      latestCallback();
    };
  }, [latestCallback]);
};

export default useOnUnmount;
