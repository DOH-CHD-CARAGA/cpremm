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
} from '../../../actions/helpers/displayAction';

import {
  SetUserRecordEntry,
} from '../../../actions/recordAction';

import {
  SET_RECORD_VALUE,
  SET_REACT_SELECT_RECORD_OPTIONS,
} from '../../../actions/types';

class Table2 extends React.Component {
  
  constructor (props) {
    super(props);

    this.state = {
      route: "",
      currentSearch: 1,
    }
  }


  render () {

    var { record, recordDefault } = this.props.record;
    var { hWare } = record.specs;

    console.log(record);
    console.log(hWare);

    var hWareTemp = {
      cpu: hWare.cpu || "",
      motherBoord: hWare.motherBoord || "",
      processor: hWare.processor || "",
      memoryCard: hWare.memoryCard || "",
      hdd: hWare.hdd || "",
      monitor: {
        brand: hWare.monitor.brand || "",
        size: hWare.monitor.size || "",
        serial: hWare.monitor.serial || "",
        propertyCode: hWare.monitor.propertyCode || "",
        userPAR:(hWare.hasOwnProperty("monitor"))
          ?(hWare.monitor.hasOwnProperty("userPAR"))
            ?(typeof(hWare.monitor.userPAR) == "string")        
              ?hWare.monitor.userPAR
              :(hWare.monitor.userPAR.name.first != "")
                ?this.props.ArrangeName(hWare.monitor.userPAR.name)
                :""
            :""
          :""
      ,
      },
      keyboard: {
        brand: (hWare.hasOwnProperty("keyboard"))?hWare.keyboard.brand:"",
        serial: (hWare.hasOwnProperty("keyboard"))?hWare.keyboard.serial:"",
      },
      mouse: {
        brand: (hWare.hasOwnProperty("mouse"))?hWare.mouse.brand:"",
        serial: (hWare.hasOwnProperty("mouse"))?hWare.mouse.serial:"",
      },
      avr: {
        number: (hWare.hasOwnProperty("avr"))?hWare.avr.number:"",
        brand: (hWare.hasOwnProperty("avr"))?hWare.avr.brand:"",
        serial: (hWare.hasOwnProperty("avr"))?hWare.avr.serial:"",
        propertyCode: (hWare.hasOwnProperty("avr"))?hWare.avr.propertyCode:"", 
      },
      ups: {
        number: (hWare.hasOwnProperty("ups"))?hWare.ups.number:"",
        brand: (hWare.hasOwnProperty("ups"))?hWare.ups.brand:"",
        serial: (hWare.hasOwnProperty("ups"))?hWare.ups.serial:"",
        propertyCode: (hWare.hasOwnProperty("ups"))?hWare.ups.propertyCode:"" 
      },
      scanner: {
        number: (hWare.hasOwnProperty("scanner"))?hWare.scanner.number:"",
        brand: (hWare.hasOwnProperty("scanner"))?hWare.scanner.brand:"",
        serial: (hWare.hasOwnProperty("scanner"))?hWare.scanner.serial:"",
        propertyCode: (hWare.hasOwnProperty("scanner"))?hWare.scanner.propertyCode:"",
      },
      printer: {
        number: (hWare.hasOwnProperty("printer"))?hWare.printer.number:"",
        built: (hWare.hasOwnProperty("printer"))?hWare.printer.built:"",
        name: (hWare.hasOwnProperty("printer"))?hWare.printer.name:"",
        code: (hWare.hasOwnProperty("printer"))?hWare.printer.code:"",
        serial: (hWare.hasOwnProperty("printer"))?hWare.printer.serial:"",
        user:(hWare.hasOwnProperty("printer"))
          ?(hWare.printer.hasOwnProperty("user"))
            ?(typeof(hWare.printer.user) == "string")        
              ?hWare.printer.user
              :(hWare.printer.user.name.first != "")
                ?this.props.ArrangeName(hWare.printer.user.name)
                :""
            :""
          :""
      }
    };

    return (
      <div id="record-add-form-2" className="entry-form">
        <Card>
          <CardHeader tag="h4">Description Computer Hardware & Peripherals</CardHeader>
          <CardBody>
            <div className="form-content">
              <div className="row">
                
                <div className="col-md-4">
                  <Card>
                    <CardHeader tag="h6">System Unit</CardHeader>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-12">
                          <LabelInput
                            label={"Mother Board"} value={hWareTemp.motherBoord} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE);
                            }} prop={"specs.hWare.motherBoord"} case={1}
                          />
                          <LabelInput
                            label={"Processor"} value={hWareTemp.cpu} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE);
                            }} prop={"specs.hWare.cpu"} case={1}
                          />
                          <LabelInput
                            label={"Memory Card"} value={hWareTemp.memoryCard} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE);
                            }} prop={"specs.hWare.memoryCard"} case={1}
                          />
                          <div className="row">
                            <div className="col-md-6">
                              <LabelInput
                                label={"Hard Disk"} value={hWareTemp.hdd} type="text" req={1}
                                onChange={(e) => {
                                  this.props.SetValue(e, SET_RECORD_VALUE);
                                }} prop={"specs.hWare.hdd"} case={1}
                              />
                            </div>

                            <div className="col-md-6">
                              <LabelInput
                                label={"RAM"} value={hWareTemp.ram} type="text" req={1}
                                onChange={(e) => {
                                  this.props.SetValue(e, SET_RECORD_VALUE);
                                }} prop={"specs.hWare.ram"} case={1}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                    </CardBody>
                  </Card>  
       
                  <Card>
                    <CardHeader tag="h6">AVR</CardHeader>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-12">
                          <LabelInput
                            label={"Brand"} value={hWareTemp.avr.brand} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE);
                            }} prop={"specs.hWare.avr.brand"} case={1}
                          />
                          <LabelInput
                            label={"Serial"} value={hWareTemp.avr.serial} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE);
                            }} prop={"specs.hWare.avr.serial"} case={1}
                          />
                          <LabelInput
                            label={"Property Code"} value={hWareTemp.avr.propertyCode} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE);
                            }} prop={"specs.hWare.avr.propertyCode"} case={1}
                          />
                        </div>
                      </div>

                    </CardBody>
                  </Card>  
       
                  <Card>
                    <CardHeader tag="h6">UPS</CardHeader>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-12">
                          <LabelInput
                            label={"Brand"} value={hWareTemp.ups.brand} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE);
                            }} prop={"specs.hWare.ups.brand"} case={1}
                          />
                          <LabelInput
                            label={"Serial"} value={hWareTemp.ups.serial} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE);
                            }} prop={"specs.hWare.ups.serial"} case={1}
                          />
                          <LabelInput
                            label={"Property Code"} value={hWareTemp.ups.propertyCode} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE);
                            }} prop={"specs.hWare.ups.propertyCode"} case={1}
                          />
                        </div>
                      </div>

                    </CardBody>
                  </Card>  
     
                </div>

                <div className="col-md-8">

                  <Card>
                    <CardHeader tag="h6">Peripherals</CardHeader>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-6">

                          <Card>
                            <CardHeader tag="h6">Monitor</CardHeader>
                            <CardBody>
                              <div className="row">
                                <div className="col-md-12">
                                  <LabelInput
                                    label={"Brand"} value={hWareTemp.monitor.brand} type="text" req={1}
                                    onChange={(e) => {
                                      this.props.SetValue(e, SET_RECORD_VALUE);
                                    }} prop={"specs.hWare.monitor.brand"} case={1}
                                  />
                                  <LabelInput
                                    label={"Size"} value={hWareTemp.monitor.size} type="text" req={1}
                                    onChange={(e) => {
                                      this.props.SetValue(e, SET_RECORD_VALUE);
                                    }} prop={"specs.hWare.monitor.size"} case={1}
                                  />
                                  <LabelInput
                                    label={"Serial"} value={hWareTemp.monitor.serial} type="text" req={1}
                                    onChange={(e) => {
                                      this.props.SetValue(e, SET_RECORD_VALUE);
                                    }} prop={"specs.hWare.monitor.serial"} case={1}
                                  />
                                  <LabelInput
                                    label={"Property Code"} value={hWareTemp.monitor.propertyCode} type="text" req={1}
                                    onChange={(e) => {
                                      this.props.SetValue(e, SET_RECORD_VALUE);
                                    }} prop={"specs.hWare.monitor.propertyCode"} case={1}
                                  />
                                  <div className="creatable-select-div">
                                    <Search2
                                      onChange={(val)=>{
                                        this.setState({currentSearch: 1});
                                      }}
                                      ClearText={
                                        () => {
                                          this.props.SetValue2("specs.hWare.monitor.userPAR", {...recordDefault.specs.hWare.monitor.userPAR}, SET_RECORD_VALUE);
                                        }
                                      }                                      
                                      value={hWareTemp.monitor.userPAR}
                                      title={<span>PAR<span className="astrsk"> *</span></span>}
                                      options={[{value: "name", text: "Name"}]}
                                      displaySelectOptions={false}
                                      select={["userID", "name"]}
                                      api="user/get"
                                      reducer={SET_REACT_SELECT_RECORD_OPTIONS}
                                      suggest={(this.state.currentSearch == 1)?{
                                        display: (data, callback) => {  
                                          return (
                                            <div className="row" onClick={() => 
                                              {

                                                callback(this.props.ArrangeName(data.name));
                                                this.props.SetUserRecordEntry(data, "specs.hWare.monitor.userPAR");

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

                            </CardBody>
                          </Card>  
                          <Card>
                            <CardHeader tag="h6">Printer</CardHeader>
                            <CardBody>
                              <div className="row">
                                <div className="col-md-12">
                                  <LabelInput
                                    label={"Built"} value={hWareTemp.printer.built} type="text" req={1}
                                    onChange={(e) => {
                                      this.props.SetValue(e, SET_RECORD_VALUE);
                                    }} prop={"specs.hWare.printer.built"} case={1}
                                  />
                                  <LabelInput
                                    label={"Name"} value={hWareTemp.printer.name} type="text" req={1}
                                    onChange={(e) => {
                                      this.props.SetValue(e, SET_RECORD_VALUE);
                                    }} prop={"specs.hWare.printer.name"} case={1}
                                  />
                                  <LabelInput
                                    label={"Code"} value={hWareTemp.printer.code} type="text" req={1}
                                    onChange={(e) => {
                                      this.props.SetValue(e, SET_RECORD_VALUE);
                                    }} prop={"specs.hWare.printer.code"} case={1}
                                  />
                                  <LabelInput
                                    label={"Serial"} value={hWareTemp.printer.serial} type="text" req={1}
                                    onChange={(e) => {
                                      this.props.SetValue(e, SET_RECORD_VALUE);
                                    }} prop={"specs.hWare.printer.serial"} case={1}
                                  />

                                  <div className="creatable-select-div">
                                    <Search2
                                      onChange={(val)=>{
                                        this.setState({currentSearch: 2});
                                      }}
                                      ClearText={
                                        () => {
                                          this.props.SetValue2("specs.hWare.printer.user", {...recordDefault.specs.hWare.printer.user}, SET_RECORD_VALUE);
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
                                      reducer={SET_REACT_SELECT_RECORD_OPTIONS}
                                      suggest={(this.state.currentSearch == 2)?{
                                        display: (data, callback) => {  
                                          return (
                                            <div className="row" onClick={() => 
                                              {

                                                callback(this.props.ArrangeName(data.name));
                                                this.props.SetUserRecordEntry(data, "specs.hWare.printer.user");

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

                            </CardBody>
                          </Card>  
                        </div>

                        <div className="col-md-6">
      
                          <Card>
                            <CardHeader tag="h6">Keyboard</CardHeader>
                            <CardBody>
                              <div className="row">
                                <div className="col-md-12">
                                  <LabelInput
                                    label={"Brand"} value={hWareTemp.keyboard.brand} type="text" req={1}
                                    onChange={(e) => {
                                      this.props.SetValue(e, SET_RECORD_VALUE);
                                    }} prop={"specs.hWare.keyboard.brand"} case={1}
                                  />
                                  <LabelInput
                                    label={"Serial"} value={hWareTemp.keyboard.serial} type="text" req={1}
                                    onChange={(e) => {
                                      this.props.SetValue(e, SET_RECORD_VALUE);
                                    }} prop={"specs.hWare.keyboard.serial"} case={1}
                                  />
                                </div>
                              </div>

                            </CardBody>
                          </Card>  

                          <Card>
                            <CardHeader tag="h6">Mouse</CardHeader>
                            <CardBody>
                              <div className="row">
                                <div className="col-md-12">
                                  <LabelInput
                                    label={"Brand"} value={hWareTemp.mouse.brand} type="text" req={1}
                                    onChange={(e) => {
                                      this.props.SetValue(e, SET_RECORD_VALUE);
                                    }} prop={"specs.hWare.mouse.brand"} case={1}
                                  />
                                  <LabelInput
                                    label={"Serial"} value={hWareTemp.mouse.serial} type="text" req={1}
                                    onChange={(e) => {
                                      this.props.SetValue(e, SET_RECORD_VALUE);
                                    }} prop={"specs.hWare.mouse.serial"} case={1}
                                  />
                                </div>
                              </div>

                            </CardBody>
                          </Card>  

                          <Card>
                            <CardHeader tag="h6">Scanner</CardHeader>
                            <CardBody>
                              <div className="row">
                                <div className="col-md-12">
                                  <LabelInput
                                    label={"Brand"} value={hWareTemp.scanner.brand} type="text" req={1}
                                    onChange={(e) => {
                                      this.props.SetValue(e, SET_RECORD_VALUE);
                                    }} prop={"specs.hWare.scanner.brand"} case={1}
                                  />
                                  <LabelInput
                                    label={"Serial"} value={hWareTemp.scanner.serial} type="text" req={1}
                                    onChange={(e) => {
                                      this.props.SetValue(e, SET_RECORD_VALUE);
                                    }} prop={"specs.hWare.scanner.serial"} case={1}
                                  />
                                  <LabelInput
                                    label={"Property Code"} value={hWareTemp.scanner.propertyCode} type="text" req={1}
                                    onChange={(e) => {
                                      this.props.SetValue(e, SET_RECORD_VALUE);
                                    }} prop={"specs.hWare.scanner.propertyCode"} case={1}
                                  />
                                </div>
                              </div>

                            </CardBody>
                          </Card>  
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
  record: state.record
});

export default connect(mapStateToProps, {
  GetDate,
  SetValue,
  SetValue2,
  GetList,
  ArrangeName,
  SetUserRecordEntry,
})(Table2);
