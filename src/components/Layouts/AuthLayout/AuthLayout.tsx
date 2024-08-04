import { Outlet } from "react-router-dom";
import styles from "./styles.module.scss";
// import { useLocalization } from "@/contexts/Localization";
// import PageLoading from "@/components/PageLoading";

const AuthLayout = () => {
  // const { localizationState } = useLocalization();

  return (
    <main className={styles.main}>
      {/* {localizationState === "pending" && <PageLoading />} */}
      {/* <Header /> */}
      <Outlet />
    </main>
  );
};

export default AuthLayout;
