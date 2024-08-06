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
  i18n: "i18nextLng",
} as const;
