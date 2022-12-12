import React from "react";
import { Row, Col, Breadcrumb, Button } from "antd";
import { NavLink } from "react-router-dom";
import { NOTIFICATION_ROUTE } from "../../constants";

const toggler = [
  <svg
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    key={0}
  >
    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
  </svg>,
];

function Header({ onPress, page, logout }) {
  const pageName = page.includes("/") ? page.split("/") : page;
  const title = page.includes("/") ? pageName[0] : page;
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={16} md={12}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to={NOTIFICATION_ROUTE}>Dashboard</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
              {title}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              {title}
            </span>
          </div>
        </Col>
        <Col span={8} md={12} className="header-control">
          <Button
            type="link"
            className="sidebar-toggler"
            onClick={() => onPress()}
          >
            {toggler}
          </Button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </Col>
      </Row>
    </>
  );
}

export default Header;
