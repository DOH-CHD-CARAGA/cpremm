import React from 'react';
import { connect } from 'react-redux';

import InfoModal from '../../helpers/InfoModal';
import PrePostMonitoringForm from './PrePostMonitoringForm';

import {
  addPrePostMonitoring,
  updatePrePostMonitoring,
} from '../../../actions/prePostMonitoringAction';

const PrePostMonitoringModal = (props) => {

  var butts = [];
  if (props.modalType == 'add'){
    butts.push({type: 'ADD', callback: props.addPrePostMonitoring});
  }
  if (props.modalType == 'update'){
    butts.push({type: 'UPDATE', callback: props.updatePrePostMonitoring});
  }

  return (
    <InfoModal
      size = {'60%'}
      modal = {props.modal}
      toggle = {props.toggle}
      title = {'Pre Post Monitoring'}
      form = {<PrePostMonitoringForm modalType={props.modalType}/>}
      buttons = {butts}
    />
  );

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {
  addPrePostMonitoring,
  updatePrePostMonitoring,
})(PrePostMonitoringModal);

