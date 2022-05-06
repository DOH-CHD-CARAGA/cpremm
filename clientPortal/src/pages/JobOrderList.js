import { CheckOutlined, DeleteOutlined, PrinterOutlined } from '@ant-design/icons';
// eslint-disable-next-line
import { Table, Row, Col, Input, Card, Button, Popconfirm, message, Switch, DatePicker} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import { useEffect, useState, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import cpremmApi from '../controllers/api/CPreMM/cpremm-api';
import PrintJobOrderForm from '../components/views/PrintJobOrderForm';

import React, { Component }  from 'react';

const { Search } = Input;

const JobOrderList = ()=>{
  localStorage.setItem('URL', "/Job-Order-List")
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
  content: () => componentRef.current,
  });
  
  const [pending, setpending] = useState(null)
  const [proceeded, setproceeded] = useState(null)

  const updateStatus = async(val, status)=>{
    let _id = val._id
    if(status.toLowerCase()==="proceeded"){
      var dataToAdd = val
      dataToAdd.jobOrderRequestID = ""
      dataToAdd.device = dataToAdd.device._id
      dataToAdd.fromPortal = true
      delete dataToAdd.eSignature
      delete dataToAdd.createdAt
      delete dataToAdd.uniqueKey
      delete dataToAdd._id
      delete dataToAdd.__v
      delete dataToAdd.phoneNumber
      console.log(val)
      console.log(dataToAdd)
      const add = await cpremmApi.addToJobOrderRequestLiveData(dataToAdd)
      console.log(add)
      if(add.status === 200){
        const upd = await cpremmApi.updateTempJobOrderRequest(_id, status.toLowerCase())
        if(upd.status === 200) {
          message.success({
            content: `${status} Successfully`,
            className: 'custom-class',
            style: {
                marginTop: '20vh',
            },
            duration: 1
          });
          getJobOrdersList("pending", setpending);
          getJobOrdersList("proceeded", setproceeded);
        }
        
      }
    } 
    else {
      const upd = await cpremmApi.updateTempJobOrderRequest(_id, status.toLowerCase())
      if(upd.status === 200) {
        message.success({
          content: `${status} Successfully`,
          className: 'custom-class',
          style: {
              marginTop: '20vh',
          },
          duration: 1
        });
        getJobOrdersList("pending", setpending);
      }
    }
  }

  const getJobOrdersList = async(status, setter)=>{
    setter(null)
    const res = await cpremmApi.getTempJobOrderRequest(status)
    setter(res.data)
  }

  useEffect(()=>{
    getJobOrdersList("pending", setpending)
    getJobOrdersList("proceeded", setproceeded)
  },
  [])
  const [monitor, setmonitor] = useState(null)

  if(monitor){
    const timeStartMonitor = Date.now()
    setInterval(()=>{ 
      let now = new Date().getTime();
      let diff = (now - timeStartMonitor) / 1000;
      if (diff > 60 * 60) { //1hour
        window.location.reload();
      }
      getJobOrdersList("pending", setpending)
    }, 1000 * 15) //15 seconds
  } 
  if(monitor===false && monitor!==null) {
    window.location.reload();
  }

  const [jobReq, setjobReq] = useState(null)
  const [eSign, seteSign] = useState(null)

  const [searchNemp, setsearchNemp] = useState("")
  const [searchNdev, setsearchNdev] = useState("")
  const [NData, setNData] = useState(null)
  const [searchPemp, setsearchPemp] = useState("")
  const [searchPdev, setsearchPdev] = useState("")
  const [PData, setPData] = useState(null)
  const columnN = [
    { title:  
    <Row gutter={[24,0]}>
      <Col xs={24}>
        DATE FILED
      </Col>
      <Col xs={24}>
        <DatePicker.RangePicker 
        onCalendarChange={val => console.log(val)}
        onChange={val => console.log(val)}
        onOpenChange={open => console.log(open)}
        />
      </Col>
    </Row>,
    render: val => (
      <Row gutter={[24,0]}>
        <Col xs={24}>
          {moment(val.createdAt).format("MMMM DD, YYYY")}
        </Col>
        <Col xs={24}>
          {moment(val.createdAt).format("@ hh:mm:ss A")}
        </Col>
      </Row>
     )
    },
    { 
      title: <Row gutter={[24,0]}>
        <Col xs={24}>
          REQUESTING PERSONNEL
        </Col>
        <Col xs={24}>
            <Search 
            size="large" 
            loading={false}
            value={searchNemp}
            placeholder={"Search employee"}
            onChange={e=>{
              setsearchNemp(e.target.value)
              setNData(pending)
              if(searchNemp!=="" && NData!==null){
                const res = NData.filter(({ requestingPersonnel }) => 
                requestingPersonnel.name.toLowerCase().includes(searchNemp.toLowerCase())
                )
                setNData(res)
              } 
            }}
            onSearch={val=>{
              setsearchNemp(val)
              setNData(pending)
              if(searchNemp!=="" && NData!==null){
                const res = NData.filter(({ requestingPersonnel }) => 
                requestingPersonnel.name.toLowerCase().includes(searchNemp.toLowerCase())
                )
                setNData(res)
              } 
            }}/>
          </Col>
      </Row>,
      render: val => (
        <>
        <Row gutter={[24,0]}>
            <Col xs={24} style={{ marginLeft: 60}}>
              <img
                alt="🚫"
                style={{width: 50 }}
                src={`data:image/jpeg;base64,${val.eSignature}`}
                />
            </Col>
            <Col xs={24}>
              Name: <span className='font-bold'> {val.requestingPersonnel.name}</span>
            </Col>
            <Col xs={24}>
              Designation: <span className='font-bold'>{val.requestingPersonnel.designation}</span>
            </Col>
            <Col xs={24}>
              Division/Section: <span className='font-bold'>{val.requestingPersonnel.divSec}</span>
            </Col>
            <Col xs={24}>
              Phone #: <span className='font-bold'>{val.phoneNumber}</span>
            </Col>
        </Row>
      </>
      )
     },
    { title: <Row gutter={[24,0]}>
    <Col xs={24}>
      DEVICE INFO
    </Col>
    <Col xs={24}>
        <Search 
        size="large" 
        loading={false}
        value={searchNdev}
        placeholder={"Search device serial # or property code"}
        onChange={e=>{
          setsearchNdev(e.target.value)
          setNData(pending)
          if(searchNdev!=="" && NData!==null){
            const res1 = NData.filter(({ device }) => 
            device.serial.includes(searchNdev)
            )
            const res2 = NData.filter(({ device }) => 
            device.propertyCode.includes(searchNdev)
            )
            setNData(res1.length!==0? res1 : res2)
          } 
        }}
        onSearch={val=>{
          setsearchNdev(val)
          setNData(pending)
          if(searchNdev!=="" && NData!==null){
            const res1 = NData.filter(({ device }) => 
            device.serial.includes(searchNdev)
            )
            const res2 = NData.filter(({ device }) => 
            device.propertyCode.includes(searchNdev)
            )
            if(res1.length!==0){
              setNData(res1)
            }
            else if(res2.length!==0){
              setNData(res2)
            } else {
              setNData(null)
            }
          } 
        }}/>
      </Col>
  </Row>,
    render: val => (
      <Card>
        <Row gutter={[24,0]} className="text-center">
        <Col xs={24}>
         <small>IT Equipement: <b>{val.device.type.toUpperCase()}</b></small>
        </Col>
        <Col xs={24}>
         <small>Brand/Model: <b>{val.device.brand}</b></small>
        </Col>
        <Col xs={24}>
          <small>Serial No.: <b>{val.device.serial}</b></small>
        </Col>
        <Col xs={24}>
          <small>Property No.: <b>{val.device.propertyCode}</b></small>
        </Col>
      </Row>
      </Card>
    ),
     },
    { title: <center>NATURE OF COMPLAINT</center>,
     render: val => (
      <>
        <TextArea 
        rowClassName={(val) => val.createdAt ? 'table-row-light' :  'table-row-dark'}
        style={{ borderColor: "transparent", marginBottom: 0 }}
        rows={val.natureOfComplaint.split('\n').length===1? 3 : val.natureOfComplaint.split('\n').length}
        value={val.natureOfComplaint}
        />
        <hr/>
      </>
     )
    },
    { title: <center>ACTIONS</center>,
    render: val => (
      <Row gutter={[24,0]}>
        <Col lg={12} xs={24} hidden={val.status!=="proceeded" || isMobile}>
        <Popconfirm
          icon={<PrinterOutlined/>}
          placement="left"
          title={"Print ?"}
          onConfirm={handlePrint}
          onCancel={()=>{
            seteSign(null)
            setjobReq(null)
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="link"
            onClick={()=>{
              seteSign(val.eSignature)
              const data = {
                dateFiled: moment(val.createdAt).format("MMMM DD, YYYY"),
                requestingPersonnel: val.requestingPersonnel.name,
                designation: val.requestingPersonnel.designation,
                division: val.requestingPersonnel.divSec,
                serial: val.device.serial,
                property: val.device.propertyCode,
                ITEquipment: val.device.type,
                brand: val.device.brand,
                natureOfComplaint: val.natureOfComplaint,
                dateRecieved: "",
                phoneNumber: val.phoneNumber
              }
              setjobReq(data)
            }}
          >
             PRINT 🖨️
          </Button>
        </Popconfirm>
        </Col>
        <Col lg={12} xs={24} hidden={val.status!=="pending"} >
        <Popconfirm
          icon={<DeleteOutlined />}
          placement="left"
          title={"Are you sure you want to reject this requests ?"}
          onConfirm={()=>{
            updateStatus(val, "Rejected")
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="link"
          >
             <span className='text-danger'>❌ REJECT</span>
          </Button>
          </Popconfirm>
        </Col>
        <Col lg={12} xs={24} hidden={val.status!=="pending"}>
          <Popconfirm
            icon={<CheckOutlined />}
            placement="left"
            title={"Are you sure you want to proceed this requests ?"}
            onConfirm={()=>{
              updateStatus(val, "Proceeded")
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
            >
              <span className='text-success'>PROCEED ✅</span>
            </Button>
          </Popconfirm>
        </Col>
      </Row>
     ) }
  ];

  const columnP = [
    { title: <Row gutter={[24,0]}>
    <Col xs={24}>
      DATE FILED
    </Col>
    <Col xs={24}>
      <DatePicker.RangePicker 
      onCalendarChange={val => console.log(val)}
      onChange={val => console.log(val)}
      onOpenChange={open => console.log(open)}
      />
    </Col>
  </Row>,
    render: val => (
      <Row gutter={[24,0]}>
        <Col xs={24}>
          {moment(val.createdAt).format("MMMM DD, YYYY")}
        </Col>
        <Col xs={24}>
          {moment(val.createdAt).format("@ hh:mm:ss A")}
        </Col>
      </Row>
     )
    },
    { 
      title: <Row gutter={[24,0]}>
        <Col xs={24}>
          REQUESTING PERSONNEL
        </Col>
        <Col xs={24}>
        <Search 
            size="large" 
            loading={false}
            value={searchPemp}
            placeholder={"Search employee"}
            onChange={e=>{
              setsearchPemp(e.target.value)
              setPData(proceeded)
              if(searchPemp!=="" && PData!==null){
                const res = PData.filter(({ requestingPersonnel }) => 
                requestingPersonnel.name.toLowerCase().includes(searchPemp.toLowerCase())
                )
                setPData(res)
              } 
            }}
            onSearch={val=>{
              setsearchPemp(val)
              setPData(proceeded)
              if(searchPemp!=="" && PData!==null){
                const res = PData.filter(({ requestingPersonnel }) => 
                requestingPersonnel.name.toLowerCase().includes(searchPemp.toLowerCase())
                )
                setPData(res)
              } 
            }}/>
        </Col>
      </Row>,
      render: val => (
        <>
        <Row gutter={[24,0]}>
            <Col xs={24} style={{ marginLeft: 60}}>
              <img
                alt="🚫"
                style={{width: 50 }}
                src={`data:image/jpeg;base64,${val.eSignature}`}
                />
            </Col>
            <Col xs={24}>
              Name: <span className='font-bold'> {val.requestingPersonnel.name}</span>
            </Col>
            <Col xs={24}>
              Designation: <span className='font-bold'>{val.requestingPersonnel.designation}</span>
            </Col>
            <Col xs={24}>
              Division/Section: <span className='font-bold'>{val.requestingPersonnel.divSec}</span>
            </Col>
            <Col xs={24}>
              Phone #: <span className='font-bold'>{val.phoneNumber}</span>
            </Col>
        </Row>
      </>
      )
     },
    { title: <Row gutter={[24,0]}>
      <Col xs={24}>
        DEVICE INFO
      </Col>
      <Col xs={24}>
      <Search 
        size="large" 
        loading={false}
        value={searchPdev}
        placeholder={"Search device serial # or property code"}
        onChange={e=>{
          setsearchPdev(e.target.value)
          setPData(proceeded)
          if(searchPdev!=="" && PData!==null){
            const res1 = PData.filter(({ device }) => 
            device.serial.includes(searchPdev)
            )
            const res2 = PData.filter(({ device }) => 
            device.propertyCode.includes(searchPdev)
            )
            if(res1.length!==0){
              setPData(res1)
            }
            else if(res2.length!==0){
              setPData(res2)
            } else {
              setPData(null)
            }
          } 
        }}
        onSearch={val=>{
          setsearchPdev(val)
          setPData(pending)
          if(searchPdev!=="" && PData!==null){
            const res1 = PData.filter(({ device }) => 
            device.serial.includes(searchPdev)
            )
            const res2 = PData.filter(({ device }) => 
            device.propertyCode.includes(searchPdev)
            )
            setPData(res1.length!==0? res1 : res2)
          } 
        }}/>
      </Col>
    </Row>,
    render: val => (
      <Card>
        <Row gutter={[24,0]} className="text-center">
        <Col xs={24}>
         <small>IT Equipement: <b>{val.device.type.toUpperCase()}</b></small>
        </Col>
        <Col xs={24}>
         <small>Brand/Model: <b>{val.device.brand}</b></small>
        </Col>
        <Col xs={24}>
          <small>Serial No.: <b>{val.device.serial}</b></small>
        </Col>
        <Col xs={24}>
          <small>Property No.: <b>{val.device.propertyCode}</b></small>
        </Col>
      </Row>
      </Card>
    ),
     },
    { title: <center>NATURE OF COMPLAINT</center>,
     render: val => (
      <>
        <TextArea 
        rowClassName={(val) => val.createdAt ? 'table-row-light' :  'table-row-dark'}
        style={{ borderColor: "transparent", marginBottom: 0 }}
        rows={val.natureOfComplaint.split('\n').length===1? 3 : val.natureOfComplaint.split('\n').length}
        value={val.natureOfComplaint}
        />
        <hr/>
      </>
     )
    },
    { title: <center>ACTIONS</center>,
    render: val => (
      <Row gutter={[24,0]}>
        <Col lg={12} xs={24} hidden={val.status!=="proceeded" || isMobile}>
        <Popconfirm
          icon={<PrinterOutlined/>}
          placement="left"
          title={"Print ?"}
          onConfirm={handlePrint}
          onCancel={()=>{
            seteSign(null)
            setjobReq(null)
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="link"
            onClick={()=>{
              seteSign(val.eSignature)
              const data = {
                dateFiled: moment(val.createdAt).format("MMMM DD, YYYY"),
                requestingPersonnel: val.requestingPersonnel.name,
                designation: val.requestingPersonnel.designation,
                division: val.requestingPersonnel.divSec,
                serial: val.device.serial,
                property: val.device.propertyCode,
                ITEquipment: val.device.type,
                brand: val.device.brand,
                natureOfComplaint: val.natureOfComplaint,
                dateRecieved: "",
                phoneNumber: val.phoneNumber
              }
              setjobReq(data)
            }}
          >
             PRINT 🖨️
          </Button>
        </Popconfirm>
        </Col>
        <Col lg={12} xs={24} hidden={val.status!=="pending"} >
        <Popconfirm
          icon={<DeleteOutlined />}
          placement="left"
          title={"Are you sure you want to reject this requests ?"}
          onConfirm={()=>{
            updateStatus(val, "Rejected")
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="link"
          >
             <span className='text-danger'>❌ REJECT</span>
          </Button>
          </Popconfirm>
        </Col>
        <Col lg={12} xs={24} hidden={val.status!=="pending"}>
          <Popconfirm
            icon={<CheckOutlined />}
            placement="left"
            title={"Are you sure you want to proceed this requests ?"}
            onConfirm={()=>{
              updateStatus(val, "Proceeded")
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
            >
              <span className='text-success'>PROCEED ✅</span>
            </Button>
          </Popconfirm>
        </Col>
      </Row>
     ) }
  ];
  
  return (
    <>
    {
      jobReq!==null&&
      <Col hidden xs={24}>
      <PrintJobOrderForm
        ref={componentRef}
        jobReq={jobReq}
        eSign={eSign}
      />
      </Col>
    }
      <Row gutter={[24,0]}>
      <Col xs={24} style={{ marginRight: 30}} className="mb-24">
        <Card
        title={
        <Row gutter={[24,0]}>
          <Col xs={24} lg={12}>
            <b>New / Pending</b>
          </Col>
          <Col xs={24} lg={12} className="d-flex justify-content-end">
            Live Monitoring <Switch defaultChecked={false} title={monitor? "Press to OFF" : "Press to ON"} onChange={checked=>{setmonitor(checked)}} style={{ marginLeft: 10, background: monitor? "#00FF00":"red" }} />
          </Col>
        </Row>
        }
        >
          <Table
            filterDropdown
            className="ant-list-box table-responsive"
            sorter
            loading={pending===null}
            columns={columnN}
            dataSource={searchNemp===""? searchNdev === ""? pending : NData : NData}
          />
        </Card>
      </Col>

      <Col xs={24}>
        <Card
        title={<Row gutter={[24,0]}>
        <Col xs={24} lg={12}>
          <b>Proceeded</b>
        </Col>
      </Row>}
        >
          <Table
            filterDropdown
            className="ant-list-box table-responsive"
            sorter
            loading={proceeded===null}
            columns={columnP}
            dataSource={searchPemp===""? searchPdev === ""? proceeded : PData : PData}
          />
        </Card>
      </Col>
      </Row>
    </>
   
  );
}

export default JobOrderList;