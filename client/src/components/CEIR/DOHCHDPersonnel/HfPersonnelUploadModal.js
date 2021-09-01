import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import InfoModal from './../../helpers/InfoModal';
import FileUpload from './FileUpload';

import {
  UploadRecord,
  UploadRecordIndividually,
  ResetUpload,
} from '../../../actions/hfPersonnelAction';

const HfPersonnelUploadModal = (props) => {

  const { toUpload, uploadDetails } = props.hfPersonnel;

  var butts = [
    {type: 'ADD', callback: () => {props.UploadRecordIndividually()}, disable: ((uploadDetails.province !="" && uploadDetails.facility !="") && toUpload.length > 0 && !toUpload[0].hasOwnProperty("uploadStatus"))?false:true},
    {type: 'RESET', callback: () => {props.ResetUpload()}},
  ];

  return (
    <InfoModal
      size = {'90%'}
      modal = {props.modal}
      toggle = {props.toggle}
      title = {'HF Personnel Upload'}
      backdrop="static"
      form = {
        <FileUpload toggleDuplicateModal={(data) => {
          props.toggleDuplicateModal(data);
        }}/>
      }
      buttons = {butts}
    />
  );

}

const mapStateToProps = (state) => ({
  hfPersonnel: state.hfPersonnel
})

export default connect(mapStateToProps, {
  UploadRecord,
  UploadRecordIndividually,
  ResetUpload,
})(HfPersonnelUploadModal);

