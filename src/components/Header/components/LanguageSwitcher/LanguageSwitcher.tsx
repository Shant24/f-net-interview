import type { LangCode } from "@/i18n";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { getSupportedLanguages } from "@/i18n";
import { useLocalization } from "@/contexts/Localization";
import styles from "./styles.module.scss";

interface LocalesListItem {
  code: LangCode;
  name: string;
}

const languages: LocalesListItem[] = [
  { code: "en", name: "Eng" },
  { code: "hy", name: "Հայ" },
  { code: "ru", name: "Рус" },
].filter(({ code }) => getSupportedLanguages().includes(code as LangCode)) as LocalesListItem[];

interface Props {
  isMobile?: boolean;
}

const LanguageSwitcher = ({ isMobile }: Props) => {
  const { i18n } = useTranslation();
  const { changeLanguage } = useLocalization();

  return (
    <div className={clsx(styles.container, isMobile && styles.mobile)}>
      {languages.map(({ code, name }) => (
        <button
          key={code}
          type="button"
          name="lang-button"
          className={clsx(styles.langButton, i18n.language === code && styles.active)}
          onClick={() => changeLanguage(code)}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
