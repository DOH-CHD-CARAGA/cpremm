import React from 'react';
import { connect } from 'react-redux';

import { Button } from 'reactstrap';

import {
  GetList,
} from '../../actions/helpers/displayAction';

import {
  SET_JOB_ORDER_REQUESTS,
  SET_SEARCHED_JOB_ORDER_REQUESTS,
} from './../../actions/types';

import JobOrderRequestTable from './JobOrderRequestTable';
import JobOrderRequestModal from './JobOrderRequestModal';
import JobOrderDoneModal from './JobOrderDoneModal';
import CommentBox from '../helpers/CommentBox';

class JobOrderRequest extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      modal: false,
      doneModal: false,
      modalType: "",
      formType: "",
      isMaster: (JSON.parse(localStorage.getItem('doh-user-role')).name == "Master")?true:false
    }

    this.toggleModal = this.toggleModal.bind(this); 
    this.toggleDoneModal = this.toggleDoneModal.bind(this); 

    props.GetList("jobOrderRequest/get", SET_JOB_ORDER_REQUESTS, 1, 10);
  }

  
  toggleModal (type, form = "request") {
    this.setState({
      ...this.state,
      modal: !this.state.modal,
      modalType: type,
      formType: form,
    });
  }

    
  toggleDoneModal (type) {

    this.setState({
      ...this.state,
      doneModal: !this.state.doneModal,
    });
  }

  render () {
    return (

      <div className="row justify-content-center" id="job-order-request">
        <div className="col-md-12">
          {/* <div className="custom-cards-container"> */}
          <div className="container-fluid">
            {/* <div className="custom-cards rounded-container box-shadow-container table-responsive"> */}
            <div className="custom-cards rounded-container box-shadow-container table-responsive">
            <h6 className="title-bar">{"CPreMM"}</h6>
            <hr/>
              <JobOrderRequestModal toggle={this.toggleModal} modal={this.state.modal} modalType={this.state.modalType} formType={this.state.formType} toggleDone={this.toggleDoneModal}/>
              <JobOrderDoneModal toggle={this.toggleDoneModal} modal={this.state.doneModal} />

              <JobOrderRequestTable
                toggleModal={this.toggleModal}
                title = {"Job Order Requests"}
                filter = {{}}
                reducers = {{ get: SET_JOB_ORDER_REQUESTS, search: SET_SEARCHED_JOB_ORDER_REQUESTS }}
                toggle={ (form) => {
                  this.toggleModal("update", form)
                }}
                isMaster={this.state.isMaster}
              />              
            </div>
          </div>
        </div>
      </div>
    );
  }

}



const mapStateToProps = (state) => ({
  jobOrderRequest: state.jobOrderRequest,
})

export default connect(mapStateToProps, {
  GetList,
})(JobOrderRequest);
