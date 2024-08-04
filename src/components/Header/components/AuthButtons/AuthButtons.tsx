import { useTranslation } from "react-i18next";
import { useAuth } from "@/store/hooks";
import { lazyRoutes } from "@/routes";
import SignInIcon from "@/components/icons/SignInIcon";
import styles from "./styles.module.scss";

const AuthButtons = () => {
  const { t } = useTranslation("auth");
  const { isAuthorized, signIn, signOut } = useAuth();

  return (
    <div className={styles.container}>
      <button
        className={styles.link}
        onClick={isAuthorized ? signOut : signIn}
        onMouseEnter={isAuthorized ? lazyRoutes.LoginPage.preload : lazyRoutes.HomePage.preload}
      >
        <SignInIcon />
        {isAuthorized ? t("signOut") : t("signIn")}
      </button>

      {/* <Link to={PagesEnum.LOGIN} className={styles.link} onClick={signIn} onMouseEnter={lazyRoutes.LoginPage.preload}>
        <SignInIcon />
        {t("signIn")}
      </Link> */}
    </div>
  );
};

export default AuthButtons;
