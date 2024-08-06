import { memo } from "react";

export const typedMemo: <T>(component: T) => T = memo;

export const isExternalURL = (url: string | undefined) => url && /^http(s)?:\/\//.test(url);

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function
export const noop = (..._args: any) => {};
