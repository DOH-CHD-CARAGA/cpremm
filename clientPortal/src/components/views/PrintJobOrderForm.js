import React, { forwardRef }  from "react"
import {
  Row,
  Col,
  Card,
} from "antd";
import "antd/dist/antd.css";
import moment from "moment";

import { isDesktop, isMobile } from 'react-device-detect';
import dohSeal from "../../assets/images/doh-seal.png";

const PrintJobOrderForm = forwardRef((props, ref) => {
  const jobReq = props.jobReq
  const eSign = props.eSign
  return (
    <>
    <div ref={ref} style={{ margin: 50}}>
                <Col xs={10}>
                  <Card 
                  title={""}
                  style={{ borderColor: "black", padding: 0, fontSize: 25 }}
                  >
                   <Col xs={24} style={{ padding: 0, marginBottom: 20}}>
                   <Card bordered={false}>
                      <Row gutter={[24,0]}>
                        <Col xs={5} md={5} className="text-center">
                        <span><img src={dohSeal} alt="🚫" width="200"/></span>
                        </Col>
                        <Col xs={19} md={19} className="text-center" style={{ fontSize: 20 }}>
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
                      <Row gutter={[24,0]} className="font-bold">
                        <Col xs={24} md={24} className="text-center mb-24">
                        <b>ICT JOB ORDER REQUEST FORM</b>
                        </Col>
                        <Col xs={12} md={12} className="">
                          <b>Date:</b> <u>{moment().format("MMMM DD, YYYY")}</u>
                        </Col>
                        <Col xs={12} md={12} className="mb-24" hidden={isMobile}>
                        </Col>
                        <Col xs={9} md={9} className="mb-24">
                          <b>Requesting Personnel:</b>
                        </Col>
                        <Col xs={15} md={15} className="mb-24">
                          {jobReq.requestingPersonnel}
                          <hr style={{ marginTop: jobReq.requestingPersonnel!==""? 0: 30 }}/>
                        </Col>

                        <Col xs={9} md={9} className="mb-24">
                          <b>Designation:</b>
                        </Col>
                        <Col xs={15} md={15} className="mb-24">
                          {jobReq.designation}
                          <hr style={{ marginTop: jobReq.designation!==""? 0: 30 }}/>
                        </Col>

                        <Col xs={9} md={9} className="mb-24">
                          <b>Division/Section:</b>
                        </Col>
                        <Col xs={15} md={15} className="mb-24">
                          {jobReq.division}
                          <hr style={{ marginTop: jobReq.division!==""? 0: 30 }}/>
                        </Col>

                        <Col xs={9} md={9} className="mb-24">
                          <b>Serial #:</b>
                        </Col>
                        <Col xs={15} md={15} className="mb-24">
                          {jobReq.serial}
                          <hr style={{ marginTop: jobReq.serial!==""? 0: 30 }}/>
                        </Col>

                        <Col xs={9} md={9} className="mb-24">
                          <b>Property #:</b>
                        </Col>
                        <Col xs={15} md={15} className="mb-24">
                          {jobReq.property}
                          <hr style={{ marginTop: jobReq.property!==""? 0: 30 }}/>
                        </Col>

                        <Col xs={9} md={9} className="mb-24">
                         <b>IT Equipement:</b>
                        </Col>
                        <Col xs={15} md={15} className="mb-24">
                          {jobReq.ITEquipment.toUpperCase()}
                          <hr style={{ marginTop: jobReq.ITEquipment!==""? 0: 30 }}/>
                        </Col>

                        <Col xs={9} md={9} className="mb-24">
                          <b>Brand/Model:</b>
                        </Col>
                        <Col xs={15} md={15} className="mb-24">
                          {jobReq.brand}
                          <hr style={{ marginTop: jobReq.brand!==""? 0: 30 }}/>
                        </Col>
                        <Col xs={9} md={24} className="">
                          <b>Nature Of Complaint:</b>
                        </Col>
                        <Col xs={15} md={24} className="mb-24">
                          {
                            jobReq.natureOfComplaint.split('\n').map((val,k)=>{
                              return <div key={k}>
                                {val}
                                <hr style={{ marginTop: 0}}/>
                              </div>
                            })
                          }
                          
                        </Col>
                        
                        <Col xs={9} md={9} className="mb-24">
                          <span>Requesting Personnel Signature:</span>
                        </Col>
                        
                        <Col xs={15} md={15} className="mb-24">
                          <Col
                          >
                          {
                            eSign!==null&&
                            <center>
                              <img
                              alt="🚫"
                              style={{ padding: 20 }}
                              src={`data:image/jpeg;base64,${eSign}`}
                            />
                              <hr/>
                            </center>
                          }
                          
                          </Col>
                        </Col>

                        <Col xs={9} md={9} className="mb-24">
                          Date Recieved:
                        </Col>
                        <Col xs={15} md={15} className="mb-24">
                          <hr style={{ marginTop: 30 }}/>
                        </Col>

                        <Col xs={20} md={20} offset={2} className=" text-center mb-24">
                          <br/>
                          <b className="font-bold">GLADYS D. BULADACO</b>
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
    </div>
    </>
  );
});
export default PrintJobOrderForm