import React from 'react';
import { connect } from 'react-redux';

import { Button } from 'reactstrap';

import {
  GetList,
} from '../../actions/helpers/displayAction';

import {
  SET_RECORDS_NEW,
  SET_SEARCHED_RECORDS_NEW,
} from './../../actions/types';

import RecordTable from './RecordTable';
import RecordModal from './RecordModal';
import RecordAddModal from './RecordAddModal';
import RecordDeleteModal from './RecordDeleteModal';
import CommentBox from '../helpers/CommentBox';
import RecordQRModal from './RecordQRModal';

import FileUpload from '../FileUpload';

class Record extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      modal: false,
      addModal: false,
      deleteModal: false,
      qrModal: false,
      modalType: "",
      addModalType: "",
      office: JSON.parse(localStorage.getItem('doh-user-off'))._id,
      role  : JSON.parse(localStorage.getItem('doh-user-role'))._id,
      isMaster: (JSON.parse(localStorage.getItem('doh-user-role')).name == "Master")?true:false
    }

    this.toggleModal = this.toggleModal.bind(this); 
    this.toggleQRModal = this.toggleQRModal.bind(this); 
    this.toggleDelete = this.toggleDelete.bind(this); 
    this.toggleAddModal = this.toggleAddModal.bind(this); 

    console.log("+++++++++++++++++++++++++++++++++====");
    console.log(((!this.state.isMaster)?{officeID: this.state.office}:undefined));

    props.GetList("record2/get", SET_RECORDS_NEW, 1, 10, ((!this.state.isMaster)?{officeID: this.state.office}:undefined));
  }

  
  toggleModal (type) {
    this.setState({
      modal: !this.state.modal,
      modalType: type,
    });
  }

  toggleQRModal (type) {
    this.setState({
      qrModal: !this.state.qrModal,
      modalType: type,
    });
  }

  toggleDelete (type) {
    this.setState({
      deleteModal: !this.state.deleteModal,
      modalType: type,
    });
  }

  toggleAddModal (type) {
    this.setState({
      addModal: !this.state.addModal,
      addModalType: type,
    });
  }

  render () {
    return (

      <div className="row justify-content-center"  id="records-new-area">
        <div className="col-md-12">
          <div className="custom-cards-container">
            {/* <div className="custom-cards rounded-container box-shadow-container table-responsive"> */}
            <RecordModal 
                toggle={() => {
                  this.toggleModal("update");
                }} modal={this.state.modal} modalType={this.state.modalType}
                toggleAdd={() => { this.toggleAddModal("update") }}
                toggleDelete={() => { this.toggleDelete("update") }}
                isMaster={this.state.isMaster}
              />

              <RecordQRModal 
                toggle={() => {
                  this.toggleQRModal("print");
                }}
                modal={this.state.qrModal}
              />
              

              <RecordDeleteModal 
                toggle={() => {
                  this.toggleDelete("update");
                }}
                toggleMain={() => {
                  this.toggleModal();
                }} 
                modal={this.state.deleteModal} modalType={this.state.modalType}
                isMaster={this.state.isMaster}
              />

              <RecordAddModal 
                  toggle={this.toggleAddModal} modal={this.state.addModal} 
                  modalType={this.state.addModalType} 
                  togglePrintable={() => {
                    this.toggleModal("update");
                  }}
                  Proceed={() => {
                    this.toggleModal("add");
                  }}
                  ProceedUpdate={() => {
                    this.toggleModal();
                    this.toggleModal("add");
                  }}
              />

              {/* <FileUpload /> */}
            <div className="custom-cards rounded-container box-shadow-container table-responsive">
              <h6 className="title-bar">{"CPreMM"}</h6>
              <hr/>
                <RecordTable
                toggleModal={() => {
                  this.toggleAddModal("add")
                }}
                
                title = {"Preventive Records"}

                filter = {((!this.state.isMaster)?{officeID: this.state.office}:{})}
                reducers = {{ get: SET_RECORDS_NEW, search: SET_SEARCHED_RECORDS_NEW }}
                toggle={ () => {
                  this.toggleModal("update")
                }}
                qrToggle={ () => {
                  this.toggleQRModal("print")
                }}
                isMaster={this.state.isMaster}
              />
            </div>
          </div>
        </div>
{/* 
        <div className="col-md-12">
            <CommentBox page="Record"/>
        </div> */}

      </div>
    );
  }

}



const mapStateToProps = (state) => ({
  recordNew: state.recordNew,
})

export default connect(mapStateToProps, {
  GetList,
})(Record);
