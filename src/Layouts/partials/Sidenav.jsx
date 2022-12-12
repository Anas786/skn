import React, { useContext, useEffect } from "react";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SIDEBAR_LINKS } from "../../constants";
import Logobox from "../../components/logoBox";
function Sidenav({ page, logout }) {

  const sidebarItem = (index, route, icon, title) => (
    <Menu.Item key={index}>
      <NavLink to={route}>
        <span
          className="icon"
          style={{
            background:
              page === title || page.includes(title.toLowerCase().slice(0, -1))
                ? "#2e3192"
                : "",
          }}
        >
          <FontAwesomeIcon icon={icon} />
        </span>
        <span className="label">{title}</span>
      </NavLink>
    </Menu.Item>
  );
  return (
    <>
      <div className="brand">
        <NavLink to="/">
          <Logobox />
        </NavLink>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        {SIDEBAR_LINKS.map((item, index) => (
          <React.Fragment key={index}>
            {item.access === 0
              ? sidebarItem(index, item.route, item.icon, item.title)
              : null}
          </React.Fragment>
        ))}
      </Menu>
    </>
  );
}

export default Sidenav;
