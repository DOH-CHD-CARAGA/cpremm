import React from 'react';
import { connect } from 'react-redux';

import InfoModal from '../../helpers/InfoModal';
import HealthFacilityForm from './HealthFacilityForm';

import {
  addHealthFacility,
  updateHealthFacility,
} from '../../../actions/healthFacilityAction';

const HealthFacilityModal = (props) => {

  var butts = [];
  if (props.modalType == 'add'){
    butts.push({type: 'ADD', callback: props.addHealthFacility});
  }
  if (props.modalType == 'update'){
    butts.push({type: 'UPDATE', callback: props.updateHealthFacility});
  }

  return (
    <InfoModal
      size = {'60%'}
      modal = {props.modal}
      toggle = {props.toggle}
      title = {'Health Facility'}
      form = {<HealthFacilityForm modalType={props.modalType}/>}
      buttons = {butts}
    />
  );

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {
  addHealthFacility,
  updateHealthFacility,
})(HealthFacilityModal);

