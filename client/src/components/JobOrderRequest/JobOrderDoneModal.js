import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import InfoModal from '../helpers/InfoModal';
import LabelInput from '../helpers/LabelInput';
import JobOrderRequestForm from './JobOrderRequestForm';

import {
  SET_JOB_ORDER_REQUEST_VALUE,
} from '../../actions/types';

import {
  SetValue,
  CheckFields,
} from '../../actions/helpers/displayAction';

import {
  addJobOrderRequestAction,
} from '../../actions/jobOrderRequestAction';

const JobOrderDoneModal = (props) => {
  const { technician } = props.jobOrderRequest.jobOrderRequest;
  const { actionDetails } = technician;

  var ableButton = props.CheckFields(actionDetails);

  console.log("::::::::::::::::::::::::::::::::::::------------");
  console.log(props.jobOrderRequest.jobOrderRequest);

  var butts = [
  ];

  butts.push({type: "SAVE", disable: !ableButton, callback: () => {
    props.addJobOrderRequestAction(props.toggle);
  } });

  if (props.modalType == "add"){
  }


  return (
    <InfoModal
      size = {"50%"}
      modal = {props.modal}
      toggle = {props.toggle}
      title = {"Action Taken"}
      form = {<Fragment>

        <div id="action-taken-form" className="row">

          <div className="col-md-12">
            <LabelInput
              label="Device Status" value={actionDetails.status} prop="technician.actionDetails.status" type="select" options={[{value: "", text: "--- SELECT STATUS ---"}, {value: "in-use", text: "In-Use"}, {value: "waste", text: "Waste"}]}
              onChange={(e) => {
                  props.SetValue(e, SET_JOB_ORDER_REQUEST_VALUE);
              }}
            />
          </div>

          <div className="col-md-5 label">
              <span>Scope of Work:</span>
          </div>
          
          <div className="col-md-12 inpt">
              <LabelInput
                value={actionDetails.scopeOfWork} prop="technician.actionDetails.scopeOfWork" type="textarea"
                onChange={(e) => {
                    props.SetValue(e, SET_JOB_ORDER_REQUEST_VALUE);
                }}
              />
          </div>

          <div className="col-md-5 label">
              <span>Check-up Result/s:</span>
          </div>
          <div className="col-md-12 inpt">
              <LabelInput
                value={actionDetails.checkUpResult} prop="technician.actionDetails.checkUpResult" type="textarea"
                onChange={(e) => {
                    props.SetValue(e, SET_JOB_ORDER_REQUEST_VALUE);
                }}
              />
          </div>

          <div className="col-md-5 label">
              <span>Recommendation/s:</span>
          </div>
          <div className="col-md-12 inpt">
              <LabelInput
                value={actionDetails.recommendations} prop="technician.actionDetails.recommendations" type="textarea"
                onChange={(e) => {
                    props.SetValue(e, SET_JOB_ORDER_REQUEST_VALUE);
                }}
              />
          </div>

          <div className="col-md-5 label">
              <span>Specification/s:</span>
          </div>
          <div className="col-md-12 inpt">
              <LabelInput
                value={actionDetails.specifications} prop="technician.actionDetails.specifications" type="textarea"
                onChange={(e) => {
                    props.SetValue(e, SET_JOB_ORDER_REQUEST_VALUE);
                }}
              />
          </div>

          <div className="col-md-5 label">
              <span>Technician:</span>
          </div>
          <div className="col-md-12 inpt">
              <LabelInput
                value={technician.id} prop="technician.id" type="select"
                options={[
                  {value: "", text: "----- Select Technician -----"},
                  {value: "60062f5f6e24530481f33d34", text: "Jospeh U. Paring"},
                  {value: "605d34b26a9dacc8ec8b9727", text: "Rolando L. Jamito"},
                ]}
                onChange={(e) => {
                    props.SetValue(e, SET_JOB_ORDER_REQUEST_VALUE);
                }}
              />
          </div>

        </div>
      </Fragment>}
      buttons = {butts}
    />
  );

}


const mapStateToProps = (state) => ({
  jobOrderRequest: state.jobOrderRequest,
})

export default connect(mapStateToProps, {
  SetValue,
  CheckFields,
  addJobOrderRequestAction,
})(JobOrderDoneModal);
