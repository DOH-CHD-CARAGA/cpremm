import React from 'react';
import { connect } from 'react-redux';

import {
  GetList,
} from '../../../actions/helpers/displayAction';

import {
  SET_PRE_POST_MONITORINGS,
  SET_SEARCHED_PRE_POST_MONITORINGS,
} from '../../../actions/types';

import PrePostMonitoringTable from './PrePostMonitoringTable';
import PrePostMonitoringModal from './PrePostMonitoringModal';

class PrePostMonitoring extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      modal: false,
      modalType: '',
    }

    this.toggleModal = this.toggleModal.bind(this); 

    // props.GetList('admin/prePostMonitoring/get', SET_PRE_POST_MONITORINGS, 1, 10);
  }

  toggleModal (type) {
    this.setState({
      modal: !this.state.modal,
      modalType: type,
    });
  }

  render () {
    return (

      <div className='row justify-content-center'>
        GAGO
        {/* <div className='col-md-12'>
          <div className='custom-cards-container'>
            <div className='custom-cards rounded-container box-shadow-container'>

            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  prePostMonitoring: state.prePostMonitoring,
})

export default connect(mapStateToProps, {
  GetList,
})(PrePostMonitoring);

