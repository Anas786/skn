import React, { useContext, useEffect } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import AdminSharedLayout from "../Layouts/index";
import { LOGIN_ROUTE, PERMISSIONS } from "../constants";
import ErrorPage from "../components/404";

const AdminPrivateRoute = ({
  component: Component,
  noLayout = false,
  ...rest
}) => {
  const { pathname } = useLocation();
  const page = pathname.split("/");
  const pagePath = `/${page[1]}`;
  const token = localStorage.getItem("skn_token");
  const PageAccess = PERMISSIONS.find((x) => x.route === pagePath);

  if (token) {
    const routeSec = () => (
      <Route exact {...rest} render={(props) => <Component {...props} />} />
    );
    return (
      <>
        {
        PageAccess.access === "all" ? (
          <>
            {noLayout ? (
              routeSec()
            ) : (
              <AdminSharedLayout>{routeSec()}</AdminSharedLayout>
            )}
          </>
        ) : (
          <ErrorPage />
        )}
      </>
    );
  } else {
    return <Redirect to={LOGIN_ROUTE} />;
  }
};

export default AdminPrivateRoute;
