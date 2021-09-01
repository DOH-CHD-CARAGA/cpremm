import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import InfoModal from '../helpers/InfoModal';
import RoleForm from './RoleForm';

import {
  addRole,
  updateRole,
} from '../../actions/roleAction';

const RoleModal = (props) => {

  var butts = [];
  if (props.modalType == "add"){
    butts.push({type: "ADD", callback: props.addRole});
  }
  if (props.modalType == "update"){
    butts.push({type: "UPDATE", callback: props.updateRole});
  }

  return (
    <InfoModal
      size = {"60%"}
      modal = {props.modal}
      toggle = {props.toggle}
      title = {"Role"}
      form = {<RoleForm modalType={props.modalType}/>}
      buttons = {butts}
    />
  );

}


const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {
  addRole,
  updateRole,
})(RoleModal);
