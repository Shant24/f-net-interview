import { Outlet } from "react-router-dom";
// import { useLocalization } from "@/contexts/Localization";
// import PageLoading from "@/components/PageLoading";
import Header from "@/components/Header";

const AuthLayout = () => {
  // const { localizationState } = useLocalization();

  return (
    <>
      {/* {localizationState === "pending" && <PageLoading />} */}
      <Header />
      <Outlet />
    </>
  );
};

export default AuthLayout;
