import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import InfoModal from '../helpers/InfoModal';
import DeviceForm from './DeviceForm';

import {
  SubmitDevice,
} from '../../actions/deviceAction';

const DeviceModal = (props) => {

  var butts = [];
  if (props.modalType == "add"){
    butts.push({type: "ADD", callback: props.SubmitDevice});
  }
  if (props.modalType == "update"){
    butts.unshift({type: "DELETE", callback: () => {
      props.toggleDelete();
    }});
    butts.push({type: "UPDATE", callback: props.SubmitDevice});
  }

  return (
    <InfoModal
      size = {"60%"}
      modal = {props.modal}
      toggle = {props.toggle}
      title = {"Device"}
      form = {<DeviceForm modalType={props.modalType}/>}
      buttons = {butts}
    />
  );

}


const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {
  SubmitDevice,
})(DeviceModal);
