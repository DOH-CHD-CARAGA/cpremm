import { Card, Col, Row } from "antd";
import { FacebookProvider, Page } from 'react-facebook';

import ImgCarousel from "../components/views/ImgCarousel";
import SystemList from "../components/views/SystemsList";

import DOH from "../assets/images/doh.png";
import DOHCaraga from "../assets/images/dohcaraga.png";
import CPreMM from "../assets/images/doh-cpremm.png";
import { isMobile } from "react-device-detect";

import React, { Component }  from 'react';

const LandingPage = ()=> {
  localStorage.setItem("URL", "/")
  const systems = [
    {
      name: "CPreMM",
      logo: "https://cpremm.dohcaraga.org/static/media/DOHLogo3.4f8d6c18.png",
      url: "https://cpremm.dohcaraga.org/",
      description: "Corrective and Preventive Monitoring and Maintenance"
    },
    {
      name: "CPreMM Portal",
      logo: "https://cpremm.dohcaraga.org/static/media/DOHLogo3.4f8d6c18.png",
      url: "/CPreMM-Portal",
      description: "Instead of filling out a paper request form, you can use this portal to request job orders."
    }
  ]
  const images = [DOH, CPreMM, DOHCaraga]
  return (
    <>
      <div className="layout-content">

        <Row gutter={[24,0]}>
          <Col xs={24} lg={17} className="mb-24">

            <Col xs={24} className="mb-24">
            <hr color="green"/>
              <ImgCarousel
              images={images}
              />
              <hr color="green"/>
            </Col>

            <Col className="site-card-wrapper">
                <Col xs={24} className="mb-24">
                  <b>SYSTEMS</b>
                </Col>
                <Row gutter={[24,0]} >
                  <SystemList 
                  systems={systems}
                  />
                </Row>
            </Col>
          </Col>
          <Col xs={24} lg={7} hidden={isMobile}>
            <Card
            >
             <center>
             <FacebookProvider appId="1380730499029263">
                <Page href="https://www.facebook.com/caraga.doh.gov.ph" tabs="timeline"  />
              </FacebookProvider> 
             </center>
            </Card>
          </Col>
        </Row>

      </div>
    </>
  );
}

export default LandingPage;
