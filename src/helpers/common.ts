import { memo } from "react";

export const typedMemo: <T>(component: T) => T = memo;

export const isExternalURL = (url: string | undefined) => url && /^http(s)?:\/\//.test(url);
