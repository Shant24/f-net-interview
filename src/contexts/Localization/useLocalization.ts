import { useContext } from "react";
import type { LocalizationContextProps } from "./LocalizationContext";
import LocalizationContext from "./LocalizationContext";

const useLocalization = (): LocalizationContextProps => {
  const context = useContext(LocalizationContext);
  if (context === null) {
    throw Error("The Localization context is null.");
  }

  return context;
};

export default useLocalization;
