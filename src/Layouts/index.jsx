import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useHistory } from "react-router-dom";
import { Layout, Drawer } from "antd";
import Sidenav from "./partials/Sidenav";
import Header from "./partials/Header";
import "./index.scss";
import { LOGIN_ROUTE } from "../constants";

const { Header: AntHeader, Content, Sider } = Layout;

function AdminSharedLayout({ children }) {
  const { pathname } = useLocation();
  const history = useHistory();
  const page = pathname.replace("/", "");
  const [visible, setVisible] = useState(false);
  const { adminLogout } = useContext(AuthContext);
  const openDrawer = () => setVisible(!visible);
  const Logout = () => {
    adminLogout((res) => {
      history.push(LOGIN_ROUTE);
    });
  };
  return (
    <section className="dashboard-wrapper">
      <Layout className="layout-dashboard">
        <Drawer
          title={false}
          placement="left"
          closable={false}
          onClose={() => setVisible(false)}
          visible={visible}
          key="left"
          width={250}
          className="drawer-sidebar"
        >
          <Layout className="layout-dashboard">
            <Sider
              trigger={null}
              width={250}
              theme="light"
              className="sider-primary ant-layout-sider-primary"
            >
              <Sidenav page={page} logout={Logout} />
            </Sider>
          </Layout>
        </Drawer>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => {}}
          trigger={null}
          width={250}
          theme="light"
          className="sider-primary ant-layout-sider-primary"
        >
          <Sidenav page={page} color="#2e3192" logout={Logout} />
        </Sider>
        <Layout>
          <AntHeader>
            <Header
              onPress={openDrawer}
              page={page.replaceAll("-", " ")}
              logout={Logout}
            />
          </AntHeader>
          <Content className="content-ant">
            {children}
            {/* <Footer /> */}
          </Content>
        </Layout>
      </Layout>
    </section>
  );
}

export default AdminSharedLayout;
