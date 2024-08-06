import en from "react-phone-number-input/locale/en";
import hy from "react-phone-number-input/locale/hy";
import ru from "react-phone-number-input/locale/ru";

export const COUNTRIES_LIST: Record<string, Record<string, string>> = {
  en: { ...en, ZZ: "" },
  hy: { ...hy, ZZ: "" },
  ru: { ...ru, ZZ: "" },
};

export const STORAGE_KEYS = {
  USER: "user",
  TOKEN: "token",
  I_18_N: "i18nextLng",
  IS_RESPONSE_SUCCESSFUL: "rs",
} as const;

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 30;
export const CODE_LENGTH = 6;
