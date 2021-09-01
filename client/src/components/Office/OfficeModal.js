import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import InfoModal from '../helpers/InfoModal';
import OfficeForm from './OfficeForm';

import {
  addOffice,
  updateOffice,
} from '../../actions/officeAction';

const OfficeModal = (props) => {

  var butts = [];
  if (props.modalType == "add"){
    butts.push({type: "ADD", callback: props.addOffice});
  }
  if (props.modalType == "update"){
    butts.push({type: "UPDATE", callback: props.updateOffice});
  }

  return (
    <InfoModal
      size = {"60%"}
      modal = {props.modal}
      toggle = {props.toggle}
      title = {"Office"}
      form = {<OfficeForm modalType={props.modalType}/>}
      buttons = {butts}
    />
  );

}


const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {
  addOffice,
  updateOffice,
})(OfficeModal);
