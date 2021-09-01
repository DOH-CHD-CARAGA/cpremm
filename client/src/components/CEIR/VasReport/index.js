import React from 'react';
import { connect } from 'react-redux';

import {
  GetList,
} from '../../../actions/helpers/displayAction';

import {
  SET_VAS_REPORTS,
  SET_SEARCHED_VAS_REPORTS,
} from './../../../actions/types';

import VasReportTable from './VasReportTable';
import VasReportModal from './VasReportModal';
import VASReportUploadModal from './VASReportUploadModal';

class VasReport extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      modal: false,
      modalUpload: false,
      modalType: '',
    }

    this.toggleModal = this.toggleModal.bind(this); 
    this.toggleUploadModal = this.toggleUploadModal.bind(this); 

    props.GetList('ceir/vas-report/get', SET_VAS_REPORTS, 1, 10);
  }

  toggleModal (type) {
    this.setState({
      modal: !this.state.modal,
      modalType: type,
    });
  }

  toggleUploadModal (type) {
    this.setState({
      modalUpload: !this.state.modalUpload,
      modalType: type,
    });
  }

  render () {
    return (

      <div className='row justify-content-center'>
        <div className='col-md-12'>
          <div className='custom-cards-container'>
            <div className='custom-cards rounded-container box-shadow-container'>
              <VasReportModal toggle={this.toggleModal} modal={this.state.modal} modalType={this.state.modalType} />
              <VASReportUploadModal toggle={this.toggleUploadModal} modal={this.state.modalUpload}/>
              <VasReportTable
                toggleModal={this.toggleModal}
                toggleUpload={this.toggleUploadModal}
                title = {'VAS Reports'}
                filter = {{}}
                reducers = {{ get: SET_VAS_REPORTS, search: SET_SEARCHED_VAS_REPORTS }}
                toggle={ () => {
                  this.toggleModal('update')
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  vasReport: state.vasReport,
})

export default connect(mapStateToProps, {
  GetList,
})(VasReport);

