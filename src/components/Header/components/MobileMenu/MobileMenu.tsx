import { useEffect, useRef, useState } from "react";
import type { DrawerRef } from "@/components/Drawer";
import MenuBurgerIcon from "@/components/icons/MenuBurgerIcon";
import RequestResponseSwitcher from "@/components/Header/components/RequestResponseSwitcher";
import LanguageSwitcher from "@/components/Header/components/LanguageSwitcher";
import AuthButtons from "@/components/Header/components/AuthButtons";
import Navbar from "@/components/Header/components/Navbar";
import Button from "@/components/Button";
import Drawer from "@/components/Drawer";
import styles from "./styles.module.scss";
import { useLocation } from "react-router-dom";

const MobileMenu = () => {
  const drawerCloseRef = useRef<DrawerRef>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    drawerCloseRef.current?.onClose?.();
  }, [pathname]);

  return (
    <div className={styles.mobileMenu}>
      <Button variant="icon" className={styles.burgerMenuIcon} onClick={toggleMenu}>
        <MenuBurgerIcon />
      </Button>

      <Drawer closeRef={drawerCloseRef} isOpen={isMenuOpen} onClose={closeMenu}>
        <Navbar isMobile />
        <LanguageSwitcher isMobile />

        <div className={styles.actionsButtons}>
          <AuthButtons isMobile />
          <RequestResponseSwitcher isMobile />
        </div>
      </Drawer>
    </div>
  );
};

export default MobileMenu;
