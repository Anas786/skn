import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ErrorPage from "../components/404/index.jsx";
import {
  LOGIN_ROUTE,
  NOTIFICATION_ROUTE,
} from "../constants/index.js";
// PRIVATE ROUTES
import AdminPrivateRoute from "../utils/privateRoute";
import {
  Notifications,
  SignIn,
} from "../modules";

const Routes = () => {
  return (
    <>
      <Router>
        <ToastContainer autoClose={3000} />
        <Switch>
          {/* LOGIN ROUTES */}
          <Route exact path={LOGIN_ROUTE} component={SignIn} />
          {/* Notification ROUTES */}
          <AdminPrivateRoute exact path={NOTIFICATION_ROUTE} component={Notifications} />
          {/* 404 PAGE ROUTE */}
          <Route path="*" component={ErrorPage} />
        </Switch>
      </Router>
    </>
  );
};
export default Routes;
