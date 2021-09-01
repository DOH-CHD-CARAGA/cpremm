import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import InfoModal from '../helpers/InfoModal';
import JobOrderRequestForm from './JobOrderRequestForm';
import JobOrderReport from './JobOrderReport';

import {
  addJobOrderRequest,
  updateJobOrderRequest,
} from '../../actions/jobOrderRequestAction';

const JobOrderRequestModal = (props) => {
  const { jobOrderRequest } = props.jobOrderRequest;
  var done = jobOrderRequest.hasOwnProperty("technician") && ((jobOrderRequest.hasOwnProperty("technician") && jobOrderRequest.technician.seen != null) || (jobOrderRequest.hasOwnProperty("technician") && jobOrderRequest.technician.hasOwnProperty("dateAction")));

  var butts = [
    {type: "PRINT", callback: () => {}},
  ];
  if (props.formType == "request") {
    if (props.modalType == "add"){
      butts.push({type: "ADD", callback: () => {
        props.addJobOrderRequest(props.toggle);
      } });
    }
    if (props.modalType == "update"){
      butts.push({type: "UPDATE", callback: props.updateJobOrderRequest });

      butts.push({type: "ACTION", callback: () => {
        props.toggleDone();
      } });

      if (!done) {
        // butts.push({type: "ACTION", callback: () => {
        //   props.toggleDone();
        // } });
      }
  
    }  
  }

  return (
    <InfoModal
      size = {(props.formType == "request")?"70%":"80%"}
      modal = {props.modal}
      toggle = {props.toggle}
      title = {"Job Order Request"}
      form = {(props.formType == "request")?<JobOrderRequestForm modalType={props.modalType}/>:<JobOrderReport modalType={props.modalType}/>}
      buttons = {butts}
    />
  );

}


const mapStateToProps = (state) => ({
   jobOrderRequest: state.jobOrderRequest,
})

export default connect(mapStateToProps, {
  addJobOrderRequest,
  updateJobOrderRequest,
})(JobOrderRequestModal);
