import { Navigate } from "react-router-dom";
import { PagesEnum } from "@/types/enums";
import { useAuth } from "@/hooks";
import PageLoading from "@/components/PageLoading";
import BaseLayout from "@/components/Layouts/BaseLayout";

const PrivateLayout = () => {
  const { user, tokensData } = useAuth();

  if (tokensData?.accessToken && !user?.data) {
    return <PageLoading />;
  }

  return tokensData?.accessToken && user?.data ? <BaseLayout /> : <Navigate to={PagesEnum.LOGIN} />;
};

export default PrivateLayout;
