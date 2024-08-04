import { memo } from "react";
import { Navigate } from "react-router-dom";
import { PagesEnum } from "@/types/enums";
import { useAuth } from "@/store/hooks";
import AuthLayout from "@/components/Layouts/AuthLayout";

const PublicLayout = () => {
  const {
    authData: { user, tokensData },
  } = useAuth();

  return !tokensData?.accessToken && !user?.data ? <AuthLayout /> : <Navigate to={PagesEnum.HOME} />;
};

export default memo(PublicLayout);
