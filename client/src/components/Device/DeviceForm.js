import React from 'react';
import { connect } from 'react-redux';
import { CustomInput, Collapse } from 'reactstrap';
import { FaPlus, FaTimes } from 'react-icons/fa';
import LabelInput from '../helpers/LabelInput';
import Search2 from '../helpers/Search2';

import {
  GetDate,
} from '../../actions/helpers/dateAction';

import {
  SetValue,
  SetValue2,
  ArrangeName,
  GetSafe,
} from '../../actions/helpers/displayAction';

import {
  SetUserDeviceEntry,
} from '../../actions/deviceAction';

import {
  SET_DEVICE_VALUE,
  SET_REACT_SELECT_RECORD_OPTIONS_NEW,
} from '../../actions/types';

class DeviceForm extends React.Component {
  
  constructor (props) {
    super(props);

    this.state = {
      currentSearch: 1,
      route: "",
    }
  }


  render () {

    const { device, deviceDefault } = this.props.device;
    console.log(":::::::::::::::::::::::.............");
    console.log(device);
    return (
      <div id="device-form" className="entry-form">
        <div className="custom-container">

          <div className="custom-container-title">
            Device Info
          </div>

          <div className="custom-container-body">
            <div className="row" id="upper-part">
              <div className="inpt-grp col-md-6">
                <LabelInput case={1}
                  label={"Device Type "} value={device.type} prop="type" type="select" req={1}
                  options={[
                    {text: "Desktop", value: "desktop"}, {text: "Laptop", value: "laptop"},
                    {text: "Monitor", value: "monitor"}, {text: "Printer", value: "printer"},
                    {text: "Scanner", value: "scanner"}, {text: "Ups", value: "ups"}, 
                    {text: "Avr", value: "avr"},{ text: "Router", value: "router" },
                    { text: "Camera", value: "camera" },{ text: "Speaker", value: "speaker" },{ text: "Tablet", value: "tablet" },
                  ]}
                  onChange={(e) => {
                    this.props.SetValue(e, SET_DEVICE_VALUE);
                  }}
                />
              </div>
              <div className="col-md-6" id="checkbox-area">
                <CustomInput type="switch" id="device" name="customSwitch" 
                  label={(device.status === 1)?"In-Use":"Waste"}
                  checked={(device.status === 1)?true:false}
                  onChange={(e) => {
                    this.props.SetValue2("status", (e.target.checked)?1:0, SET_DEVICE_VALUE);
                  }}
                />
              </div>
            </div>

            <div className="row">

              <div className="inpt-grp col-md-6">
                <LabelInput case={1}
                  label={"Property Code"} value={device.propertyCode} prop="propertyCode" type="text" case={1} req={1}
                  onChange={(e) => {
                    this.props.SetValue(e, SET_DEVICE_VALUE);
                  }}
                />
              </div>

              <div className="inpt-grp col-md-6">
                <LabelInput case={1}
                  label={"Serial "} value={device.serial} prop="serial" type="text" req={1} case={1}
                  onChange={(e) => {
                    this.props.SetValue(e, SET_DEVICE_VALUE);
                  }}
                />
              </div>
            </div>   

            <div className="row">
              <div className="inpt-grp col-md-6">
                <LabelInput case={1}
                  label={"Brand "} value={device.brand} prop="brand" type="text" req={1} case={1}
                  onChange={(e) => {
                    this.props.SetValue(e, SET_DEVICE_VALUE);
                  }}
                />
              </div>
              <div className="inpt-grp col-md-6">
                <LabelInput case={1}
                  label={"Model "} value={device.model} prop="model" type="text" req={1} case={1}
                  onChange={(e) => {
                    this.props.SetValue(e, SET_DEVICE_VALUE);
                  }}
                />
              </div>
            </div>   

            <div className="row">
              <div className="inpt-grp col-md-4">
                <LabelInput case={1}
                  label={"Cost "} value={device.cost} prop="cost" type="text" req={1} case={1}
                  onChange={(e) => {
                    this.props.SetValue(e, SET_DEVICE_VALUE);
                  }}
                />
              </div>
              <div className="inpt-grp col-md-4">
                <LabelInput case={1}
                  label={"Donated "} value={device.donated} prop="donated" type="text" req={1} case={1}
                  onChange={(e) => {
                    this.props.SetValue(e, SET_DEVICE_VALUE);
                  }}
                />
              </div>
              <div className="inpt-grp col-md-4">
                <LabelInput case={1}
                  label={"Size "} value={device.size} prop="size" type="text" req={1} case={1}
                  onChange={(e) => {
                    this.props.SetValue(e, SET_DEVICE_VALUE);
                  }}
                />
              </div>
            </div>   
          </div>

        </div>
        
        <Collapse isOpen={(device.type == "desktop" || device.type == "laptop")?true:false}>
          <div className="custom-container">

            <div className="custom-container-title">
              Desktop/Laptop Specification
            </div>

            <div className="custom-container-body">
              <div className="row">

                <div className="inpt-grp col-md-6">
                  <LabelInput case={1}
                    label={"MAC Address"} value={this.props.GetSafe(() => {return device.specs.mac}, "")} prop="specs.mac" type="text" req={1} case={1}
                    onChange={(e) => {
                      this.props.SetValue(e, SET_DEVICE_VALUE);
                    }}
                  />
                </div>

                <div className="inpt-grp col-md-6">
                  <LabelInput case={1}
                    label={"IP Address"} value={this.props.GetSafe(() => {return device.specs.ip}, "")} prop="specs.ip" type="text" req={1} case={1}
                    onChange={(e) => {
                      this.props.SetValue(e, SET_DEVICE_VALUE);
                    }}
                  />
                </div>
              </div>

              <div className="custom-container">
                <div className="custom-container-title">
                  Hardware Specification
                </div>  

                <div className="custom-container-body">
                  <div className="row">
                    <div className="inpt-grp col-md-4">
                      <LabelInput case={1}
                        label={"Processor "} value={this.props.GetSafe(()=>{return device.specs.hWare.processor}, "")} prop="specs.hWare.processor" type="text" req={1} case={1}
                        onChange={(e) => {
                          this.props.SetValue(e, SET_DEVICE_VALUE);
                        }}
                      />
                    </div>
                    <div className="inpt-grp col-md-4">
                      <LabelInput case={1}
                        label={"HDD"} value={this.props.GetSafe(()=>{return device.specs.hWare.hdd}, "")} prop="specs.hWare.hdd" type="text" req={1} case={1}
                        onChange={(e) => {
                          this.props.SetValue(e, SET_DEVICE_VALUE);
                        }}
                      />
                    </div>
                    <div className="inpt-grp col-md-4">
                      <LabelInput case={1}
                        label={"RAM "} value={this.props.GetSafe(()=>{return device.specs.hWare.ram}, "")} prop="specs.hWare.ram" type="text" req={1} case={1}
                        onChange={(e) => {
                          this.props.SetValue(e, SET_DEVICE_VALUE);
                        }}
                      />
                    </div>
                  </div>  
                </div>  

              </div>  
 
              <div className="custom-container">
                <div className="custom-container-title">
                  Software Specification
                </div>  

                <div className="custom-container-body">

                  <div className="row">
                    <div className="inpt-grp col-md-8">                  
                      <LabelInput
                        label={"Operating System"} value={this.props.GetSafe(()=>{return device.specs.sWare.os.name}, "")} prop="specs.sWare.os.name" type="text" req={1} case={1}
                        onChange={(e) => {
                          this.props.SetValue(e, SET_DEVICE_VALUE);
                        }}
                      />
                    </div>  
                    <div className="inpt-grp col-md-4">                  
                      <LabelInput case={1}
                        label={"Licensed"} value={this.props.GetSafe(()=>{return device.specs.sWare.os.isLicensed}, "")} prop="specs.sWare.os.isLicensed"  type="select" req={1} case={1}
                        options={[
                          {text: "True", value: 1}, {text: "False", value: 0}
                        ]}
                        onChange={(e) => {
                          this.props.SetValue(e, SET_DEVICE_VALUE);
                        }}
                      />
                    </div>  
                  </div>  

                  <div className="row">
                    <div className="inpt-grp col-md-8">                  
                      <LabelInput
                        label={"Office Application"} value={this.props.GetSafe(()=>{return device.specs.sWare.msOffice.name}, "")} prop="specs.sWare.msOffice.name" type="text" req={1} case={5}
                        onChange={(e) => {
                          this.props.SetValue(e, SET_DEVICE_VALUE);
                        }}
                      />
                    </div>  
                    <div className="inpt-grp col-md-4">                  
                      <LabelInput case={1}
                        label={"Licensed"} value={this.props.GetSafe(()=>{return device.specs.sWare.msOffice.isLicensed}, "")} prop="specs.sWare.msOffice.isLicensed"  type="select" req={1} case={1}
                        options={[
                          {text: "True", value: 1}, {text: "False", value: 0}
                        ]}
                        onChange={(e) => {
                          this.props.SetValue(e, SET_DEVICE_VALUE);
                        }}
                      />
                    </div>  
                  </div>  

                  <div className="row">
                    <div className="inpt-grp col-md-8">                  
                      <LabelInput
                        label={"Antivirus"} value={this.props.GetSafe(()=>{return device.specs.sWare.antiVirus.name}, "")} prop="specs.sWare.antiVirus.name" type="text" req={1} case={5}
                        onChange={(e) => {
                          this.props.SetValue(e, SET_DEVICE_VALUE);
                        }}
                      />
                    </div>  
                    <div className="inpt-grp col-md-4">                  
                      <LabelInput case={1}
                        label={"Licensed"} value={this.props.GetSafe(()=>{return device.specs.sWare.antiVirus.isLicensed}, "")} prop="specs.sWare.antiVirus.isLicensed"  type="select" req={1} case={1}
                        options={[
                          {text: "True", value: 1}, {text: "False", value: 0}
                        ]}
                        onChange={(e) => {
                          this.props.SetValue(e, SET_DEVICE_VALUE);
                        }}
                      />
                    </div>  
                  </div>  
                </div>  

              </div>  

            </div>

          </div>
        </Collapse>

        <div className="custom-container">

          <div className="custom-container-title">
            User Info
          </div>

          <div className="custom-container-body">
            <Search2
              onChange={(val)=>{
                this.setState({currentSearch: 3});
              }}
              ClearText={
                () => {
                  this.props.SetValue2("office", {...deviceDefault.office}, SET_DEVICE_VALUE);
                }
              }                            
              value={
                this.props.GetSafe(() => {
                  return (device.office.hasOwnProperty("division"))
                    ?(device.office.division + " - " + device.office.section)
                    :""
                }, device.text.division + " - " + device.text.section)
              }
              title={<span>Select Office: Division - Section<span className="astrsk"> *</span></span>}
              options={[{value: "office", text: "Office"}]}
              displaySelectOptions={false}
              select={["division", "section", "code"]}
              api="office/get"
              reducer={SET_REACT_SELECT_RECORD_OPTIONS_NEW}
              suggest={(this.state.currentSearch == 3)?{
                display: (data, callback) => {  
                  return (
                    <div className="row" onClick={() => 
                      {

                        callback(data.division + " - " + data.section);
                        this.props.SetUserDeviceEntry(data, "office");

                      }}>
                      <div className="col-md-12"><span>{data.division + " - " + data.section}</span></div>
                    </div>
                  )
                }
              }:false}
            /><br/>

            <Search2
              onChange={(val)=>{
                this.setState({currentSearch: 1});
              }}
              ClearText={
                () => {
                  this.props.SetValue2("userPAR", {...deviceDefault.userPAR}, SET_DEVICE_VALUE);
                }
              }
              value={
                this.props.GetSafe(() => {
                  return this.props.ArrangeName(device.userPAR.name)
                }, device.text.userPAR)
              }
              title={<span>Select PAR User<span className="astrsk"> *</span></span>}
              options={[{value: "name", text: "Name"}]}
              displaySelectOptions={false}
              select={["userID", "name"]}
              api="user/get"
              reducer={SET_REACT_SELECT_RECORD_OPTIONS_NEW}
              suggest={(this.state.currentSearch == 1)?{
                display: (data, callback) => {  
                  return (
                    <div className="row" onClick={() => 
                      {

                        callback(this.props.ArrangeName(data.name));
                        this.props.SetUserDeviceEntry(data, "userPAR");

                      }}>
                      <div className="col-md-7"><span>{this.props.ArrangeName(data.name)}</span></div>
                      <div className="col-md-5"><span>{data.userID}</span></div>
                    </div>
                  )
                }
              }:false}
            /><br/>

            <Search2
              onChange={(val)=>{
                this.setState({currentSearch: 2});
              }}
              ClearText={
                () => {
                  this.props.SetValue2("userCO", {...deviceDefault.userCO}, SET_DEVICE_VALUE);
                }
              }
              value={
                this.props.GetSafe(() => {
                  return this.props.ArrangeName(device.userCO.name)
                }, device.text.userCO)
              }
              title={<span>Select CO User<span className="astrsk"> *</span></span>}
              options={[{value: "name", text: "Name"}]}
              displaySelectOptions={false}
              select={["userID", "name"]}
              api="user/get"
              reducer={SET_REACT_SELECT_RECORD_OPTIONS_NEW}
              suggest={(this.state.currentSearch == 2)?{
                display: (data, callback) => {  
                  return (
                    <div className="row" onClick={() => 
                      {

                        callback(this.props.ArrangeName(data.name));
                        this.props.SetUserDeviceEntry(data, "userCO");

                      }}>
                      <div className="col-md-7"><span>{this.props.ArrangeName(data.name)}</span></div>
                      <div className="col-md-5"><span>{data.userID}</span></div>
                    </div>
                  )
                }
              }:false}
            />

          </div>

        </div>

      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  device: state.device
});

export default connect(mapStateToProps, {
  GetDate,
  SetValue,
  SetValue2,
  SetUserDeviceEntry,
  ArrangeName,
  GetSafe,
})(DeviceForm);
