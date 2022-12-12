import React from "react";
import {
  AuthContextProvider,
  NotificationContextProvider,
} from "../context";
export default function ContextWrapper({ children }) {
  return (
    <React.StrictMode>
      <AuthContextProvider>
        <NotificationContextProvider>
          {children}
        </NotificationContextProvider>
      </AuthContextProvider>
    </React.StrictMode>
  );
}
