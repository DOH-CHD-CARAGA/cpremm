import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import InfoModal from '../helpers/InfoModal';
import AppModuleForm from './AppModuleForm';

import {
  addAppModule,
  updateAppModule,
  generateAppModule,
} from '../../actions/appModuleAction';

const AppModuleModal = (props) => {

  var butts = [];
  if (props.modalType == "add"){
    butts.push({type: "ADD", callback: props.addAppModule});
  }
  if (props.modalType == "update"){
    if (!props.appModule.appModule.isGenerated) {
      butts.push({type: "UPDATE", callback: props.updateAppModule});
      butts.push({type: "GENERATE", callback: props.generateAppModule});
    }
  }

  return (
    <InfoModal
      size = {"70%"}
      modal = {props.modal}
      toggle = {props.toggle}
      title = {"App Module"}
      form = {<AppModuleForm modalType={props.modalType}/>}
      buttons = {butts}
    />
  );

}


const mapStateToProps = (state) => ({
  appModule: state.appModule
})

export default connect(mapStateToProps, {
  addAppModule,
  updateAppModule,
  generateAppModule,
})(AppModuleModal);
