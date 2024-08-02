import { Outlet } from "react-router-dom";
import { useLocalization } from "@/contexts/Localization";
import PageLoading from "@/components/PageLoading";
import Header from "@/components/Header";

const AuthLayout = () => {
  const { localizationState } = useLocalization();

  if (localizationState === "pending") {
    return <PageLoading />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default AuthLayout;
