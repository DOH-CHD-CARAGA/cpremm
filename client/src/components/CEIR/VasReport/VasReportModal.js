import React from 'react';
import { connect } from 'react-redux';

import InfoModal from './../../helpers/InfoModal';
import VasReportForm from './VasReportForm';

import {
  addVasReport,
  updateVasReport,
} from '../../../actions/vasReportAction';

const VasReportModal = (props) => {

  var butts = [];
  if (props.modalType == 'add'){
    butts.push({type: 'ADD', callback: props.addVasReport});
  }
  if (props.modalType == 'update'){
    butts.push({type: 'UPDATE', callback: props.updateVasReport});
  }

  return (
    <InfoModal
      size = {'60%'}
      modal = {props.modal}
      toggle = {props.toggle}
      title = {'VAS Report'}
      form = {<VasReportForm modalType={props.modalType}/>}
      buttons = {butts}
    />
  );

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {
  addVasReport,
  updateVasReport,
})(VasReportModal);

