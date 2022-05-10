import { Button, Card, Col, Input, Row, Select, Modal, Result, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Instagram } from 'react-content-loader';

import { createRef,  useState } from "react";
import { isDesktop, isMobile } from "react-device-detect";
import moment from "moment";
import ReCAPTCHA from "react-google-recaptcha";
import { QRCode } from 'react-qrcode-logo';
import { CopyToClipboard } from "react-copy-to-clipboard";

import JobOrderForm from "../components/views/JobOrderForm"
import JobOrderSteps from "../components/views/Steps";
import cpremmApi from "../controllers/api/CPreMM/cpremm-api";
import CPreMMDashboard from "../components/views/CPreMMDashboard";
import React, { Component }  from 'react';

const CPreMMPortal = (props)=> {
  localStorage.setItem("URL", "/CPreMM-Portal")
  const recaptchaRef = createRef();
  const [show, setshow] = useState("Dashboard")
  const [current, setcurrent] = useState(0)

  const jobReqInit = {
    dateFiled: moment().format("MMMM DD, YYYY"),
    requestingPersonnel: "",
    designation: "",
    division: "",
    serial: "",
    property: "",
    ITEquipment: "",
    brand: "",
    natureOfComplaint: "",
    dateRecieved: "",
    phoneNumber: ""
  }

  const [jobReq, setjobReq] = useState(jobReqInit)
  const [showSignPad, setshowSignPad] = useState(false)
  const [eSign, seteSign] = useState(null)

  const[showCAPTCHA, setshowCAPTCHA] = useState(true)

  const [reqOptions, setreqOptions] = useState([])
  const [userInfo, setuserInfo] = useState(null)
  
  const [deviceOptions, setdeviceOptions] = useState([])
  const [deviceOptionsProp, setdeviceOptionsProp] = useState([])
  const [deviceInfo, setdeviceInfo] = useState(null)

  const [processing, setprocessing] = useState(false)
  const [showSubmitted, setshowSubmitted] = useState(false)
  const [reference, setreference] = useState("")

  const SubmitHandler = async(userInfo, deviceInfo, eSign, jobReq)=>{
    window.scrollTo({top: 0, left: 0, behavior: 'smooth' })
    setprocessing(true)
    const uniqueKey = `${moment().format("MM_DD_YYYY")}-${deviceInfo._id}-${userInfo._id}`
    const dataToCreate = {
      uniqueKey: uniqueKey,
      requestingPersonnel: {
        id: userInfo._id,
        name: jobReq.requestingPersonnel,
        designation: jobReq.designation,
        divSec: jobReq.division
      },
      device: deviceInfo._id,
      natureOfComplaint: jobReq.natureOfComplaint,
      phoneNumber: jobReq.phoneNumber,
      eSignature: new Buffer(eSign.split(",")[1],"base64")
    }
    const create = await cpremmApi.createTempJobOrderRequest(dataToCreate)
    if(create.data.isCreated){
      setTimeout(()=>{
        setshowSubmitted(true)
        setreference(create.data.data._id)
        setprocessing(false)
        clear()
      }, 2000)
    } 
    else if(create.data.msg!==""){
      setprocessing(false)
      alert(create.data.msg)
    }
    else {
      setprocessing(false)
      alert("Error Occured When Submitting Job Request!\nPlease try again later.")
    }
    
  }

  const clear = ()=>{
    setjobReq(jobReqInit)
    setuserInfo(null)
    setdeviceInfo(null)
    seteSign(null)
    setcurrent(0)
  }

  return (
    <>
      <Modal
          visible={showSubmitted}
          centered
          onOk={()=>{
            setshowSubmitted(false)
            setreference("")
          }}
          onCancel={()=>{
            setshowSubmitted(false)
            setreference("")
          }}
          //okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}
        >
        <Result
          status="success"
          title="Submitted Successfully"
          subTitle="To track your job order request, copy this QR Code or Reference #"
          extra={[
            <CopyToClipboard text={reference} onCopy={()=>{
              if(isDesktop){
                message.success({
                  content: 'Copied',
                  className: 'custom-class',
                  style: {
                    marginTop: '20vh',
                  },
                  duration: 0.5
                });
              }
            }}>
              <Col xs={24} title="Copy Reference # 📋">
              <center>
                <Card
                hoverable
                title={
                  <Col xs={24}>
                    <center>
                      <small>Reference #: <br hidden={isDesktop}/> <b>{reference}</b></small>
                    </center>
                  </Col>
                }
                >
                  <QRCode 
                    value={reference}
                    qrStyle="dots"
                    size={isDesktop? 300 : 150}
                    bgColor="#F8F8F8"
                    fgColor="#006400"
                    logoImage={"https://cpremm.dohcaraga.org/static/media/DOHLogo3.4f8d6c18.png"}
                    logoWidth={isMobile? 50: 100}
                    logoOpacity={0.3}
                  />
                </Card>
              </center>
              </Col>
            </CopyToClipboard>
          ]}
        />
      </Modal>

      <div className="layout-content">
        <Row gutter={[24,0]}>
          <Col xs={24} lg={24} className="mb-24">
            <Row gutter={[24,0]}>

                 <Col lg={12} xs={24} className="mb-24">
                  <center> 
                    <Card
                      hoverable
                      onClick={()=>{
                        setshow("Dashboard")
                      }}
                      >
                      <span style={{ color: show==="Dashboard"? "green" : "black" }} className="font-bold">DASHBOARD</span>
                    </Card>
                  </center>  
                </Col>

                <Col lg={12} xs={24} className="mb-24">
                  <center> 
                    <Card
                      hoverable
                      onClick={()=>{
                        setshow("JOR")
                      }}
                      >
                      <span style={{ color: show==="JOR"? "green" : "black" }} className="font-bold">JOB ORDER REQUEST</span>
                    </Card>
                  </center>  
                </Col>

            </Row>
          </Col>
        </Row>
        {/**JOR */}
        <Row gutter={[24, 0]} hidden={show==="Dashboard"}>
          <Col xs={24} lg={24} style={{ marginTop: 15, marginBottom: 15 }} hidden={isMobile}>
            <JobOrderSteps
            current={current}
            setcurrent={setcurrent}
            />
          </Col>
          <Col xs={24} lg={24} style={{ marginTop: 15 }} >
            <Col className="mb-24">
              <Card
              title={
                  <>
                  <Col xs={24} hidden={isDesktop}>
                    <b>
                      {
                        current===0? "Requesting Personnel" :
                        current===1? "Select / Search Device to Repair":
                        current===2? "Nature of Complaint":
                        "Sign Request Form"
                      }
                    </b>
                  </Col>
                  <Col xs={24} hidden={isMobile}>
                    <b>Request Job Order</b>
                  </Col>
                  <Col xs={24} hidden={isMobile}>
                   <small>Instead of filling out a paper request form, you can use this portal to request job orders.</small>
                  </Col>
                  </>
              }
              actions={ [
                  <Row gutter={[24,0]} hidden={processing}>
                    <Col xs={12}>
                      <Button 
                      type="dashed"
                      hidden={current===0}
                      onClick={()=>{
                        setcurrent(current-1)
                      }}
                      >
                        ⏮️ PREV
                      </Button>
                    </Col>
                    <Col xs={12}>
                      <Button
                      type="dashed"
                      onClick={ async()=>{
                        if(current<3){
                          if(current===0 && userInfo!==null){
                            setcurrent(current+1)
                          } 
                          else if(current===1 && deviceInfo!==null){
                            setcurrent(current+1)
                          } 
                          else if(current===2 && jobReq.natureOfComplaint!=="" && jobReq.phoneNumber!==""){
                            setshowSignPad(eSign===null)
                            setcurrent(current+1)
                          }
                          else if(eSign===null) {
                            alert("Please provide your signature to proceed!")
                          }
                          else {
                            alert("Please fill in the fields correctly and completely!")
                          }
                        } else {
                          const confirm = window.confirm("Submit Job Order Request?")
                          if(confirm){
                            SubmitHandler(userInfo, deviceInfo, eSign, jobReq)
                          }
                        }
                      }}
                      >
                        {current<3? "NEXT ⏭️" : "SUBMIT 💾"}
                      </Button>
                    </Col>
                  </Row>
                ]}
              >
                <Col xs={24} hidden={!processing}>
                  <Instagram />
                </Col>
                <div hidden={processing || showCAPTCHA}>
                <Col xs={24} offset={isMobile? 12: 20} >
                  <Button 
                    type="dashed"
                    hidden={isMobile || current===0}
                    onClick={()=>{
                      setcurrent(current-1)
                    }}
                    >
                      ↩️ GET BACK
                  </Button>
                </Col>
                {/**Requesting Personnel */}
                <Col md={24} hidden={current!==0}>
                  <Col md={24} hidden={isMobile} className={"text-center mb-24"}>
                  <b>REQUESTING PERSONNEL DETAILS</b>
                  </Col>
                  <Row gutter={[24, 0]}>
                    <Col xs={24} lg={15} offset={isMobile? 0 : 5}>
                      <Row gutter={[24,0]} className="mb-24">
                        <Col xs={24} lg={7}>
                          <b>Name:</b>
                        </Col>
                        <Col xs={24} lg={17}>
                          <Select
                            style={{
                              width: "100%",
                            }}
                            value={jobReq.requestingPersonnel}
                            filterOption={false}
                            notFoundContent={<center> 🔎 Search Your Name</center> }
                            showSearch
                            allowClear
                            onClear={()=>{
                              setuserInfo(null)
                              setreqOptions([])
                              setjobReq(prevState=>({...prevState, 
                                requestingPersonnel: "",
                                designation: "",
                                division: ""
                              }))
                            }}
                            onSelect={val=>{
                              const uI = JSON.parse(val)
                              const name =  uI.name
                              const displayName = `${name.last}, ${name.first} ${name.mid.charAt(0)}`.toUpperCase()
                              setjobReq(prevState=>({...prevState, 
                                  requestingPersonnel: displayName,
                                  designation: uI.designation,
                                  division: `${uI.office.division} - ${uI.office.section}`
                              }))
                              setuserInfo(uI)
                            }}
                            onSearch={async(val)=>{
                              if(val.length>=2) {
                                const res = await cpremmApi.getUser(val)
                                var temp= []
                                for(let i=0; i< res.data.length; i++) {
                                    const dev = res.data[i]
                                    temp.push(JSON.stringify(dev))
                                }
                                setreqOptions(temp)
                              } else{
                                setreqOptions([])
                              }
                            }}
                            
                          >
                            {
                            reqOptions.length!==0 && reqOptions.map((val,k)=>{
                              const uI = JSON.parse(val)
                              const name = uI.name
                              const displayName = `${name.last}, ${name.first} ${name.mid.charAt(0)}`.toUpperCase()
                              return  <Select.Option value={val} key={k}><Row gutter={[24,0]}>
                                          <Col md={24}>
                                            {displayName}
                                          </Col>
                                          <Col md={24}>
                                            <small className="text-muted">{uI.designation}</small>
                                          </Col>
                                        </Row>
                                      </Select.Option>
                              })
                            }
                          </Select>
                        </Col>
                      </Row>

                      <Row gutter={[24,0]} className="mb-24">
                        <Col xs={24} lg={7}>
                          <b>Designation: </b>
                        </Col>
                        <Col xs={24} lg={17}>
                          <center>{jobReq.designation}</center>
                          <hr style={{ marginTop: jobReq.designation===""? 20 : 0 }}/>
                        </Col>
                      </Row>

                      <Row gutter={[24,0]} className="mb-24">
                        <Col xs={24} lg={7}>
                          <b>Division - Section: </b>
                        </Col>
                        <Col xs={24} lg={17}>
                          <center>{jobReq.division}</center>
                          <hr style={{ marginTop: jobReq.division===""? 20 : 0 }}/>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                {/**Serial or Property Number */}
                <Col md={24} hidden={current!==1}>
                  <Col md={24} hidden={isMobile} className={"text-center mb-24"}>
                    <b>DEVICE TO REPAIR</b>
                  </Col>
                  <Col xs={24} lg={15} offset={isMobile? 0 : 5}>
                      <Row gutter={[24,0]} className="mb-24">
                        <Col xs={24} lg={7}>
                          <b>Serial #:</b>
                        </Col>
                        <Col xs={24} lg={17}>
                          <Select
                            style={{
                              width: "100%",
                            }}
                            value={jobReq.serial}
                            filterOption={false}
                            notFoundContent={<center> 🔎 Search Serial #</center> }
                            showSearch
                            allowClear
                            onClear={()=>{
                              setdeviceInfo(null)
                              setdeviceOptions([])
                              setjobReq(prevState=>({...prevState, 
                                serial: "",
                                property: "",
                                ITEquipment: "",
                                brand: ""
                              }))
                            }}
                            onSelect={val=>{
                              const dev = JSON.parse(val)
                              setdeviceInfo(dev)
                              setjobReq(prevState=>({...prevState, 
                                serial: dev.serial,
                                property: dev.propertyCode,
                                ITEquipment: dev.type,
                                brand: dev.brand
                              }))
                            }}
                            onSearch={async(val)=>{
                              if(val.length>=2) {
                                const res = await cpremmApi.getDevices("true", val, "")
                                var temp= []
                                for(let i=0; i< res.data.length; i++) {
                                    const dev = res.data[i]
                                    temp.push(JSON.stringify(dev))
                                }
                                setdeviceOptions(temp)
                              } else{
                                setdeviceOptions([])
                              }
                            }}
                            
                          >
                            {
                            deviceOptions.map((val,k)=>{
                              const dev = JSON.parse(val)
                              const brandPropCode = dev.brand+" - "+dev.propertyCode
                              return  <Select.Option value={val} key={k}><Row gutter={[24,0]}>
                                          <Col md={24}>
                                            {brandPropCode}
                                          </Col>
                                          <Col md={24}>
                                            <small className="text-muted">{dev.serial}</small>
                                          </Col>
                                        </Row>
                                      </Select.Option>
                              })
                            }
                          </Select>
                        </Col>
                      </Row>
                      
                      <Row gutter={[24,0]} className="mb-24">
                        <Col xs={24} lg={7}>
                          <b>Property Code:</b>
                        </Col>
                        <Col xs={24} lg={17}>
                          <Select
                            style={{
                              width: "100%",
                            }}
                            value={jobReq.property}
                            filterOption={false}
                            notFoundContent={<center> 🔎 Search Property Code</center> }
                            showSearch
                            allowClear
                            onClear={()=>{
                              setdeviceInfo(null)
                              setdeviceOptionsProp([])
                              setjobReq(prevState=>({...prevState, 
                                serial: "",
                                property: "",
                                ITEquipment: "",
                                brand: ""
                              }))
                            }}
                            onSelect={val=>{
                              const dev = JSON.parse(val)
                              setdeviceInfo(dev)
                              setjobReq(prevState=>({...prevState, 
                                serial: dev.serial,
                                property: dev.propertyCode,
                                ITEquipment: dev.type,
                                brand: dev.brand
                              }))
                            }}
                            onSearch={async(val)=>{
                              if(val.length>=2) {
                                const res = await cpremmApi.getDevices("false","",val)
                                var temp= []
                                for(let i=0; i< res.data.length; i++) {
                                    const dev = res.data[i]
                                    temp.push(JSON.stringify(dev))
                                }
                                setdeviceOptionsProp(temp)
                              } else{
                                setdeviceOptionsProp([])
                              }
                            }}
                            
                          >
                            {
                            deviceOptionsProp.map((val,k)=>{
                              const dev = JSON.parse(val)
                              const brandPropCode = dev.brand+" - "+dev.propertyCode
                              return  <Select.Option value={val} key={k}><Row gutter={[24,0]}>
                                          <Col md={24}>
                                            {brandPropCode}
                                          </Col>
                                          <Col md={24}>
                                            <small className="text-muted">{dev.serial}</small>
                                          </Col>
                                        </Row>
                                      </Select.Option>
                              })
                            }
                          </Select>
                        </Col>
                      </Row>

                      <Row gutter={[24,0]} className="mb-24">
                        <Col xs={24} lg={7}>
                          <b>IT Equipment: </b>
                        </Col>
                        <Col xs={24} lg={17}>
                          <center>{jobReq.ITEquipment!==undefined? jobReq.ITEquipment.toUpperCase() : ""}</center>
                          <hr style={{ marginTop: jobReq.ITEquipment===""? 20 : 0 }}/>
                        </Col>
                      </Row>

                      <Row gutter={[24,0]} className="mb-24">
                        <Col xs={24} lg={7}>
                          <b>Brand / Model: </b>
                        </Col>
                        <Col xs={24} lg={17}>
                          <center>{jobReq.brand}</center>
                          <hr style={{ marginTop: jobReq.brand===""? 20 : 0 }}/>
                        </Col>
                      </Row>

                  </Col>
                </Col>
                {/**Nature of Complaint */}
                <Col md={24} hidden={current!==2}>
                  <Col md={24} hidden={isMobile} className={"text-center mb-24"}>
                  <b>NATURE OF COMPLAINT</b>
                  </Col>
                  <Row gutter={[24, 0]}>
                    <Col xs={24} lg={15} offset={isMobile? 0 : 5}>
                      <Row gutter={[24,0]} className="mb-24">
                        <Col xs={24} >
                          <TextArea
                          placeholder="Describe the issue with the device/unit."
                          value={jobReq.natureOfComplaint}
                          onChange={e=>{
                            setjobReq(prevState=>({...prevState, natureOfComplaint: e.target.value}))
                          }}
                          rows={jobReq.natureOfComplaint.split('\n').length < 2? 3 : jobReq.natureOfComplaint.split('\n').length}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Col md={24} hidden={isMobile} className={"text-center mb-24"}>
                  <b>PHONE NUMBER</b>
                  </Col>
                  <Row gutter={[24, 0]}>
                    <Col xs={24} lg={15} offset={isMobile? 0 : 5}>
                      <Row gutter={[24,0]} className="mb-24">
                        <Col xs={24} lg={15}offset={isMobile? 0 : 5} >
                          <Input
                            placeholder="Enter phone number to contact"
                            type="number"
                            value={jobReq.phoneNumber}
                            onChange={e=>{
                              setjobReq(prevState=>({...prevState, phoneNumber: e.target.value }))
                            }}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                {/**Sign Form Request */}
                <Col md={24} hidden={current!==3}>
                <Row gutter={[24, 0]}>
                    <Col xs={24} lg={15} offset={isMobile? 0 : 5}>
                    <JobOrderForm 
                    jobReq={jobReq}
                    eSign={eSign}
                    seteSign={seteSign}
                    showSignPad={showSignPad}
                    setshowSignPad={setshowSignPad}
                    />
                    </Col>
                </Row>
                </Col>
                </div>
                <Col xs={24} hidden={!showCAPTCHA} style={{ padding: 0 }}>
                  <center>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    size={isMobile? "compact" : "normal"}
                    sitekey="6LfIrdofAAAAAEFLnMaR7y4I-hTWyr2mxs3DzKk0" //test key
                    onChange={()=>{
                      setTimeout(()=>{
                        setshowCAPTCHA(!showCAPTCHA)
                      }, 500)
                    }}
                    onExpired={()=>{
                      setTimeout(()=>{
                        setshowCAPTCHA(!false)
                      }, 1000 * 120)
                    }}
                  />
                  <br/>
                  This site is protected by reCAPTCHA and the Google &nbsp;
                  <a href="https://policies.google.com/privacy">Privacy Policy</a> and &nbsp;
                  <a href="https://policies.google.com/terms">Terms of Service</a> apply.
                  </center>
                </Col>
              </Card>
            </Col>
          </Col>
        </Row>
         {/**DASHBOARD */}
         <Row gutter={[24, 0]} hidden={show==="JOR"}>
          <CPreMMDashboard
          
          />
        </Row>
      </div>
    </>
  );
}

export default CPreMMPortal;
