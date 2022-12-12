import React from "react";
import "./styles.scss";
import Logo from "../../assets/logo.png";
const Logobox = ({ size }) => {
  return (
    <div className={`logobox ${size === "lg" ? "large" : ""}`}>
      <img src={Logo} alt="" />
    </div>
  );
};

export default Logobox;
