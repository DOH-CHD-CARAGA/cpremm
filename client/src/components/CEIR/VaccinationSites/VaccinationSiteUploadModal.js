import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import InfoModal from '../../helpers/InfoModal';
import FileUpload from './FileUpload';

import {
  UploadRecordIndividually,
} from '../../../actions/healthFacilityAction';

const VaccinationSiteUploadModal = (props) => {

  const { toUpload, uploadDetails } = props.hfPersonnel;

  var butts = [
    {type: 'ADD', callback: () => {props.UploadRecordIndividually()}},
  ];

  return (
    <InfoModal
      size = {'90%'}
      modal = {props.modal}
      toggle = {props.toggle}
      title = {'Health Facilities Upload'}
      backdrop="static"
      form = {
        <FileUpload />
      }
      buttons = {butts}
    />
  );

}

const mapStateToProps = (state) => ({
  hfPersonnel: state.hfPersonnel
})

export default connect(mapStateToProps, {
  UploadRecordIndividually,
})(VaccinationSiteUploadModal);

