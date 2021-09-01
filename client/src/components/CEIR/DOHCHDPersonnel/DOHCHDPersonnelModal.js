import React from 'react';
import { connect } from 'react-redux';

import InfoModal from './../../helpers/InfoModal';
import DOHCHDPersonnelForm from './DOHCHDPersonnelForm';

import {
  addDOHCHDPersonnel,
  updateDOHCHDPersonnel,
} from '../../../actions/DOHCHDPersonnelAction';

const DOHCHDPersonnelModal = (props) => {

  var butts = [];
  if (props.modalType == 'add'){
    butts.push({type: 'ADD', callback: props.addDOHCHDPersonnel});
  }
  if (props.modalType == 'update'){
    butts.push({type: 'UPDATE', callback: props.updateDOHCHDPersonnel});
  }

  return (
    <InfoModal
      size = {'60%'}
      modal = {props.modal}
      toggle = {props.toggle}
      title = {'DOH CHD Personnel'}
      form = {<DOHCHDPersonnelForm modalType={props.modalType}/>}
      buttons = {butts}
    />
  );

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {
  addDOHCHDPersonnel,
  updateDOHCHDPersonnel,
})(DOHCHDPersonnelModal);

