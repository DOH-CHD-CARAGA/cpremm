import React from "react"
import {
  Row,
  Col,
  Card,
  Modal,
} from "antd";
import "antd/dist/antd.css";
import TextArea from "antd/lib/input/TextArea";
import SignPad from "./signPad"
import moment from "moment";

import { isDesktop, isMobile } from 'react-device-detect';
import dohSeal from "../../assets/images/doh-seal.png";

const JobOrderForm = (props) => {
  const jobReq = props.jobReq
  const eSign = props.eSign
  const seteSign = props.seteSign
  const showSignPad = props.showSignPad
  const setshowSignPad = props.setshowSignPad
  return (
    <>
        <Modal
        title={<center className="font-bold">Requesting Personnel's Signature</center>}
          visible={showSignPad}
          centered
          closable={false}
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}
        >
          <Col xs={24} md={24}>
          <Row gutter={[24,0]}>
            <Col xs={24}>
              <Card.Grid
                bordered
                style={{ 
                  borderSize: 5, width: "100%", height:  400,
                  padding: 0
                }}
                >
                  <SignPad
                  seteSign={seteSign}
                  setshowSignPad={setshowSignPad}
                  />
                  <hr/>
                  
              </Card.Grid>
            </Col>
          </Row>
          </Col>
        </Modal>
                <Col xs={24} lg={24}>
                  <Card 
                  title={""}
                  >
                   <Col xs={24} style={{ padding: 0, marginBottom: 20}}>
                   <Card bordered={false}>
                      <Row gutter={[24,0]}>
                        <Col xs={24} md={4} className="text-center">
                        <span><img src={dohSeal} alt="🚫" width="100"/></span>
                        </Col>
                        <Col xs={24} md={20} className="text-center">
                        <b>STANDARD OPERATING INSTRUCTIONS</b>
                        <br/>
                        <span>Unit: KM-ICT</span>
                        <br/>
                        <span hidden={isMobile}>Core Process: Handling Software/Hardware Technical</span>
                        <small hidden={isDesktop}>Core Process: Handling Software/Hardware Technical</small>
                        <br/>
                        <span hidden={isMobile}>Problems (Maintenance and Repair)</span>
                        <small hidden={isDesktop}>Problems (Maintenance and Repair)</small>
                        </Col>
                      </Row>
                    </Card>
                   </Col>
                      <Row gutter={[24,0]}>
                        <Col xs={24} md={24} className="text-center mb-24">
                        <b>ICT JOB ORDER REQUEST FORM</b>
                        </Col>
                        <Col xs={24} md={12} className="">
                          <b>Date:</b> <u>{moment().format("MMMM DD, YYYY")}</u>
                        </Col>
                        <Col xs={24} md={12} className="mb-24" hidden={isMobile}>
                        </Col>
                        <Col xs={24} md={9} className="mb-24">
                          <b>Requesting Personnel:</b>
                        </Col>
                        <Col xs={24} md={15} className="mb-24">
                          {jobReq.requestingPersonnel}
                          <hr style={{ marginTop: jobReq.requestingPersonnel!==""? 0: 30 }}/>
                        </Col>

                        <Col xs={24} md={9} className="mb-24">
                          <b>Designation:</b>
                        </Col>
                        <Col xs={24} md={15} className="mb-24">
                          {jobReq.designation}
                          <hr style={{ marginTop: jobReq.designation!==""? 0: 30 }}/>
                        </Col>

                        <Col xs={24} md={9} className="mb-24">
                          <b>Division/Section:</b>
                        </Col>
                        <Col xs={24} md={15} className="mb-24">
                          {jobReq.division}
                          <hr style={{ marginTop: jobReq.division!==""? 0: 30 }}/>
                        </Col>

                        <Col xs={24} md={9} className="mb-24">
                          <b>Serial #:</b>
                        </Col>
                        <Col xs={24} md={15} className="mb-24">
                          {jobReq.serial}
                          <hr style={{ marginTop: jobReq.serial!==""? 0: 30 }}/>
                        </Col>

                        <Col xs={24} md={9} className="mb-24">
                          <b>Property #:</b>
                        </Col>
                        <Col xs={24} md={15} className="mb-24">
                          {jobReq.property}
                          <hr style={{ marginTop: jobReq.property!==""? 0: 30 }}/>
                        </Col>

                        <Col xs={24} md={9} className="mb-24">
                         <b>IT Equipement:</b>
                        </Col>
                        <Col xs={24} md={15} className="mb-24">
                          {jobReq.ITEquipment}
                          <hr style={{ marginTop: jobReq.ITEquipment!==""? 0: 30 }}/>
                        </Col>

                        <Col xs={24} md={9} className="mb-24">
                          <b>Brand/Model:</b>
                        </Col>
                        <Col xs={24} md={15} className="mb-24">
                          {jobReq.brand}
                          <hr style={{ marginTop: jobReq.brand!==""? 0: 30 }}/>
                        </Col>
                        <Col xs={24} md={24} className="">
                          <b>Nature Of Complaint:</b>
                        </Col>
                        <Col xs={24} md={24} className="mb-24">
                          <TextArea
                           style={{ borderColor: "transparent" }}
                           name={"natureOfComplaint"}
                           rows={jobReq.natureOfComplaint.split('\n').length}
                           value={jobReq.natureOfComplaint}
                          />
                          <hr style={{ marginTop: 0}}/>
                        </Col>
                        
                        <Col xs={24} md={9} className="mb-24">
                          <span>Requesting Personnel Signature:</span>
                        </Col>
                        
                        <Col xs={24} md={15} className="mb-24">
                        <Card.Grid
                        bordered
                        style={{ 
                          width: "100%", height: "100%",
                          padding: 0
                        }}
                        title="Change?"
                        onClick={()=>{ setshowSignPad(true) }}
                        >
                          <Col
                          >
                          {
                            eSign!==null&&
                            <center>
                              <img
                              alt="🚫"
                              style={{ padding: 20 }}
                              src={eSign}
                            />
                              <hr/>
                            </center>
                          }
                          
                          </Col>
                        
                        </Card.Grid>
                        </Col>

                        <Col xs={24} md={9} className="mb-24">
                          Date Recieved:
                        </Col>
                        <Col xs={24} md={15} className="mb-24">
                          <hr style={{ marginTop: 30 }}/>
                        </Col>

                        <Col xs={20} md={20} offset={2} className=" text-center mb-24">
                          <br/>
                          <b className="text-muted font-bold">GLADYS D. BULADACO</b>
                          <hr/>
                          CMT III
                        </Col>
                        <Col xs={24} md={24} className="text-right">
                            <hr/>
                           <small className="">DOH-RO13-KM-ICT-QSOP-02 Form1 Rev.0</small>
                        </Col>
                      </Row>  

                  </Card>
                </Col>
    </>
  );
}
export default JobOrderForm