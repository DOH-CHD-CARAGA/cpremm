import React from "react"
import {
  Layout,
  Row,
  Col,
} from "antd";
import "antd/dist/antd.css";

import dohCPreMM from "../assets/images/doh-cpremm.png";

const { Header, Footer, Content } = Layout

const LandingPage = (props) => {

  return (
    <>
    <Layout className="layout-default ant-layout layout-signin" style={{ }}> {/**height:"100vh", overflow: "auto" */}
          <Header>
              <Row gutter={[24, 0]}>
                <Col>
                <img src={dohCPreMM} alt="🚫" width="100" hiegth="auto"/>
                </Col>
              </Row>
          </Header>

          <Content className="signin">
            {props.JobReqFormUI}
          </Content>

          <Footer>
            <p className="copyright">
              {" "}
              DOH CARAGA CHD KMICT © 2022
            </p>
          </Footer>
    </Layout>
    </>
  );
}
export default LandingPage