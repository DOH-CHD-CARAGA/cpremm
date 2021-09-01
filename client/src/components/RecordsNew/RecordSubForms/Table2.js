import React from 'react';
import { connect } from 'react-redux';
import { 
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';

import { FaPlus, FaTimes } from 'react-icons/fa';
import LabelInput from '../../helpers/LabelInput';
import Search2 from '../../helpers/Search2';
import {
  GetDate,
} from '../../../actions/helpers/dateAction';

import {
  SetValue,
  SetValue2,
  GetList,
  ArrangeName,
  GetSafe,
} from '../../../actions/helpers/displayAction';

import {
  SetUserRecordEntry,
  SetSelectedDevice,
} from '../../../actions/recordNewAction';

import {
  SET_RECORD_VALUE_NEW,
  SET_REACT_SELECT_RECORD_OPTIONS_NEW,
} from '../../../actions/types';

class Table2 extends React.Component {
  
  constructor (props) {
    super(props);

    this.state = {
      route: "",
      currentSearch: 1,
      searchKey: {}
    }
  }


  render () {

    var { record, recordDefault } = this.props.recordNew;
    var { desktop, printer, scanner, monitor, avr, ups } = record.devices;

    console.log(record);

    var hWareTemp = {

      monitor: {
        brand: this.props.GetSafe(()=>{return monitor.brand}, ""),
        size: this.props.GetSafe(()=>{return monitor.size}, ""),
        serial: this.props.GetSafe(()=>{return monitor.serial}, ""),
        propertyCode: this.props.GetSafe(()=>{return monitor.propertyCode}, ""),
        userPAR: ""
      ,
      },
      keyboard: {
        brand: "",
        serial: "",
      },
      mouse: {
        brand: "",
        serial: "",
      },
      avr: {
        model: this.props.GetSafe(()=>{return avr.model}, ""),
        brand: this.props.GetSafe(()=>{return avr.brand}, ""),
        serial: this.props.GetSafe(()=>{return avr.serial}, ""),
        propertyCode: this.props.GetSafe(()=>{return avr.propertyCode}, ""), 
      },
      ups: {
        model: this.props.GetSafe(()=>{return ups.model}, ""),
        brand: this.props.GetSafe(()=>{return ups.brand}, ""),
        serial: this.props.GetSafe(()=>{return ups.serial}, ""),
        propertyCode: this.props.GetSafe(()=>{return ups.propertyCode}, ""), 
      },
      scanner: {
        model: this.props.GetSafe(()=>{return scanner.model}, ""),
        brand: this.props.GetSafe(()=>{return scanner.brand}, ""),
        serial: this.props.GetSafe(()=>{return scanner.serial}, ""),
        propertyCode: this.props.GetSafe(()=>{return scanner.propertyCode}, ""),
      },
      printer: {
        brand: this.props.GetSafe(()=>{return printer.brand}, ""),
        model: this.props.GetSafe(()=>{return printer.model}, ""),
        propertyCode: this.props.GetSafe(()=>{return printer.propertyCode}, ""),
        serial: this.props.GetSafe(()=>{return printer.serial}, ""),
        user: "",
      }
    };

    return (
      <div id="record-add-form-2" className="entry-form">
        <Card>
          <CardHeader tag="h4">Description Computer Hardware & Peripherals</CardHeader>
          <CardBody>
            <div className="form-content">
              <div className="row">
                
                <div className="col-md-6">
                  <Card>
                    <CardHeader tag="h6">
                      <div className="row form-card-header">
                        <div className="col-md-4" >
                          Monitor
                        </div>
                        <div className="col-md-8 card-header-search-bar">
                          
                          <Search2
                            onChange={(val)=>{
                              this.setState({
                                currentSearch: 1,
                                searchKey: {
                                  ...this.state.searchKey,
                                  desktop: val
                                },
                              });
                            }}
                            value={this.state.searchKey.desktop}
                            
                            title={"Search Monitor"}
                            options={[
                              {value: "ps", text: "----"},
                            ]}
                            filter={{type: "monitor"}}
                            displaySelectOptions={false}
                            select={["serial", "propertyCode", "brand", "type"]}
                            api="device/get"
                            reducer={SET_REACT_SELECT_RECORD_OPTIONS_NEW}
                            minChar={3}
                            suggest={(this.state.currentSearch == 1)?{
                              display: (data, callback) => {  
                                return (
                                  <div className="row" onClick={() => 
                                    {
                                      // console.log(data);
                                      // callback(data.division + " - " + data.section);
                                      this.props.SetSelectedDevice(data, "monitor");

                                    }}>
                                    <div className="col-md=6"><span>{data.brand}</span></div>
                                    <div className="col-md=6"><span>{data.propertyCode}</span></div>
                                    <div className="col-md=12"><span>{data.serial}</span></div>
                                  </div>
                                )
                              }
                            }:false}
                          />

                        </div>                          

                      </div>
                    </CardHeader>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-12">
                          <LabelInput
                            label={"Brand"} value={hWareTemp.monitor.brand} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.monitor.brand"} case={1}
                          />
                          <div className="row">
                            <div className="col-md-6">
                              <LabelInput
                                label={"Model"} value={hWareTemp.monitor.brand} type="text" req={1}
                                onChange={(e) => {
                                  this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                                }} prop={"devices.monitor.model"} case={1}
                              />
                            </div>

                            <div className="col-md-6">
                              <LabelInput
                                label={"Size"} value={hWareTemp.monitor.size} type="text" req={1}
                                onChange={(e) => {
                                  this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                                }} prop={"devices.monitor.size"} case={1}
                              />
                            </div>
                          </div>
                          <LabelInput
                            label={"Serial"} value={hWareTemp.monitor.serial} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.monitor.serial"} case={1}
                          />
                          <LabelInput
                            label={"Property Code"} value={hWareTemp.monitor.propertyCode} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.monitor.propertyCode"} case={1}
                          />
{/*                           
                          <div className="creatable-select-div">
                            <Search2
                              onChange={(val)=>{
                                this.setState({currentSearch: 1});
                              }}
                              ClearText={
                                () => {
                                  this.props.SetValue2("devices.monitor.userPAR", {...recordDefault.devices.monitor.userPAR}, SET_RECORD_VALUE_NEW);
                                }
                              }                                      
                              value={hWareTemp.monitor.userPAR}
                              title={<span>PAR<span className="astrsk"> *</span></span>}
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
                                        this.props.SetUserRecordEntry(data, "devices.monitor.userPAR");

                                      }}>
                                      <div className="col-md-7"><span>{this.props.ArrangeName(data.name)}</span></div>
                                      <div className="col-md-5"><span>{data.userID}</span></div>
                                    </div>
                                  )
                                }
                              }:false}
                            />
                            
                          </div>
 */}
                        </div>
                      </div>
                    </CardBody>
                  </Card>                    
                </div>

                <div className="col-md-3">
                  <Card>
                    <CardHeader tag="h6">Keyboard</CardHeader>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-12">
                          <LabelInput
                            label={"Brand"} value={hWareTemp.keyboard.brand} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.keyboard.brand"} case={1}
                          />
                          <LabelInput
                            label={"Serial"} value={hWareTemp.keyboard.serial} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.keyboard.serial"} case={1}
                          />
                        </div>
                      </div>

                    </CardBody>
                  </Card>  
                </div>

                <div className="col-md-3">
                  <Card>
                    <CardHeader tag="h6">Mouse</CardHeader>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-12">
                          <LabelInput
                            label={"Brand"} value={hWareTemp.mouse.brand} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.mouse.brand"} case={1}
                          />
                          <LabelInput
                            label={"Serial"} value={hWareTemp.mouse.serial} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.mouse.serial"} case={1}
                          />
                        </div>
                      </div>

                    </CardBody>
                  </Card>  
                </div>

                <div className="col-md-6">
                  <Card>
                    <CardHeader tag="h6">
                      <div className="row form-card-header">
                        
                        <div className="col-md-4" >
                          Printer
                        </div>
                        <div className="col-md-8 card-header-search-bar">
                          
                          <Search2
                            onChange={(val)=>{
                              this.setState({
                                currentSearch: 2,
                                searchKey: {
                                  ...this.state.searchKey,
                                  printer: val
                                },
                              });
                            }}
                            value={this.state.searchKey.printer}
                            
                            title={"Search Printer"}
                            options={[
                              {value: "ps", text: "----"},
                            ]}
                            filter={{type: "printer"}}
                            displaySelectOptions={false}
                            select={["serial", "propertyCode", "brand", "type"]}
                            api="device/get"
                            reducer={SET_REACT_SELECT_RECORD_OPTIONS_NEW}
                            minChar={3}
                            suggest={(this.state.currentSearch == 2)?{
                              display: (data, callback) => {  
                                return (
                                  <div className="row" onClick={() => 
                                    {
                                      // console.log(data);
                                      // callback(data.division + " - " + data.section);
                                      this.props.SetSelectedDevice(data, "printer");

                                    }}>
                                    <div className="col-md=6"><span>{data.brand}</span></div>
                                    <div className="col-md=6"><span>{data.propertyCode}</span></div>
                                    <div className="col-md=12"><span>{data.serial}</span></div>
                                  </div>
                                )
                              }
                            }:false}
                          />

                        </div>                          
                      </div>                          

                    </CardHeader>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-12">
                          <LabelInput
                            label={"Brand"} value={hWareTemp.printer.brand} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.printer.brand"} case={1}
                          />
                          <LabelInput
                            label={"Model"} value={hWareTemp.printer.model} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.printer.model"} case={1}
                          />
                          <LabelInput
                            label={"Serial"} value={hWareTemp.printer.serial} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.printer.serial"} case={1}
                          />
                          <LabelInput
                            label={"Property Code"} value={hWareTemp.printer.propertyCode} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.printer.propertyCode"} case={1}
                          />
                          {/* <div className="creatable-select-div">
                            <Search2
                              onChange={(val)=>{
                                this.setState({currentSearch: 2});
                              }}
                              ClearText={
                                () => {
                                  this.props.SetValue2("devices.printer.user", {...recordDefault.devices.printer.user}, SET_RECORD_VALUE_NEW);
                                }
                              }                                      
                              value={
                                (typeof(hWareTemp.printer.user) == "string")
                                  ?hWareTemp.printer.user
                                  :(hWareTemp.printer.user.name.first != "")
                                    ?this.props.ArrangeName(hWareTemp.printer.user.name)
                                    :""
                              }
                              title={<span>PAR<span className="astrsk"> *</span></span>}
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
                                        this.props.SetUserRecordEntry(data, "devices.printer.user");

                                      }}>
                                      <div className="col-md-7"><span>{this.props.ArrangeName(data.name)}</span></div>
                                      <div className="col-md-5"><span>{data.userID}</span></div>
                                    </div>
                                  )
                                }
                              }:false}
                            />
                            
                          </div> */}

                        </div>
                      </div>
                    </CardBody>
                  </Card>  
                </div>

                <div className="col-md-6">
                  <Card>
                    <CardHeader tag="h6">
                      
                      <div className="row form-card-header">
                        
                        <div className="col-md-4" >
                          Scanner
                        </div>
                        <div className="col-md-8 card-header-search-bar">
                          
                          <Search2
                            onChange={(val)=>{
                              this.setState({
                                currentSearch: 3,
                                searchKey: {
                                  ...this.state.searchKey,
                                  scanner: val
                                },
                              });
                            }}
                            value={this.state.searchKey.scanner}
                            
                            title={"Search Scanner"}
                            options={[
                              {value: "ps", text: "----"},
                            ]}
                            filter={{type: "scanner"}}
                            displaySelectOptions={false}
                            select={["serial", "propertyCode", "brand", "type"]}
                            api="device/get"
                            reducer={SET_REACT_SELECT_RECORD_OPTIONS_NEW}
                            minChar={3}
                            suggest={(this.state.currentSearch == 3)?{
                              display: (data, callback) => {  
                                return (
                                  <div className="row" onClick={() => 
                                    {
                                      // console.log(data);
                                      // callback(data.division + " - " + data.section);
                                      this.props.SetSelectedDevice(data, "scanner");

                                    }}>
                                    <div className="col-md=6"><span>{data.brand}</span></div>
                                    <div className="col-md=6"><span>{data.propertyCode}</span></div>
                                    <div className="col-md=12"><span>{data.serial}</span></div>
                                  </div>
                                )
                              }
                            }:false}
                          />

                        </div>                          
                      </div>                          


                    </CardHeader>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-12">
                          <LabelInput
                            label={"Brand"} value={hWareTemp.scanner.brand} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.scanner.brand"} case={1}
                          />
                          <LabelInput
                            label={"Model"} value={hWareTemp.scanner.model} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.scanner.model"} case={1}
                          />
                          <LabelInput
                            label={"Serial"} value={hWareTemp.scanner.serial} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.scanner.serial"} case={1}
                          />
                          <LabelInput
                            label={"Property Code"} value={hWareTemp.scanner.propertyCode} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.scanner.propertyCode"} case={1}
                          />
                        </div>
                      </div>

                    </CardBody>
                  </Card>  
                </div>


                <div className="col-md-6">
                  <Card>
                    <CardHeader tag="h6">
                      <div className="row form-card-header">
                        
                        <div className="col-md-4" >
                          AVR
                        </div>
                        <div className="col-md-8 card-header-search-bar">
                          
                          <Search2
                            onChange={(val)=>{
                              this.setState({
                                currentSearch: 4,
                                searchKey: {
                                  ...this.state.searchKey,
                                  avr: val
                                },
                              });
                            }}
                            value={this.state.searchKey.avr}

                            title={"Search AVR"}
                            options={[
                              {value: "ps", text: "----"},
                            ]}
                            filter={{type: "avr"}}
                            displaySelectOptions={false}
                            select={["serial", "propertyCode", "brand", "type"]}
                            api="device/get"
                            reducer={SET_REACT_SELECT_RECORD_OPTIONS_NEW}
                            minChar={3}
                            suggest={(this.state.currentSearch == 4)?{
                              display: (data, callback) => {  
                                return (
                                  <div className="row" onClick={() => 
                                    {
                                      // console.log(data);
                                      // callback(data.division + " - " + data.section);
                                      this.props.SetSelectedDevice(data, "avr");

                                    }}>
                                    <div className="col-md=6"><span>{data.brand}</span></div>
                                    <div className="col-md=6"><span>{data.propertyCode}</span></div>
                                    <div className="col-md=12"><span>{data.serial}</span></div>
                                  </div>
                                )
                              }
                            }:false}
                          />

                        </div>                          
                      </div>                          
                      
                    </CardHeader>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-12">
                          <LabelInput
                            label={"Brand"} value={hWareTemp.avr.brand} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.avr.brand"} case={1}
                          />
                          <LabelInput
                            label={"Serial"} value={hWareTemp.avr.serial} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.avr.serial"} case={1}
                          />
                          <LabelInput
                            label={"Property Code"} value={hWareTemp.avr.propertyCode} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.avr.propertyCode"} case={1}
                          />
                        </div>
                      </div>

                    </CardBody>
                  </Card>        
                </div>
                
                <div className="col-md-6">

                  <Card>
                    <CardHeader tag="h6">
                    <div className="row form-card-header">
                        
                        <div className="col-md-4" >
                          UPS
                        </div>
                        <div className="col-md-8 card-header-search-bar">
                          
                          <Search2
                            onChange={(val)=>{
                              this.setState({
                                currentSearch: 5,
                                searchKey: {
                                  ...this.state.searchKey,
                                  ups: val
                                },
                              });
                            }}
                            value={this.state.searchKey.ups}

                            title={"Search UPS"}
                            options={[
                              {value: "ps", text: "----"},
                            ]}
                            filter={{type: "ups"}}
                            displaySelectOptions={false}
                            select={["serial", "propertyCode", "brand", "type"]}
                            api="device/get"
                            reducer={SET_REACT_SELECT_RECORD_OPTIONS_NEW}
                            minChar={3}
                            suggest={(this.state.currentSearch == 5)?{
                              display: (data, callback) => {  
                                return (
                                  <div className="row" onClick={() => 
                                    {
                                      // console.log(data);
                                      // callback(data.division + " - " + data.section);
                                      this.props.SetSelectedDevice(data, "ups");

                                    }}>
                                    <div className="col-md=6"><span>{data.brand}</span></div>
                                    <div className="col-md=6"><span>{data.propertyCode}</span></div>
                                    <div className="col-md=12"><span>{data.serial}</span></div>
                                  </div>
                                )
                              }
                            }:false}
                          />

                        </div>                          
                      </div>                          

                    </CardHeader>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-12">
                          <LabelInput
                            label={"Brand"} value={hWareTemp.ups.brand} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.ups.brand"} case={1}
                          />
                          <LabelInput
                            label={"Serial"} value={hWareTemp.ups.serial} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.ups.serial"} case={1}
                          />
                          <LabelInput
                            label={"Property Code"} value={hWareTemp.ups.propertyCode} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.ups.propertyCode"} case={1}
                          />
                        </div>
                      </div>

                    </CardBody>
                  </Card>  
     
                </div>

              </div>
            </div>

          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recordNew: state.recordNew
});

export default connect(mapStateToProps, {
  GetDate,
  SetValue,
  SetValue2,
  GetList,
  ArrangeName,
  GetSafe,
  SetUserRecordEntry,
  SetSelectedDevice,
})(Table2);
