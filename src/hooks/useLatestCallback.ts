import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useLatestCallback = <Callback extends (...args: any[]) => unknown>(cb: Callback): Callback => {
  const cbRef = useRef(cb);

  useEffect(() => {
    cbRef.current = cb;
  });

  return useRef(((...args) => {
    return cbRef.current(...args);
  }) as Callback).current;
};
