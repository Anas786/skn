import React, { useContext, useState } from "react";
import signInBg from "../../assets/backgrounds/singin-bg.svg";
import "./styles.scss";
import Logobox from "../../components/logoBox";
import { Row, Col, Form, Input, Button } from "antd";
import { AuthContext } from "../../context/AuthContext";
import { Redirect } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import { NOTIFICATION_ROUTE } from "../../constants"


const SignIn = () => {
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { adminLogin } = useContext(AuthContext);
  const token = localStorage.getItem("skn_token");
  const handleFormFinish = async () => {
    setLoading(true);
    const credentials = form.getFieldsValue();
    adminLogin(credentials, (res) => {
      setLoading(false);
    });
  };

  if (token) {
    return <Redirect to={NOTIFICATION_ROUTE} />;
  }
    return (
      <Row className="signin-wrapper">
        <Col sm={24} lg={12}>
          <div className="thumb-box">
            <Logobox size="lg" />
            <img src={signInBg} />
          </div>
        </Col>
        <Col sm={24} lg={12}>
          <div className="form-wrapper">
            <h3 className="title">LogIn</h3>
            <Form form={form} className="form" onFinish={handleFormFinish}>
              <label>Email:</label>
              <Form.Item
                name={"email"}
                rules={[
                  {
                    required: true,
                    message: "Email can't be empty",
                  },
                  {
                    type: "email",
                    message: "Invalid email",
                  },
                ]}
              >
                <Input name="email" placeholder="abxy@gmail.com" />
              </Form.Item>
              <label>Password:</label>
              <Form.Item
                name={"password"}
                rules={[
                  {
                    required: true,
                    message: "Password can't be empty",
                  },
                ]}
              >
                <Input.Password
                  className="pass"
                  name="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" disabled={isLoading}>
                  {isLoading ? (
                    <ScaleLoader
                      color={"#FFF"}
                      loading={isLoading}
                      height={15}
                      width={2}
                    />
                  ) : (
                    "Login"
                  )}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    );
};

export default SignIn;
