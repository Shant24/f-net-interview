import { Link } from "react-router-dom";
import { PagesEnum } from "@/types/enums";
import { useAuth } from "@/store/hooks";
import { lazyRoutes } from "@/routes";
import RequestResponseSwitcher from "./components/RequestResponseSwitcher";
import LanguageSwitcher from "./components/LanguageSwitcher";
import AuthButtons from "./components/AuthButtons";
import Navbar from "./components/Navbar";
import styles from "./styles.module.scss";

const Header = () => {
  const { isAuthorized } = useAuth();

  return (
    <header className={styles.header}>
      <LanguageSwitcher />
      <RequestResponseSwitcher />

      <Link
        to={isAuthorized ? PagesEnum.HOME : PagesEnum.LOGIN}
        className={styles.logo}
        onMouseEnter={isAuthorized ? lazyRoutes.HomePage.preload : lazyRoutes.LoginPage.preload}
      >
        <img src="/assets/svg/logo-with-text.svg" alt="logo" />
      </Link>

      <Navbar />

      <AuthButtons />
    </header>
  );
};

export default Header;
