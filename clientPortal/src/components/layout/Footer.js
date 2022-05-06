import { Layout, Row, Col } from "antd";
import React, { Component }  from 'react';

function Footer() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter style={{ background: "#fafafa" }}>
      <Row className="just">
        <Col xs={24} md={12} lg={12}>
          <div className="copyright">
            © 2022 KIMCT, DOH CHD Caraga XIII
          </div>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
