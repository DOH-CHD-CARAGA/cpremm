import React from 'react';
import { connect } from 'react-redux';

import InfoModal from './../../helpers/InfoModal';
import HfPersonnelForm from './HfPersonnelForm';
import HfPersonnelForm2 from './HfPersonnelForm2';

import {
  addHfPersonnel,
  updateHfPersonnel,
  deleteHfPersonnel,
} from '../../../actions/hfPersonnelAction';

const HfPersonnelModal = (props) => {

  var butts = [{type: 'PRINT', callback: () => {}}];
  // if (props.modalType == 'add'){
  //   butts.push({type: 'ADD', callback: props.addHfPersonnel});
  // }
  // if (props.modalType == 'update'){
  //   butts.push({type: 'UPDATE', callback: props.updateHfPersonnel});
  // }

  return (
    <InfoModal
      size = {'90%'}
      modal = {props.modal}
      toggle = {props.toggle}
      title = {'HF Personnel'}
      form = {
        <HfPersonnelForm2 modalType={props.modalType}/>
      }
      buttons = {butts}
    />
  );

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {
  addHfPersonnel,
  updateHfPersonnel,
  deleteHfPersonnel,
})(HfPersonnelModal);

