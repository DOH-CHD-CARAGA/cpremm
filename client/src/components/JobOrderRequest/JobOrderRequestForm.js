import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import LOGO from './page_001.jpg';
import LabelInput from '../helpers/LabelInput';
import Search2 from '../helpers/Search2';

import {
   GetDate,
} from '../../actions/helpers/dateAction';

import {
   SetUserRequestPersonnel,
} from '../../actions/jobOrderRequestAction';

import {
   SetValue,
   SetValue2,
   ArrangeName,
   ArrangeDate,
} from '../../actions/helpers/displayAction';

import {
   SET_JOB_ORDER_REQUEST_VALUE,
   SET_JOB_ORDER_REQUESTS,
   SET_DEVICES,
   SET_DEVICE_VALUE,
} from '../../actions/types';


class JobrOrderRequestForm extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         currentSearch: 1,
      }
   }

   render() {

      const { jobOrderRequest } = this.props.jobOrderRequest;
      console.log(jobOrderRequest);
      return (
         <div id="job-order-request-form">
            <div className="row form-header">
               <div id="doh-logo" className="col-md-2">
                  <img src={LOGO} height="1170" width="827" border="0" usemap="#Map" />
               </div>
               <div className="col-md-10 text">
                  <strong><span>STANDARD OPERATING INSTRUCTIONS</span></strong>
                  <span>Unit: KM-ICT</span>
                  <span>Core Process: Handling Software/Hardware Technical </span>
                  <span>Problems (Maintenance and Repair)</span>
               </div>
            </div>

            <div className="form-content">
               <div className="text-header">
                  <strong><span>ICT JOB ORDER REQUEST FORM</span></strong>
               </div>

               <div className="row">
                  <div className="col-md-7">
                     <LabelInput case={1}
                        label={"Job Order # "} value={jobOrderRequest.jobOrderRequestID} prop="jobOrderRequestID" type="text" case={1}
                        onChange={(e) => {
                           this.props.SetValue(e, SET_JOB_ORDER_REQUEST_VALUE);
                        }}
                     />
                  </div>

                  <div className="col-md-5">
                     <LabelInput case={1}
                        label={"Date "} value={this.props.GetDate((jobOrderRequest.requestDate == "")?new Date():new Date(jobOrderRequest.requestDate))} prop="requestDate" type="date"
                        onChange={(e) => {
                           this.props.SetValue(e, SET_JOB_ORDER_REQUEST_VALUE);
                        }}
                     />
                  </div>
               </div>

               <div className="row" id="middle-form">
                  <div className="col-md-5 label">
                     <span>Requesting Personnel:</span>
                  </div>
                  <div className="col-md-7 inpt">
                     <Search2
                        onChange={(val) => {
                           this.setState({ currentSearch: 1 });
                        }}
                        ClearText={
                           () => {
                              var temp = jobOrderRequest.requestingPersonnel.id;
                              this.props.SetValue2("requestingPersonnel", { id: "", name: "", designation: "", divSec: "" }, SET_JOB_ORDER_REQUEST_VALUE);
                              return {
                                 clearAll: (temp != "")?true:false
                              }
                           }
                        }
                        value={jobOrderRequest.requestingPersonnel.name}
                        options={[{ value: "name", text: "Name" }]}
                        displaySelectOptions={false}
                        select={["userID", "name", "designation"]}
                        api="user/get"
                        reducer={SET_JOB_ORDER_REQUESTS}
                        suggest={(this.state.currentSearch == 1) ? {
                           display: (data, callback) => {
                              return (
                                 <div className="row" onClick={() => {

                                    var tempName = this.props.ArrangeName(data.name);

                                    callback(tempName);
                                    this.props.SetUserRequestPersonnel({
                                       ...data,
                                       name: tempName,
                                    });

                                 }}>
                                    <div className="col-md-7"><span>{this.props.ArrangeName(data.name)}</span></div>
                                    <div className="col-md-5"><span>{data.userID}</span></div>
                                 </div>
                              )
                           }
                        } : false}
                     />

                  </div>


                  <div className="col-md-5 label">
                     <span>Designation:</span>
                  </div>
                  <div className="col-md-7 inpt">
                     <LabelInput case={1}
                        value={jobOrderRequest.requestingPersonnel.designation} prop="requestingPersonnel.designation" type="text" dtype={5} case={1}
                        onChange={(e) => {
                           this.props.SetValue(e, SET_JOB_ORDER_REQUEST_VALUE);
                        }} className="uneditable"
                     />
                  </div>


                  <div className="col-md-5 label">
                     <span>Division/Section:</span>
                  </div>
                  <div className="col-md-7 inpt">
                     <LabelInput case={1}
                        value={jobOrderRequest.requestingPersonnel.divSec} prop="requestingPersonnel.divSec" type="text" dtype={5} case={1}
                        onChange={(e) => {
                           this.props.SetValue(e, SET_JOB_ORDER_REQUEST_VALUE);
                        }} className="uneditable"
                     />
                  </div><br />

                  <div className="col-md-5 label">
                     <span>Serial #:</span>
                  </div>
                  <div className="col-md-7 inpt">
                     <Search2
                        onChange={(val) => {
                           this.setState({ currentSearch: 2 });
                        }}
                        ClearText={
                           () => {
                              var temp = jobOrderRequest.device._id;
                              this.props.SetValue2("device", {serial: "", propertyCode: ""}, SET_JOB_ORDER_REQUEST_VALUE);
                              return {
                                 clearAll: (temp != "" && temp != undefined)?true:false
                              }
                           }
                        }
                        value={jobOrderRequest.hasOwnProperty("device")?jobOrderRequest.device.serial:""}
                        options={[{value: "serial", text: "----"}]}
                        displaySelectOptions={false}
                        select={["serial", "propertyCode", "brand", "type"]}
                        api="device/get"
                        reducer={SET_JOB_ORDER_REQUESTS}
                        suggest={(this.state.currentSearch == 2) ? {
                           display: (data, callback) => {
                              return (
                                 <div className="row" onClick={() => {
                                    this.props.SetValue2("device", {...data}, SET_JOB_ORDER_REQUEST_VALUE);
                                    
                                 }}>
                                    <div className="col-md=6"><span>{data.brand}</span></div>
                                    <div className="col-md=6"><span>{data.propertyCode}</span></div>
                                    <div className="col-md=12"><span>{data.serial}</span></div>
                                 </div>
                              )
                           }
                        } : false}
                     />
                  </div>

                  <div className="col-md-5 label">
                     <span>Property #:</span>
                  </div>
                  <div className="col-md-7 inpt">
                     <Search2
                        onChange={(val) => {
                           this.setState({ currentSearch: 3 });
                        }}
                        ClearText={
                           () => {
                              var temp = jobOrderRequest.device._id;
                              this.props.SetValue2("device", {propertyCode: "", serial: ""}, SET_JOB_ORDER_REQUEST_VALUE);
                              return {
                                 clearAll: (temp != "" && temp != undefined)?true:false
                              }
                           }
                        }
                        value={jobOrderRequest.hasOwnProperty("device")?jobOrderRequest.device.propertyCode:""}
                        options={[{value: "propertyCode", text: "----"}]}
                        displaySelectOptions={false}
                        select={["serial", "propertyCode", "brand", "type"]}
                        api="device/get"
                        reducer={SET_JOB_ORDER_REQUESTS}
                        suggest={(this.state.currentSearch == 3) ? {
                           display: (data, callback) => {
                              return (
                                 <div className="row" onClick={() => {
                                    this.props.SetValue2("device", {...data}, SET_JOB_ORDER_REQUEST_VALUE);
                                    
                                 }}>
                                    <div className="col-md=6"><span>{data.brand}</span></div>
                                    <div className="col-md=6"><span>{data.propertyCode}</span></div>
                                    <div className="col-md=12"><span>{data.serial}</span></div>
                                 </div>
                              )
                           }
                        } : false}
                     />

                  </div>

                  <div className="col-md-5 label">
                     <span>IT Equipment:</span>
                  </div>
                  <div className="col-md-7 inpt">
                     <LabelInput
                        value={(jobOrderRequest.hasOwnProperty("device")?((jobOrderRequest.device.hasOwnProperty("type"))?jobOrderRequest.device.type:""):"").toUpperCase()} type="text"
                        onChange={(e) => {
                           this.props.SetValue(e, SET_JOB_ORDER_REQUEST_VALUE);
                        }} className="uneditable"
                     />
                  </div>


                  <div className="col-md-5 label">
                     <span>Brand/Model:</span>
                  </div>
                  <div className="col-md-7 inpt">
                     <LabelInput
                        value={(jobOrderRequest.hasOwnProperty("device")?jobOrderRequest.device.brand:"") + " - " + (jobOrderRequest.hasOwnProperty("device")?jobOrderRequest.device.model:"")} type="text"
                        onChange={(e) => {
                           this.props.SetValue(e, SET_JOB_ORDER_REQUEST_VALUE);
                        }} className="uneditable"
                     />
                  </div>

                  <div className="col-md-5 label">
                     <span>Nature Of Complaint:</span>
                  </div>
                  <div className="col-md-12 inpt">
                     <LabelInput
                        value={jobOrderRequest.natureOfComplaint} prop="natureOfComplaint" type="textarea"
                        onChange={(e) => {
                           this.props.SetValue(e, SET_JOB_ORDER_REQUEST_VALUE);
                        }}
                     />
                  </div>

                  <div className="col-md-5 label">
                     <span>Requesting Personnel Signature:</span>
                  </div>
                  <div className="col-md-7 inpt">
                     <LabelInput case={1} value={""} className="uneditable" />
                  </div>

                  <div className="col-md-5 label">
                     <span>Date Received :</span>
                  </div>
                  <div className="col-md-7 inpt">
                     <LabelInput case={1}
                        label={""} value={this.props.GetDate((jobOrderRequest.createdAt == "")?new Date():new Date(jobOrderRequest.createdAt))} prop="createdAt" type="date"
                        onChange={(e) => {
                           this.props.SetValue(e, SET_JOB_ORDER_REQUEST_VALUE);
                        }}
                     />
{/* 
                     <LabelInput case={1}
                        value={""} className="uneditable"
                     /> */}
                  </div>


                  <div className="col-md-10 offset-md-1 sign">
                     <LabelInput value={"GLADYS D. BULADACO"} className="uneditable" />
                     <span>CMT III</span>
                  </div>

                  <div className="col-md-12 footer">
                     <span>DOH-RO13-KM-ICT-QSOP-02 Form1 Rev.0</span>
                  </div>

               </div>

            </div>

         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   jobOrderRequest: state.jobOrderRequest,
})

export default connect(mapStateToProps, {
   GetDate,
   SetValue,
   SetValue2,
   ArrangeName,
   ArrangeDate,
   SetUserRequestPersonnel,
})(JobrOrderRequestForm);
