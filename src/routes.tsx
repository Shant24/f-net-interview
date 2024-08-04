import { useLayoutEffect, useState } from "react";
import type { RouteObject, RouterProps } from "react-router-dom";
import lazyWithPreload from "react-lazy-with-preload";
import { Navigate, Router, useRoutes } from "react-router-dom";
import { history } from "@/utils/history";
import { PagesEnum } from "@/types/enums";

import MainLayout from "./components/Layouts/MainLayout";
import PrivateLayout from "@/components/Layouts/PrivateLayout";
import PublicLayout from "@/components/Layouts/PublicLayout";
import ErrorPage from "@/pages/ErrorPage";

export const lazyRoutes = {
  LoginPage: lazyWithPreload(() => import("@/pages/LoginPage")),
  RecoveryPassword: lazyWithPreload(() => import("@/pages/RecoveryPassword")),
  RegisterAsTeacherPage: lazyWithPreload(() => import("@/pages/RegisterAsTeacherPage")),
  RegisterAsDonorPage: lazyWithPreload(() => import("@/pages/RegisterAsDonorPage")),

  HomePage: lazyWithPreload(() => import("@/pages/HomePage")),
  TeachersPage: lazyWithPreload(() => import("@/pages/TeachersPage")),
  DonorsPage: lazyWithPreload(() => import("@/pages/DonorsPage")),
  AboutUsPage: lazyWithPreload(() => import("@/pages/AboutUsPage")),
  ContactUsPage: lazyWithPreload(() => import("@/pages/ContactUsPage")),
  BlogPage: lazyWithPreload(() => import("@/pages/BlogPage")),
};

const Routes = () => {
  const routes: RouteObject[] = [
    {
      element: <MainLayout />,
      children: [
        {
          element: <PrivateLayout />,
          children: [
            {
              path: PagesEnum.HOME,
              children: [
                {
                  index: true,
                  element: <lazyRoutes.HomePage />,
                },
                {
                  path: PagesEnum.TEACHERS,
                  element: <lazyRoutes.TeachersPage />,
                },
                {
                  path: PagesEnum.DONORS,
                  element: <lazyRoutes.DonorsPage />,
                },
                {
                  path: PagesEnum.ABOUT_US,
                  element: <lazyRoutes.AboutUsPage />,
                },
                {
                  path: PagesEnum.CONTACT_US,
                  element: <lazyRoutes.ContactUsPage />,
                },
                {
                  path: PagesEnum.BLOG,
                  element: <lazyRoutes.BlogPage />,
                },
              ],
            },
          ],
        },

        {
          path: "/auth",
          element: <PublicLayout />,
          children: [
            {
              index: true,
              element: <Navigate to={PagesEnum.LOGIN} replace />,
            },
            {
              path: PagesEnum.LOGIN,
              element: <lazyRoutes.LoginPage />,
            },
            {
              path: PagesEnum.FORGOT_PASSWORD,
              element: <lazyRoutes.RecoveryPassword />,
            },
            {
              path: PagesEnum.REGISTER_AS_TEACHER,
              element: <lazyRoutes.RegisterAsTeacherPage />,
            },
            {
              path: PagesEnum.REGISTER_AS_DONOR,
              element: <lazyRoutes.RegisterAsDonorPage />,
            },
          ],
        },
      ],
    },

    {
      path: PagesEnum.ERROR_PAGE,
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ];

  return useRoutes(routes);
};

export default Routes;

export const CustomRouter = ({ basename, children, future }: Partial<RouterProps>) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => {
    history.listen(setState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <Router
      navigator={history}
      location={state.location}
      navigationType={state.action}
      basename={basename}
      future={future}
    >
      {children}
    </Router>
  );
};
