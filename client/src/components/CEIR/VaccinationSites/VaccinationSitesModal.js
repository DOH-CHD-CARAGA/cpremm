import React from 'react';
import { connect } from 'react-redux';

import InfoModal from '../../helpers/InfoModal';
import VaccinationSitesForm from './VaccinationSitesForm';

import {
  addVaccinationSites,
  updateVaccinationSites,
} from '../../../actions/vaccinationSitesAction';

const VaccinationSitesModal = (props) => {

  var butts = [];
  if (props.modalType == 'add'){
    butts.push({type: 'ADD', callback: props.addVaccinationSites});
  }
  if (props.modalType == 'update'){
    butts.push({type: 'UPDATE', callback: props.updateVaccinationSites});
  }

  return (
    <InfoModal
      size = {'60%'}
      modal = {props.modal}
      toggle = {props.toggle}
      title = {'Vaccination Site'}
      form = {<VaccinationSitesForm modalType={props.modalType}/>}
      buttons = {butts}
    />
  );

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {
  addVaccinationSites,
  updateVaccinationSites,
})(VaccinationSitesModal);

