import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import InfoModal from './../../helpers/InfoModal';
import HfPersonnelForm from './HfPersonnelForm';
import HfPersonnelForm2 from './HfPersonnelForm2';

import Form1 from './Forms/Form1';
import Form2 from './Forms/Form2';
import Form3 from './Forms/Form3';


import {
  addHfPersonnel,
  updateHfPersonnel,
  deleteHfPersonnel,
} from '../../../actions/hfPersonnelAction';

const HfPersonnelModal2 = (props) => {

  var butts = [{type: 'PRINT', callback: () => {}}];
  // if (props.modalType == 'add'){
  //   butts.push({type: 'ADD', callback: props.addHfPersonnel});
  // }
  // if (props.modalType == 'update'){
  //   butts.push({type: 'UPDATE', callback: props.updateHfPersonnel});
  // }

  const { toDisplay } = props.hfPersonnel;
  var hfPersonnel = {};
  var elems = [];

  for (let x = 0; x < toDisplay.length; x++) {
  // for (let x = 0; x < 1; x++) {

    elems.push(
      <Fragment>
        <Form1 personnelData={{...toDisplay[x]}} modalType={props.modalType} vaccine={"ASTRAZENECA"} />
        {/* <Form2 personnelData={{...toDisplay[x]}} modalType={props.modalType} vaccine={"ASTRAZENECA"} />
        <Form3 personnelData={{...toDisplay[x]}} modalType={props.modalType} vaccine={"ASTRAZENECA"} /> */}
      </Fragment>
    )    

  }

  return (
    <InfoModal
      size = {'90%'}
      modal = {props.modal}
      toggle = {props.toggle}
      title = {'HF Personnel'}
      form = {elems}
      buttons = {butts}
    />
  );

}

const mapStateToProps = (state) => ({
  hfPersonnel: state.hfPersonnel,
})

export default connect(mapStateToProps, {
  addHfPersonnel,
  updateHfPersonnel,
  deleteHfPersonnel,
})(HfPersonnelModal2);

