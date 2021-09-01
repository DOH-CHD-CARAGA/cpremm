import React from 'react';
import { connect } from 'react-redux';

import {
  GetList,
} from '../../../actions/helpers/displayAction';
import LabelInput from '../../helpers/LabelInput';

import {
  SET_HEALTH_FACILITYS,
  SET_SEARCHED_HEALTH_FACILITYS,
} from '../../../actions/types';

import HealthFacilityTable from './HealthFacilityTable';
import HealthFacilityModal from './HealthFacilityModal';
import HealthFacilityUploadModal from './HealthFacilityUploadModal';

class HealthFacility extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      modal: false,
      modalUpload: false,
      modalType: '',
    }

    this.toggleModal = this.toggleModal.bind(this); 
    this.toggleUpload = this.toggleUpload.bind(this); 

    props.GetList('ceir/health-facility/get', SET_HEALTH_FACILITYS, 1, 10);
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
              <HealthFacilityModal toggle={this.toggleModal} modal={this.state.modal} modalType={this.state.modalType} />
              <HealthFacilityUploadModal toggle={this.toggleUpload} modal={this.state.modalUpload} />
              
              <HealthFacilityTable
                toggleModal={this.toggleModal}
                toggleUpload={this.toggleUpload}
                title = {'Health Facilities'}
                filter = {{}}
                reducers = {{ get: SET_HEALTH_FACILITYS, search: SET_SEARCHED_HEALTH_FACILITYS }}
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
  healthFacility: state.healthFacility,
})

export default connect(mapStateToProps, {
  GetList,
})(HealthFacility);

