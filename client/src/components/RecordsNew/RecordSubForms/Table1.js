import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  CardBody,
  CustomInput,
} from 'reactstrap';
import CreatableSelect from 'react-select/creatable';
import { FaPlus, FaTimes } from 'react-icons/fa';
import LabelInput from '../../helpers/LabelInput';
import Search2 from '../../helpers/Search2';
import Search from '../../helpers/Search';

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

class Table1 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      route: "",
      currentSearch: 1,
      desktopKey: ""
    }
  }


  render() {

    var { record, recordDefault } = this.props.recordNew;
    var { deviceDefault } = this.props.device;
    var desktop = record.devices.desktop;
    desktop = (!desktop) ? { ...deviceDefault } : desktop;

    return (
      <div id="record-add-form-1" className="entry-form">
        <Card>
          <CardHeader tag="h5">Primary Details</CardHeader>
          <CardBody>
            <div className="form-content">
              <div className="row">

                <div className="col-md-4">
                  <Card>
                    <CardHeader tag="h6">User</CardHeader>
                    <CardBody>
                      <div className="creatable-select-div">
                        <Search2
                          onChange={(val) => {
                            this.setState({ currentSearch: 1 });
                          }}
                          ClearText={
                            () => {
                              this.props.SetValue2("endUser.userPAR", { ...recordDefault.endUser.userPAR }, SET_RECORD_VALUE_NEW);
                            }
                          }
                          // value={((record.endUser.userPAR) && (record.endUser.userPAR.hasOwnProperty("name")) && record.endUser.userPAR.name.first != "") ? this.props.ArrangeName(record.endUser.userPAR.name) : record.text.userPAR}
                          value={this.props.GetSafe(() => {
                            return this.props.ArrangeName(record.endUser.userPAR.name)
                          }, record.text.userPAR)}
                          title={<span>PAR<span className="astrsk"> *</span></span>}
                          options={[{ value: "name", text: "Name" }]}
                          displaySelectOptions={false}
                          select={["userID", "name"]}
                          api="user/get"
                          reducer={SET_REACT_SELECT_RECORD_OPTIONS_NEW}
                          suggest={(this.state.currentSearch == 1) ? {
                            display: (data, callback) => {
                              return (
                                <div className="row" onClick={() => {

                                  callback(this.props.ArrangeName(data.name));
                                  this.props.SetUserRecordEntry(data, "endUser.userPAR");

                                }}>
                                  <div className="col-md-7"><span>{this.props.ArrangeName(data.name)}</span></div>
                                  <div className="col-md-5"><span>{data.userID}</span></div>
                                </div>
                              )
                            }
                          } : false}
                        />
                      </div>

                      <div className="creatable-select-div">
                        <Search2
                          onChange={(val) => {
                            this.setState({ currentSearch: 2 });
                          }}
                          ClearText={
                            () => {
                              this.props.SetValue2("endUser.userCO", { ...recordDefault.endUser.userCO }, SET_RECORD_VALUE_NEW);
                            }
                          }
                          // 
                          // value={((record.endUser.userCO) && (record.endUser.userCO.hasOwnProperty("name")) && record.endUser.userCO.name.first != "") ? this.props.ArrangeName(record.endUser.userCO.name) : record.text.userCO}
                          value={this.props.GetSafe(() => {
                            return this.props.ArrangeName(record.endUser.userCO.name)
                          }, record.text.userCO)}
                          title={<span>CO<span className="astrsk"> *</span></span>}
                          options={[{ value: "name", text: "Name" }]}
                          displaySelectOptions={false}
                          select={["userID", "name"]}
                          api="user/get"
                          reducer={SET_REACT_SELECT_RECORD_OPTIONS_NEW}
                          suggest={(this.state.currentSearch == 2) ? {
                            display: (data, callback) => {
                              return (
                                <div className="row" onClick={() => {

                                  callback(this.props.ArrangeName(data.name));
                                  this.props.SetUserRecordEntry(data, "endUser.userCO");

                                }}>
                                  <div className="col-md-7"><span>{this.props.ArrangeName(data.name)}</span></div>
                                  <div className="col-md-5"><span>{data.userID}</span></div>
                                </div>
                              )
                            }
                          } : false}
                        />
                      </div>

                    </CardBody>
                  </Card>
                  <Card>
                    <CardHeader tag="h6">Office</CardHeader>
                    <CardBody>
                      <div className="creatable-select-div">
                        <Search2
                          onChange={(val) => {
                            this.setState({ currentSearch: 3 });
                          }}
                          ClearText={
                            () => {
                              this.props.SetValue2("office", { ...recordDefault.office }, SET_RECORD_VALUE_NEW);
                            }
                          }
                          value={
                            (record.office.hasOwnProperty("division"))
                              ? (record.office.division + " - " + record.office.section)
                              :""
                              // : record.text.division + " - " + record.text.section
                          }
                          title={<span>Division - Section<span className="astrsk"> *</span></span>}
                          options={[{ value: "office", text: "Office" }]}
                          displaySelectOptions={false}
                          select={["division", "section", "code"]}
                          api="office/get"
                          reducer={SET_REACT_SELECT_RECORD_OPTIONS_NEW}
                          suggest={(this.state.currentSearch == 3) ? {
                            display: (data, callback) => {
                              return (
                                <div className="row" onClick={() => {
                                  callback(data.division + " - " + data.section);
                                  this.props.SetUserRecordEntry(data, "office");

                                }}>
                                  <div className="col-md-12"><span>{data.division + " - " + data.section}</span></div>
                                </div>
                              )
                            }
                          } : false}
                        />
                      </div>

                    </CardBody>
                  </Card>
                </div>

                <div className="col-md-8 row">
                  <div className="col-md-12">
                    <Card>
                      <CardHeader tag="h6" className="">
                        <div className="row form-card-header">
                          <div className="col-md-4" >
                            Desktop Computer
                          </div>
                          <div className="col-md-8 card-header-search-bar">

                            <Search2
                              onChange={(val) => {
                                this.setState({
                                  currentSearch: 4,
                                  desktopKey: val,
                                });
                              }}
                              value={this.state.desktopKey}

                              title={"Search Desktop Unit"}
                              options={[
                                { value: "ps", text: "----" },
                              ]}
                              filter={{ type: "desktop" }}
                              displaySelectOptions={false}
                              select={["serial", "propertyCode", "brand", "type"]}
                              api="device/get"
                              reducer={SET_REACT_SELECT_RECORD_OPTIONS_NEW}
                              minChar={3}
                              suggest={(this.state.currentSearch == 4) ? {
                                display: (data, callback) => {
                                  return (
                                    <div onClick={() => {
                                      // console.log(data);
                                      // callback(data.division + " - " + data.section);
                                      this.props.SetSelectedDevice(data, "desktop");

                                    }}>
                                      <div style={{ width: "20%" }}><span>{data.brand}</span></div>
                                      <div style={{ width: "30%" }}><span>{data.propertyCode}</span></div>
                                      <div style={{ width: "50%" }}><span>{data.serial}</span></div>
                                    </div>
                                  )
                                }
                              } : false}
                            />

                          </div>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <div className="row">
                          <div className="col-md-12">
                            <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch"
                              label={(desktop.hasOwnProperty("status") && desktop.status === 1) ? "In-Use" : "Waste"}
                              checked={(desktop.hasOwnProperty("status") && desktop.status === 1) ? true : false}
                              onChange={(e) => {
                                this.props.SetValue2("devices.desktop.status", (e.target.checked) ? 1 : 0, SET_RECORD_VALUE_NEW);
                              }}
                            />
                          </div>

                          <div className="col-md-6">
                            <LabelInput
                              label={"Property Code"} value={this.props.GetSafe(() => { return desktop.propertyCode }, "")} type="text" req={1}
                              onChange={(e) => {
                                this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                              }} prop={"devices.desktop.propertyCode"} case={1}
                            />
                            <LabelInput
                              label={"Serial"} value={this.props.GetSafe(() => { return desktop.serial }, "")} type="text" req={1}
                              onChange={(e) => {
                                this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                              }} prop={"devices.desktop.serial"} case={1}
                            />
                            <LabelInput case={1}
                              label={"Unit Type "} value={this.props.GetSafe(() => { return desktop.type }, "")}type="select" req={1}
                              options={[
                                { text: "--- Select Unit Type ---", value: "" },
                                { text: "Desktop", value: "desktop" }
                              ]}
                              onChange={(e) => {
                                this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                              }} prop={"devices.desktop.type"} 
                            />
                            <div className="row">
                              <div className="col-md-6">
                                <LabelInput
                                  label={"Brand"} value={this.props.GetSafe(() => { return desktop.brand }, "")} type="text" req={1}
                                  onChange={(e) => {
                                    this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                                  }} prop={"devices.desktop.brand"} case={1}
                                />
                              </div>
                              <div className="col-md-6">
                                <LabelInput
                                  label={"Model"} value={this.props.GetSafe(() => { return desktop.model }, "")} type="text" req={1}
                                  onChange={(e) => {
                                    this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                                  }} prop={"devices.desktop.model"} case={1}
                                />
                              </div>

                            </div>

                            <LabelInput
                              label={"MAC Address"} value={this.props.GetSafe(() => { return desktop.specs.mac }, "")} type="text" req={1}
                              onChange={(e) => {
                                this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                              }} prop={"devices.desktop.specs.mac"} case={1}
                            />
                          </div>

                          <div className="col-md-6">
                            <LabelInput
                              label={"Specs"} value={this.props.GetSafe(() => { return desktop.specs.hWare.cpu }, "")} type="text" req={1}
                              onChange={(e) => {
                                this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                              }} prop={"devices.desktop.specs.hWare.cpu"} case={1}
                            />
                            <LabelInput
                              label={"Date Acquired"} value={this.props.GetSafe(() => { return (desktop.dateAcquired) ? (this.props.GetDate(new Date(desktop.dateAcquired))) : "" }, "")} type="date" req={1}
                              onChange={(e) => {
                                this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                              }} prop={"devices.desktop.dateAcquired"} case={1}
                            />
                            <LabelInput
                              label={"Purchased"} value={this.props.GetSafe(() => { return desktop.cost }, "")} type="text" req={1}
                              onChange={(e) => {
                                this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                              }} prop={"devices.desktop.cost"} case={1}
                            />
                            <LabelInput
                              label={"Donated"} value={this.props.GetSafe(() => { return desktop.donated }, "")} type="text" req={1}
                              onChange={(e) => {
                                this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                              }} prop={"devices.desktop.donated"} case={1}
                            />
                            <LabelInput
                              label={"IP Address"} value={this.props.GetSafe(() => { return desktop.specs.ip }, "")} type="text" req={1}
                              onChange={(e) => {
                                this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                              }} prop={"devices.desktop.specs.ip"} case={1}
                            />
                          </div>
                        </div>

                      </CardBody>
                    </Card>

                  </div>

                  <div className="col-md-12">
                    <Card>
                      <CardHeader tag="h6">System Unit</CardHeader>
                      <CardBody>
                        <div className="row">
                          <div className="col-md-12">
                            <LabelInput
                              label={"Mother Board"} value={this.props.GetSafe(() => { return desktop.specs.hWare.motherBoord }, "")} type="text" req={1}
                              onChange={(e) => {
                                this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                              }} prop={"devices.desktop.specs.hWare.motherBoord"} case={1}
                            />
                            <LabelInput
                              label={"Processor"} value={this.props.GetSafe(() => { return desktop.specs.hWare.cpu }, "")} type="text" req={1}
                              onChange={(e) => {
                                this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                              }} prop={"devices.desktop.specs.hWare.cpu"} case={1}
                            />
                            <LabelInput
                              label={"Memory Card"} value={this.props.GetSafe(() => { return desktop.specs.hWare.memoryCard }, "")} type="text" req={1}
                              onChange={(e) => {
                                this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                              }} prop={"devices.desktop.specs.hWare.memoryCard"} case={1}
                            />
                            <div className="row">
                              <div className="col-md-6">
                                <LabelInput
                                  label={"Hard Disk"} value={this.props.GetSafe(() => { return desktop.specs.hWare.hdd }, "")} type="text" req={1}
                                  onChange={(e) => {
                                    this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                                  }} prop={"devices.desktop.specs.hWare.hdd"} case={1}
                                />
                              </div>

                              <div className="col-md-6">
                                <LabelInput
                                  label={"RAM"} value={this.props.GetSafe(() => { return desktop.specs.hWare.ram }, "")} type="text" req={1}
                                  onChange={(e) => {
                                    this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                                  }} prop={"devices.desktop.specs.hWare.ram"} case={1}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                      </CardBody>
                    </Card>
                  </div>
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
  recordNew: state.recordNew,
  device: state.device,
});

export default connect(mapStateToProps, {
  GetDate,
  SetValue,
  SetValue2,
  GetList,
  ArrangeName,
  SetUserRecordEntry,
  GetSafe,
  SetSelectedDevice,
})(Table1);
