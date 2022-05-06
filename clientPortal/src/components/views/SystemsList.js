import { Card, Col, Popover } from "antd";
import { NavLink } from "react-router-dom";
import React, { Component }  from 'react';
function SystemList(props) {
    const systems = props.systems
    return (
    <>
    {
        systems!==null&&systems!==undefined&&
        systems.map((val,k)=>{
            return  <Col xs={12} lg={8} key={k} className="mb-24">
                <Popover 
                title={<>Procced to <b>{val.name}</b>?</>}
                content={
                    <small>{val.description}</small>
                    }
                >
                {
                    val.url.includes("https://")?
                    <Card 
                    title={<b>{val.name}</b>}
                    hoverable
                    onClick={()=>{
                        if(val.url.includes("https://")) {
                            window.open(val.url, "share")
                        }
                    }}
                    >
                        <center>
                            <img
                                style={{ padding: 5 }}
                                alt="🚫"
                                src={val.logo}
                                width={100}
                                height={100}
                            />
                        </center>
                    </Card>
                    :
                    <NavLink to={val.url}>
                        <Card 
                        title={<b>{val.name}</b>}
                        hoverable
                        onClick={()=>{
                            if(val.url.includes("https://")) {
                                window.open(val.url, "share")
                            }
                        }}
                        >
                            <center>
                                <img
                                    style={{ padding: 5 }}
                                    alt="🚫"
                                    src={val.logo}
                                    width={100}
                                    height={100}
                                />
                            </center>
                        </Card>
                    </NavLink>
                }
                    
                </Popover>
            </Col>
        })
    }
        <Col span={6}>
            ...
        </Col>
    </>
  );
}

export default SystemList;