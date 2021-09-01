import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import InfoModal from './../helpers/InfoModal';
import UserForm from './UserForm';

import {
  addUser,
  updateUser,
} from '../../actions/userAction';

const UserModal = (props) => {

  var butts = [];
  if (props.modalType == "add"){
    butts.push({type: "ADD", callback: props.addUser});
  }
  if (props.modalType == "update"){
    butts.push({type: "UPDATE", callback: props.updateUser});
  }

  return (
    <InfoModal
      // size = {"60%"}
      class="form-controll"
      modal = {props.modal}
      toggle = {props.toggle}
      title = {"User"}
      form = {
        <Fragment>
          <UserForm modalType={props.modalType}/>
        </Fragment>
      }
      buttons = {butts}
    />
  );

}


const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {
  addUser,
  updateUser,
})(UserModal);
