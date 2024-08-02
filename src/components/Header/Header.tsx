import LanguageSwitcher from "./components/LanguageSwitcher";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <LanguageSwitcher />
    </header>
  );
};

export default Header;
