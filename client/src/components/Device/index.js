import React from 'react';
import { connect } from 'react-redux';

import { Button } from 'reactstrap';

import {
  GetList,
} from '../../actions/helpers/displayAction';

import {
  SET_DEVICES,
  SET_SEARCHED_DEVICES,
} from './../../actions/types';

import DeviceTable from './DeviceTable';
import DeviceModal from './DeviceModal';
import DeviceDeleteModal from './DeviceDeleteModal';
import CommentBox from '../helpers/CommentBox';
import DeviceQRModal from './DeviceQRModal';

class Device extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalDelete: false,
      modalType: "",
      qrModal: false,
      office: JSON.parse(localStorage.getItem('doh-user-off'))._id,
      role: JSON.parse(localStorage.getItem('doh-user-role'))._id,
      isMaster: (JSON.parse(localStorage.getItem('doh-user-role')).name == "Master" || JSON.parse(localStorage.getItem('doh-user-role')).name == "KM-ICT USER") ? true : false
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalDelete = this.toggleModalDelete.bind(this);
    this.toggleQRModal = this.toggleQRModal.bind(this);

    console.log("::::::::::::::::::::::::::::::;;;");
    console.log(((!this.state.isMaster) ? { officeID: this.state.office } : undefined));

    props.GetList("device/get", SET_DEVICES, 1, 10, ((!this.state.isMaster) ? { officeID: this.state.office } : undefined));
  }

  toggleQRModal(type) {
    this.setState({
      qrModal: !this.state.qrModal,
      modalType: type,
    });
  }

  toggleModal(type) {
    this.setState({
      modal: !this.state.modal,
      modalType: type,
    });
  }

  toggleModalDelete(type) {
    this.setState({
      modalDelete: !this.state.modalDelete,
      modalType: type,
    });
  }

  render() {
    return (

      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="custom-cards-container">
            <div className="custom-cards rounded-container box-shadow-container table-responsive">
            <h6 className="title-bar">{"CPreMM"}</h6>
            <hr/>
              <DeviceModal
                toggle={this.toggleModal} modal={this.state.modal} modalType={this.state.modalType}
                toggleDelete={this.toggleModalDelete}
              />

              <DeviceDeleteModal
                toggle={() => {
                  this.toggleModalDelete("update");
                }}
                toggleMain={() => {
                  this.toggleModal();
                }}
                modal={this.state.modalDelete} modalType={this.state.modalType}
                isMaster={this.state.isMaster}
              />

              <DeviceQRModal
                toggle={() => {
                  this.toggleQRModal("update");
                }}
                modal={this.state.qrModal}
              />

              <DeviceTable
                toggleModal={this.toggleModal}
                title={"Devices"}
                filter={((!this.state.isMaster) ? { officeID: this.state.office } : {})}
                reducers={{ get: SET_DEVICES, search: SET_SEARCHED_DEVICES }}
                toggle={() => {
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

        {/* <div className="col-md-12">
            <CommentBox page="Device"/>
        </div> */}

      </div>
    );
  }

}



const mapStateToProps = (state) => ({
  device: state.device,
})

export default connect(mapStateToProps, {
  GetList,
})(Device);
