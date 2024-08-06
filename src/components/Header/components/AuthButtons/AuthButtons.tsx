import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { PagesEnum } from "@/types/enums";
import { useAuth } from "@/store/hooks";
import { lazyRoutes } from "@/routes";
import SignInIcon from "@/components/icons/SignInIcon";
import styles from "./styles.module.scss";

const AuthButtons = () => {
  const { t } = useTranslation("auth");
  const { isAuthorized, signOut } = useAuth();

  return (
    <div className={styles.container}>
      {isAuthorized ? (
        <button
          type="button"
          name="auth-button"
          className={styles.link}
          onClick={signOut}
          onMouseEnter={lazyRoutes.LoginPage.preload}
        >
          <SignInIcon />
          {t("signOut")}
        </button>
      ) : (
        <Link to={PagesEnum.LOGIN} className={styles.link} onMouseEnter={lazyRoutes.LoginPage.preload}>
          <SignInIcon />
          {t("signIn")}
        </Link>
      )}
    </div>
  );
};

export default AuthButtons;
