import React from 'react';
import { connect } from 'react-redux';

import {
  GetList,
} from '../../../actions/helpers/displayAction';

import {
  SET_VACCINATION_SITESS,
  SET_SEARCHED_VACCINATION_SITESS,
  SET_HF_PERSONNEL_HEALTH_FACILITIES,
} from '../../../actions/types';

import VaccinationSitesTable from './VaccinationSitesTable';
import VaccinationSitesModal from './VaccinationSitesModal';
import VaccinationSiteUploadModal from './VaccinationSiteUploadModal';

class VaccinationSites extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      modal: false,
      modalUpload: false,
      modalType: '',
    }

    this.toggleModal = this.toggleModal.bind(this); 
    this.toggleUpload = this.toggleUpload.bind(this); 

    props.GetList('ceir/vaccination-sites/get', SET_VACCINATION_SITESS, 1, 10);
		props.GetList('ceir/health-facility/get', SET_HF_PERSONNEL_HEALTH_FACILITIES, 1, 1000, undefined, undefined, {name: 1});
  }

  toggleModal (type) {
    this.setState({
      modal: !this.state.modal,
      modalType: type,
    });
  }

  toggleUpload () {
    this.setState({
      modalUpload: !this.state.modalUpload,
    });
  }


  render () {
    return (

      <div className='row justify-content-center'>
        <div className='col-md-12'>
          <div className='custom-cards-container'>
            <div className='custom-cards rounded-container box-shadow-container'>
              <VaccinationSitesModal toggle={this.toggleModal} modal={this.state.modal} modalType={this.state.modalType} />
              <VaccinationSiteUploadModal toggle={this.toggleUpload} modal={this.state.modalUpload} />

              <VaccinationSitesTable
                toggleModal={this.toggleModal}
                toggleUpload={this.toggleUpload}
                title = {'Vaccination Sites'}
                filter = {{}}
                reducers = {{ get: SET_VACCINATION_SITESS, search: SET_SEARCHED_VACCINATION_SITESS }}
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
  vaccinationSites: state.vaccinationSites,
})

export default connect(mapStateToProps, {
  GetList,
})(VaccinationSites);

