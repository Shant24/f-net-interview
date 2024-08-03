import React, { useLayoutEffect, useState } from "react";
import type { RouteObject, RouterProps } from "react-router-dom";
import { Navigate, Router, useRoutes } from "react-router-dom";
import { history } from "@/utils/history";
import { PagesEnum } from "@/types/enums";

const ErrorPage = React.lazy(() => import("@/pages/ErrorPage"));

const PrivateLayout = React.lazy(() => import("@/components/Layouts/PrivateLayout"));
const PublicLayout = React.lazy(() => import("@/components/Layouts/PublicLayout"));

const LoginPage = React.lazy(() => import("@/pages/LoginPage"));
// const RegisterPage = React.lazy(() => import("@/pages/RegisterPage"));
// const RegisterAsTeacherPage = React.lazy(() => import("@/pages/RegisterAsTeacherPage"));
// const RegisterAsDonorPage = React.lazy(() => import("@/pages/RegisterAsDonorPage"));

const HomePage = React.lazy(() => import("@/pages/HomePage"));

const Routes = () => {
  const routes: RouteObject[] = [
    {
      element: <PrivateLayout />,
      children: [
        {
          path: "/",
          children: [
            {
              index: true,
              element: <HomePage />,
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
          path: "/auth/login",
          element: <LoginPage />,
        },
        // {
        //   path: "/auth/register",
        //   element: <RegisterPage />,
        // },
        // {
        //   path: "/auth/register/teacher",
        //   element: <RegisterAsTeacherPage />,
        // },
        // {
        //   path: "/auth/register/donor",
        //   element: <RegisterAsDonorPage />,
        // },
      ],
    },

    {
      path: "/error-page",
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
