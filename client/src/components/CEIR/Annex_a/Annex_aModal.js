import React from 'react';
import { connect } from 'react-redux';

import InfoModal from '../../helpers/InfoModal';
import Annex_aForm from './Annex_aForm';

import {
  addAnnex_a,
  updateAnnex_a,
} from '../../../actions/annex_aAction';

const Annex_aModal = (props) => {

  var butts = [];
  if (props.modalType == 'add'){
    butts.push({type: 'ADD', callback: props.addAnnex_a});
  }
  if (props.modalType == 'update'){
    butts.push({type: 'UPDATE', callback: props.updateAnnex_a});
  }

  return (
    <InfoModal
      size = {'60%'}
      modal = {props.modal}
      toggle = {props.toggle}
      title = {'Annex_a'}
      form = {<Annex_aForm modalType={props.modalType}/>}
      buttons = {butts}
    />
  );

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {
  addAnnex_a,
  updateAnnex_a,
})(Annex_aModal);

