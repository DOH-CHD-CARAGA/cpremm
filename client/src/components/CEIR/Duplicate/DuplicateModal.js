import React from 'react';
import { connect } from 'react-redux';

import InfoModal from '../../helpers/InfoModal';
import DuplicateForm from './DuplicateForm';

import {
  addDuplicate,
  updateDuplicate,
} from '../../../actions/duplicateAction';

const DuplicateModal = (props) => {

  var butts = [];
  if (props.modalType == 'add'){
    butts.push({type: 'ADD', callback: props.addDuplicate});
  }
  if (props.modalType == 'update'){
    butts.push({type: 'UPDATE', callback: props.updateDuplicate});
  }

  return (
    <InfoModal
      size = {'60%'}
      modal = {props.modal}
      toggle = {props.toggle}
      title = {'Duplicate'}
      form = {<DuplicateForm modalType={props.modalType}/>}
      buttons = {butts}
    />
  );

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {
  addDuplicate,
  updateDuplicate,
})(DuplicateModal);

