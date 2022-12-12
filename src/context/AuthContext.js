import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import { errorToast } from "../utils";
import {
  ERROR_MESSAGE,
  LOGIN_MESSAGE,
  LOGOUT_MESSAGE,
  ERROR_LOGIN_MESSAGE,
} from "../constants";
import { logInWithEmailAndPassword, logout } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const onFailRequest = { status: false, message: ERROR_MESSAGE };
  const handleAdminLogin = async (payload, responseCallback) => {
    try {

      const res = await logInWithEmailAndPassword(payload["email"], payload["password"]);
      if( res.user ) {
        toast.success(LOGIN_MESSAGE);
        setCurrentUser(res.user);
        localStorage.setItem("skn_token", res?.user?.accessToken);
        // localStorage.setItem("skn_token", "MTIz.1j988DClq-tlnP1gpoNKZY3Zlznpj3sndtKPrOKRcDxDEaf-CX6zWgPZOsZK");
        if (responseCallback) responseCallback({ status: true });
      } else {
        if (responseCallback) responseCallback(onFailRequest);
        toast.error(ERROR_LOGIN_MESSAGE)
      }
    } catch (err) {
      console.log({ err });
      if (responseCallback) responseCallback(onFailRequest);
      errorToast(onFailRequest);
    }
  };

  const handleAdminLogout = async (responseCallback) => {
    try {
      await logout();
      localStorage.removeItem("skn_token");
      toast.error(LOGOUT_MESSAGE);
      if (responseCallback) responseCallback({ status: true });
    } catch (err) {
      console.log({ err });
      if (responseCallback) responseCallback(onFailRequest);
      errorToast(onFailRequest);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        adminLogin: handleAdminLogin,
        adminLogout: handleAdminLogout,
        currentUser: currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
