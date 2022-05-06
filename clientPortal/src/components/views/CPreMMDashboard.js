import { useEffect, useState } from "react";
import React, { Component }  from 'react';

import {
  Card,
  Col,
  Row,
  Table,
  Input
} from "antd";

import {
    CChartBar,
  }  from '@coreui/react-chartjs';
import cpremmApi from "../../controllers/api/CPreMM/cpremm-api";
import { isMobile } from "react-device-detect";

const { Search } = Input;

const CPreMMDashboard = ()=> {
    // eslint-disable-next-line
    const lg = window.innerWidth * .80
    const sm = (window.innerWidth * .80) / 2 
    const options={
        tooltips: {
          enabled: true
        }
      }
    const [chart, setchart] = useState(null)
    const getChart = async(setter)=>{
        const chart = await cpremmApi.getDashboardChart()
        setter(chart.data)
    }
    const [wasted, setwasted] = useState(null)
    const getWasted = async()=>{
        const res = await cpremmApi.getWastedDevices()
        setwasted(res.data)
    }

    useEffect(()=>{
        getChart(setchart)
        getWasted()
    }, [])

    
    const column = [
        { 
          title: <Row gutter={[24,0]}>
            <Col xs={24}>
              EMPLOYEE
            </Col>
          </Row>,
          render: val => (
            <>
            <Row gutter={[24,0]} style={{ margin: 0 }}>
                <Col xs={24}>
                  Accountable Officer: <span className='font-bold'> {val.text.userPAR.toUpperCase()}</span>
                </Col>
                <Col xs={24}>
                  End User: <span className='font-bold'>{val.text.userCO.toUpperCase()}</span>
                </Col>
                <Col xs={24}>
                  Division: <span className='font-bold'>{val.text.division}</span>
                </Col>
                <Col xs={24}>
                  Section: <span className='font-bold'>{val.text.section}</span>
                </Col>
            </Row>
          </>
          )
         },
        { title: <Row gutter={[24,0]}>
        <Col xs={24}>
         <center> DEVICE INFO</center>
        </Col>
      </Row>,
        render: val => (
          <Card style={{ margin: 0 }} > 
            <Row gutter={[24,0]} className="text-center" style={{ margin: 0 }}>
            <Col xs={24}>
             <small>IT Equipement: <b>{val.type.toUpperCase()}</b></small>
            </Col>
            <Col xs={24}>
             <small>Brand/Model: <b>{val.brand}</b></small>
            </Col>
            <Col xs={24}>
              <small>Serial No.: <b>{val.serial}</b></small>
            </Col>
            <Col xs={24}>
              <small>Property No.: <b>{val.propertyCode}</b></small>
            </Col>
          </Row>
          </Card>
        ),
        },
        { title: <center>REMARKS</center>,
         render: val => (
          <>
            <small className="font-bold" style={{ margin: 0 }}>{val.remarks}</small>
            <hr/>
          </>
         )
        }
      ];

    const [search, setsearch] = useState("")
    const [tempRes, settempRes] = useState(null)
    return (
        <>
        <div className="layout-content">
            {
            chart!==null&&
                <Row gutter={[24, 0]}>
                  <Col xs={24} lg={12}>
                  <div style={{ width: isMobile? lg : sm, marginLeft: isMobile? 25 : 10 }}>
                    <Card>
                    <CChartBar
                        data={{
                            labels: chart.labels,
                            datasets: [
                            {
                                label: 'In Use',
                                backgroundColor: '#006400',
                                data: chart.inUse,
                            },
                            {
                                label: 'Waste',
                                backgroundColor: '#808080',
                                data: chart.waste,
                            },
                            ],
                        }}
                        options={options}
                        />
                    </Card>
                </div>
                  </Col>
                  <Col xs={24} lg={12}>
                  <div style={{ width: isMobile? lg : sm }}>
                      <Row gutter={[24,0]} style={{ padding: 10 }}>
                          <Col xs={24} style={{ margin: 20 }}>
                              <Card style={{  margin:20 }}>
                                  <Col xs={24}>
                                      <b style={{ color: "#006400" }}>TOTAL IN USE</b>
                                      <center>
                                          <h2 style={{ color: "#808080" }}>{chart.totalInUse}</h2>
                                      </center>
                                  </Col>
                              </Card>
                          </Col>
                          <Col xs={24} style={{ margin: 20 }}>
                              <Card style={{ margin: 20 }}>
                                  <Col xs={24}>
                                      <b style={{ color: "#006400" }}>WASTE</b>
                                      <center>
                                          <h2 style={{ color: "#808080" }}>{chart.totalWaste}</h2>
                                      </center>
                                  </Col>
                              </Card>
                          </Col>
                      </Row>
                  </div>
                  </Col>
                </Row>
            }
             </div>
                <Col xs={24} style={{ padding: 10 }} >
                    <Card
                    title={<b style={{ color: "#006400" }}>List of Wasted Devices / Unit</b>}
                    >
                        <Row gutter={[24,0]}>
                        <Col xs={24} lg={15} offset={isMobile? 0 : 6} className={"mb-24"}>
                            <Search 
                            size="small" 
                            loading={false}
                            value={search}
                            placeholder={"Enter your name to check your wasted devices"}
                            onChange={e=>{
                                const val = e.target.value.toUpperCase()
                                setsearch(val)
                                if(val!==""){
                                    const res = wasted.filter(({ text })=> text.userPAR.toUpperCase().includes(val))
                                    settempRes(res)
                                } else {
                                    settempRes(null)
                                }
                               
                            }}
                            onSearch={val=>{
                                setsearch(val.toUpperCase())
                                if(val!==""){
                                    const res = wasted.filter(({ text })=> text.userPAR.includes(val))
                                    settempRes(res)
                                } else {
                                    settempRes(null)
                                }
                            }}/>
                        </Col>
                            <Col xs={24}>
                                <Table
                                 filterDropdown
                                 className="ant-list-box table-responsive"
                                 sorter
                                columns={column}
                                dataSource={search!==""? tempRes: wasted}
                                />
                            </Col>
                        </Row>
                    </Card>
                </Col>   
       
        </>
    );
}

export default CPreMMDashboard;
