import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import LOGO from './page_001.jpg';
import LOGO2 from './kalusugan.jpg';
import LabelInput from '../helpers/LabelInput';
import LabelDisplay from '../helpers/LabelDisplay';
import Search2 from '../helpers/Search2';

import {
   GetDate,
} from '../../actions/helpers/dateAction';

import {
   ArrangeName,
   ArrangeDate,
   GetSafe,
} from '../../actions/helpers/displayAction';

import {

} from '../../actions/types';


class JobOrderReport extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
      }
   }

   render() {

      const { jobOrderRequest } = this.props.jobOrderRequest;
      console.log("::::::::::::::::++++++++++++======");
      console.log(jobOrderRequest);
      return (
         <div id="job-order-report-form">
            <div id="report-form-header">
               <div id="doh-logo">
                  <img src={LOGO}/>
               </div>

               <div id="header-text">
                  <strong>DEPARTMENT OF HEALTH</strong>
                  <strong>REGIONAL OFFICE XIII</strong>
                  <span>Pizarro St. Cor. Narra Road, Butuan City</span>
               </div>

               <div id="doh-logo2">
                  <img src={LOGO2}/>
               </div>
            </div>
            <div id="report-form-body">
               <div id="header-text">
                  <strong>KNOWLEDGE MANAGEMENT- INFORMATION &amp; COMMUNICATION TECHNOLOGY</strong>
                  <strong>CORRECTIVE /RECOMMENDATION REPORT</strong>
               </div>
               <div id="main-content" className="row upper-details">
                  <LabelDisplay id="jobOrderNumber" label="JOB ORDER #: " value={this.props.GetSafe(()=>{return jobOrderRequest.jobOrderRequestID}, "")}/>

                  <LabelDisplay label="Date : " value={this.props.ArrangeDate(this.props.GetSafe(()=>{return jobOrderRequest.requestDate}, new Date()),false)}/>

                  <LabelDisplay label="Item : " value={this.props.GetSafe(()=>{return jobOrderRequest.device.brand}, "") + " " + this.props.GetSafe(()=>{return jobOrderRequest.device.model}, "")}/>

                  <LabelDisplay label="Serial #: " value={this.props.GetSafe(()=>{return jobOrderRequest.device.serial}, "")}/>

                  <LabelDisplay label="Property Code: " value={this.props.GetSafe(()=>{return jobOrderRequest.device.propertyCode}, "")}/>

                  <LabelDisplay label="End-User: " value={this.props.GetSafe(()=>{return jobOrderRequest.requestingPersonnel.name}, "") + " - " + this.props.GetSafe(()=>{return jobOrderRequest.requestingPersonnel.divSec}, "")}/>

                  <LabelDisplay label="Problem: " value={this.props.GetSafe(()=>{return jobOrderRequest.natureOfComplaint}, "")}/>

               </div>

               <div id="main-content" className="row middle-details">

                  <LabelDisplay label="Scope of Work: " value={this.props.GetSafe(()=>{return jobOrderRequest.technician.actionDetails.scopeOfWork}, "")}/>

                  <LabelDisplay label="Check-up Result: " value={this.props.GetSafe(()=>{return jobOrderRequest.technician.actionDetails.checkUpResult}, "")}/>

                  <LabelDisplay label="Recommendation: " value={this.props.GetSafe(()=>{return jobOrderRequest.technician.actionDetails.recommendations}, "")}/>

                  <LabelDisplay label="Specification: " value={this.props.GetSafe(()=>{return jobOrderRequest.technician.actionDetails.specifications}, "")}/>

               </div>

               <div id="main-content" className="row lower-details">
                  <div>
                     <span>Checked by: </span>
                     <strong>{this.props.ArrangeName(this.props.GetSafe(()=>{return jobOrderRequest.technician.id[0].name}, ""), 1)}</strong>
                     <em>{this.props.GetSafe(()=>{return jobOrderRequest.technician.id[0].designation}, "")}</em>
                  </div>

                  <div>
                     <span>Noted by: </span>
                     <strong>{"GLADYS D. BULADACO"}</strong>
                     <em>{"CMT III"}</em>
                  </div>
               </div>

            </div>
            <div id="footer-content" className="">
               <hr/>
               <span>DOH-RO13-KM-ICT-QSOP-02 Form2 Rev 1</span>
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
   ArrangeName,
   ArrangeDate,
   GetSafe,
})(JobOrderReport);
