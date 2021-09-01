import React, { Component } from 'react';
import { Col, Button, Modal, ModalBody, Spinner} from 'reactstrap';
import {FaCheckCircle, FaCircleNotch, FaTimesCircle} from 'react-icons/fa';
import { connect } from 'react-redux';

import {
  ToggleAlert
} from '../../actions/helpers/alertAction';

const Alert = (props) =>  {
  var timer = null;
  if (props.alert.type == "success") {
    timer = setTimeout(() => {
      props.ToggleAlert("", "", false);
      clearTimeout(timer);
    }, 1900);
  }else if (props.alert.type == "" && timer != null) {
    clearTimeout(timer);
    timer = null;
  }

  var fa;
  if (props.alert.type == "loading"){
      fa = <span style={{fontSize: "25px"}}> <FaCircleNotch className = "icon rotate" id="file-loading-icon"/> </span>;
  }else if (props.alert.type == "success"){
      fa = <FaCheckCircle className="fa-success"/>;
  }else if (props.alert.type == "failed") {
    fa = <FaTimesCircle className="fa-failed"/>;
  }

  var isOpen = props.alert.show;
  if (props.alert.type == "" || props.alert.type == undefined) {
    isOpen = false;
  }

  return (
    <div>
      <Modal id="modal-alert" isOpen={isOpen} fade={true} centered={true} toggle={props.ToggleAlert.bind(this, props.alert.type, props.alert.msg)}>
        <ModalBody>
          <div className="" style={{
            marginTop: 0,
            textAlign: "center"
          }}>
            <div className="item">
              {
                fa
              }
              {' '}
            </div>
            <div className="item">
              <span className="type">{props.alert.type}</span>
            </div>
            <div className="item">
              <span>{props.alert.msg}</span>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  alert : state.alert
})

export default connect(mapStateToProps, {
  ToggleAlert
})(Alert);
