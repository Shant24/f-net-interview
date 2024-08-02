import { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { PagesEnum } from "@/types/enums";
import { useAuth } from "@/hooks";

const PublicLayout = () => {
  const { user, tokensData } = useAuth();

  return !tokensData?.accessToken && !user?.data ? <Outlet /> : <Navigate to={PagesEnum.HOME} />;
};

export default memo(PublicLayout);
