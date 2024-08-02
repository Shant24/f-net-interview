import { createContext } from "react";
import type { LangCode } from "@/i18n/types";

export type LocalizationState = "idle" | "pending" | "error" | "success";

export interface LocalizationContextProps {
  changeLanguage: (newLocale: LangCode) => void;
  localizationState: LocalizationState;
}

const LocalizationContext = createContext<LocalizationContextProps | null>(null);

export default LocalizationContext;
