import React, { useState } from "react"
import {
  Row,
  Col,
  Input,
  Card,
  DatePicker,
} from "antd";
import "antd/dist/antd.css";
import TextArea from "antd/lib/input/TextArea";
import SignatureCanvas from "react-signature-canvas";

import { isDesktop, isMobile } from 'react-device-detect';
import dohLogo2 from "../assets/images/doh2.png";

const JobOrderForm = () => {
  const [jobReq, setjobReq] = useState({
    dateFiled: "",
    requestingPersonnel: "",
    designation: "",
    division: "",
    serial: "",
    property: "",
    ITEquipment: "",
    brand: "",
    natureOfComplaint: "",
    dateRecieved: ""
  })

  const handleChange = (e)=>{
      console.log(e.target.name)
    const name = e.target.name
    const value = e.target.value
    setjobReq(prevState=>({...prevState, [name]: value }))
  }
  return (
    <>
            <Col xs={24} md={24}>
                <Col xs={24} md={10} offset={isMobile? 0 : 7} className="mb-24">
                  <Card 
                  title={
                    <>
                    <Card>
                      <Row gutter={[24,0]}>
                        <Col xs={24} md={4} className="text-center">
                        <span><img src={dohLogo2} alt="🚫" width="100"/></span>
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
                    
                    </>
                  }
                  >
                   
                      <Row gutter={[24,0]}>
                        <Col xs={24} md={24} className="text-center mb-24">
                        <span>ICT JOB ORDER REQUEST FORM</span>
                        </Col>

                        <Col xs={24} md={15} className="mb-24">
                          Job Order #:<br/>
                          <Input disabled title="Auto Generated"/>
                        </Col>
                        <Col xs={24} md={9} className="mb-24">
                          Date:<br/>
                          <DatePicker style={{ width: "100%" }} 
                          name={"dateFiled"}
                          value={jobReq.dateFiled}
                          size="large"
                          onChange={(dateString)=>{
                            setjobReq(prevState=>({...prevState, dateFiled: dateString}))
                          }}
                          />
                        </Col>

                        <Col xs={24} md={9} className="mb-24">
                          Requesting Personnel:
                        </Col>
                        <Col xs={24} md={15} className="mb-24">
                          <Input 
                          name={"requestingPersonnel"}
                          value={jobReq.requestingPersonel}
                          onChange={e=>{handleChange(e)}}
                          />

                        </Col>

                        <Col xs={24} md={9} className="mb-24">
                          Designation:
                        </Col>
                        <Col xs={24} md={15} className="mb-24">
                          <Input
                          disabled
                          title="Auto Generated"
                          name={"designation"}
                          value={jobReq.designation}
                          onChange={e=>{handleChange(e)}}
                          />
                        </Col>

                        <Col xs={24} md={9} className="mb-24">
                          Division/Section:
                        </Col>
                        <Col xs={24} md={15} className="mb-24">
                          <Input
                            disabled
                            title="Auto Generated"
                            name={"division"}
                            value={jobReq.division}
                            onChange={e=>{handleChange(e)}}
                          />
                        </Col>

                        <Col xs={24} md={9} className="mb-24">
                          Serial #:
                        </Col>
                        <Col xs={24} md={15} className="mb-24">
                          <Input
                            name={"serial"}
                            value={jobReq.serial}
                            onChange={e=>{handleChange(e)}}
                          />
                        </Col>

                        <Col xs={24} md={9} className="mb-24">
                          Property #:
                        </Col>
                        <Col xs={24} md={15} className="mb-24">
                          <Input
                            name={"property"}
                            value={jobReq.property}
                            onChange={e=>{handleChange(e)}}
                          />
                        </Col>

                        <Col xs={24} md={9} className="mb-24">
                         IT Equipement:
                        </Col>
                        <Col xs={24} md={15} className="mb-24">
                          <Input
                           disabled
                           title="Auto Generated"
                           name={"ITEquipment"}
                           value={jobReq.ITEquipment}
                           onChange={e=>{handleChange(e)}}
                          />
                        </Col>

                        <Col xs={24} md={9} className="mb-24">
                          Brand/Model:
                        </Col>
                        <Col xs={24} md={15} className="mb-24">
                          <Input
                           disabled
                           title="Auto Generated"
                           name={"brand"}
                           value={jobReq.brand}
                           onChange={e=>{handleChange(e)}}
                          />
                        </Col>
                        <Col xs={24} md={24} className="">
                          Nature Of Complaint:
                        </Col>
                        <Col xs={24} md={24} className="mb-24">
                          <TextArea
                           name={"natureOfComplaint"}
                           rows={jobReq.natureOfComplaint.split('\n').length+1}
                           value={jobReq.natureOfComplaint}
                           onChange={e=>{handleChange(e)}}
                          />
                        </Col>
                        
                        <Col xs={24} md={9} className="mb-24">
                          <span>Requesting Personnel Signature:</span>
                        </Col>
                        <Col xs={24} md={15} className="mb-24">
                        <Card.Grid
                        bordered
                        style={{ 
                          borderSize: 5, width: "100%",
                          padding: 0
                        }}
                        >
                            <SignatureCanvas 
                                penColor='green'
                                canvasProps={{
                                    width: 320, height: 150, 
                                }} 
                            />
                          <hr/>
                        </Card.Grid>
                          
                        </Col>

                        <Col xs={24} md={9} className="mb-24">
                          Date Recieved:
                        </Col>
                        <Col xs={24} md={15} className="mb-24">
                          <DatePicker style={{ width: "100%" }} 
                          disabled
                          title={"To be done by the admin."}
                          size="large"
                          onChange={(date, dateString)=>{
                            console.log(date)
                            console.log(dateString)
                          }}
                          />
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
            </Col>
    </>
  );
}
export default JobOrderForm