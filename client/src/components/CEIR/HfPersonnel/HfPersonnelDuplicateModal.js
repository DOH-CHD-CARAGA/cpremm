import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import InfoModal from './../../helpers/InfoModal';
import FileUpload from './FileUpload';

import {

} from '../../../actions/hfPersonnelAction';

const HfPersonnelDuplicateModal = (props) => {

  const { toUpload, uploadDetails } = props.hfPersonnel;

  var butts = [
    {type: 'Update', callback: () => {}},
    {type: 'Retain', callback: () => {props.toggle()}},
  ];

  return (
    <InfoModal
      size = {'90%'}
      modal = {props.modal}
      toggle = {props.toggle}
      title = {'Duplicate'}
      // backdrop="static"
      form = {
        <Fragment>
          <table>
            <tbody>
              
            </tbody>
          </table>
        </Fragment>
      }
      buttons = {butts}
    />
  );

}

const mapStateToProps = (state) => ({
  hfPersonnel: state.hfPersonnel
})

export default connect(mapStateToProps, {

})(HfPersonnelDuplicateModal);

