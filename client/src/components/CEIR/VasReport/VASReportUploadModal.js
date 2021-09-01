import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import InfoModal from './../../helpers/InfoModal';
import FileUpload from './FileUpload';

import {

} from '../../../actions/hfPersonnelAction';

const VASReportUploadModal = (props) => {

  var butts = [
    {type: 'DELETE', callback: () => {}},
    {type: 'ADD', callback: () => {}},
    {type: 'RESET', callback: () => {}},
  ];

  return (
    <InfoModal
      size = {'90%'}
      modal = {props.modal}
      toggle = {props.toggle}
      title = {'VAS Report Upload'}
      backdrop="static"
      form = {
        <FileUpload/>
      }
      buttons = {butts}
    />
  );

}

const mapStateToProps = (state) => ({
  hfPersonnel: state.hfPersonnel,
  vasReport: state.vasReport,
})

export default connect(mapStateToProps, {

})(VASReportUploadModal);

