import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/store/hooks";
import { PagesEnum } from "@/types/enums";
import { lazyRoutes } from "@/routes";
import styles from "./styles.module.scss";

const Navbar = () => {
  const { isAuthorized } = useAuth();
  const { t } = useTranslation("common");

  const menuItems = [
    {
      label: t("navbar.teachers"),
      link: PagesEnum.TEACHERS,
      preload: lazyRoutes.TeachersPage.preload,
    },
    {
      label: t("navbar.donors"),
      link: PagesEnum.DONORS,
      preload: lazyRoutes.DonorsPage.preload,
    },
    {
      label: t("navbar.aboutUs"),
      link: PagesEnum.ABOUT_US,
      preload: lazyRoutes.AboutUsPage.preload,
    },
    {
      label: t("navbar.contactUs"),
      link: PagesEnum.CONTACT_US,
      preload: lazyRoutes.ContactUsPage.preload,
    },
    {
      label: t("navbar.blog"),
      link: PagesEnum.BLOG,
      preload: lazyRoutes.BlogPage.preload,
    },
  ];

  return (
    <nav className={styles.navbar}>
      <ul>
        {menuItems.map(({ label, link, preload }) => (
          <li key={link}>
            <NavLink
              to={link}
              className={({ isActive }) => clsx(isActive && styles.active)}
              onMouseEnter={isAuthorized ? preload : undefined}
              onClick={(e) => !isAuthorized && e.preventDefault()}
              aria-disabled={!isAuthorized}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
