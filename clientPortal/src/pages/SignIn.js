import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  message
} from "antd";
import { isMobile } from "react-device-detect"
import DOHCaraga from "../assets/images/dohcaraga.png";
import CPreMM from "../assets/images/doh-cpremm.png";
import cpremmApi from "../controllers/api/CPreMM/cpremm-api";

const { Title } = Typography;
const { Header,  Content } = Layout;


const SignIn = ()=> {
    const [processing, setprocessing] = useState(false)
    const location = useLocation();
    const onFinish = async(values) => {
      try {
        setprocessing(true)
        const login = await cpremmApi.login(values)
        if(login.status===200){
          message.success({
            content: 'Successfully Login!',
            className: 'custom-class',
            style: {
              marginTop: '20vh',
            },
            duration: 1
          });
          const data = login.data
          localStorage.setItem("CPreMM_JWT", data.token)
          localStorage.setItem("URL", "/Job-Order-List")
         
          window.location.href = location.pathname
        } 
      } catch (err) {
        message.error({
          content: 'Incorrect Username and Password!',
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
          duration: 1
        });
        setTimeout(()=>{
          setprocessing(false)
        }, 1000)
      }
    };

    const onFinishFailed = (errorInfo) => {
      setprocessing(false)
      console.log("Failed:", errorInfo);
    };
    return (
      <>
        <Layout className="layout-default layout-signin">
          <Header>
            <div className="header-col header-nav">
              <img
              hidde
              alt={"🚫"}
              height={50}
              style={{ padding: 0 }}
              src={DOHCaraga}
              />
            </div>
            <div className="header-col header-btn">
            <Link to="/" className="text-dark font-bold">
              <Button type="dashed"
              >↩️ GET BACK
              </Button>
            </Link>
              
            </div>
          </Header>
          <Content className="signin">
            <Row gutter={[24, 0]} justify="space-around">
           
              <Col
              className="mb-24"
               xs={{ span: 20 }}
               lg={{ span: 6 }}
               md={{ span: 12 }}
              >
                <Col xs={24} >
                <img src={CPreMM} alt=""  width={"80%"}/>
                </Col>
                <Col>
                <p xs={24} 
                className="text-center"
                hidden={isMobile}
                ><i>Corrective and Preventive Monitoring and Maintenance</i>
                </p>
                </Col>

                <Title className="mb-15"><small>Sign In</small></Title>
                <Title className="font-regular text-muted" level={5} hidden>
                  Enter your username and password to sign in
                </Title>
                <Form
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  className="row-col"
                >
                  <Form.Item
                    className="username"
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input placeholder="Username" />
                  </Form.Item>

                  <Form.Item
                    className="username"
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input placeholder="Password" type="password" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                      loading={processing}
                    >
                      SIGN IN
                    </Button>
                  </Form.Item>
                  <p className="font-semibold text-muted" hidden>
                    Don't have an account?{" "}
                    <Link to="/sign-up" className="text-dark font-bold">
                      Sign Up
                    </Link>
                  </p>
                </Form>
              </Col>
            </Row>
          </Content>
        </Layout>
      </>
    );
  }
export default SignIn;