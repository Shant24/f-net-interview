import { useEffect } from "react";
import type { EffectCallback } from "react";

export function useOnMount(callback: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, []);
}
