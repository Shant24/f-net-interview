import { Outlet } from "react-router-dom";
// import { useLocalization } from "@/contexts/Localization";
// import PageLoading from "@/components/PageLoading";

const BaseLayout = () => {
  // const { localizationState } = useLocalization();

  return (
    <>
      {/* {localizationState === "pending" && <PageLoading />} */}
      {/* <Header /> */}
      <Outlet />
    </>
  );
};

export default BaseLayout;
