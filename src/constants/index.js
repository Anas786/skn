import {
  faBell,
} from "@fortawesome/free-solid-svg-icons";

export const ERROR_MESSAGE = "Something went wrong";
export const LOGIN_MESSAGE = "Login Sucessfully";
export const LOGOUT_MESSAGE = "Logout Sucessfully";
export const ERROR_LOGIN_MESSAGE = "Invalid Credentials";
export const NOTIFICATION_SENT_MESSAGE = "Notifcication Sent Sucessfully";

// LOGIN ROUTE
export const LOGIN_ROUTE = "/";
// NOTIFICATION ROUTES
export const NOTIFICATION_ROUTE = "/notifications";

export const SIDEBAR_LINKS = [
  {
    title: "Notificaions",
    icon: faBell,
    route: NOTIFICATION_ROUTE,
    access: 0,
  },
];
export const DASHBOARD_ANALYTICS = [
  {
    id: "notifications",
    title: "Notifications",
    icon: faBell,
    access: 1,
  },
];

export const PERMISSIONS = [
  {
    route: NOTIFICATION_ROUTE,
    access: "all",
  },
];
