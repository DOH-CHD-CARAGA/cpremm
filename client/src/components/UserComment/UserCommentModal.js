import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import InfoModal from './../helpers/InfoModal';
import UserCommentForm from './UserCommentForm';

import {
  addUserComment,
  updateUserComment,
} from '../../actions/userCommentAction';

const UserCommentModal = (props) => {

  var butts = [];
  if (props.modalType == "add"){
    butts.push({type: "ADD", callback: props.addUserComment});
  }
  if (props.modalType == "update"){
    butts.push({type: "UPDATE", callback: props.updateUserComment});
  }

  return (
    <InfoModal
      size = {"60%"}
      modal = {props.modal}
      toggle = {props.toggle}
      title = {"User Comment"}
      form = {<UserCommentForm modalType={props.modalType}/>}
      buttons = {butts}
    />
  );

}


const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {
  addUserComment,
  updateUserComment,
})(UserCommentModal);
