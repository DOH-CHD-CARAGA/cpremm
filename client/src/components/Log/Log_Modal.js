import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Col, Input, Button
} from 'reactstrap';
import { Form, FormGroup, Label, FormText } from 'reactstrap';
import {
  ArrangeDate,
} from '../../actions/helpers/displayAction';
import {
  ResolveLog,
  SetLogComment,
} from '../../actions/helpers/logAction.js';
const LogModal = (props) => {
  const pad = {
    padding:"0 0 0 5px",
  };
  const { currentLog } = props.log;
  return (
    <Modal id="log-modal" isOpen={props.modal} fade={true} toggle={props.toggle} style={{maxWidth: "40%"}}>
      <ModalHeader toggle={props.toggle}>LOG</ModalHeader>
      <ModalBody>
      <Form>
        <div className="custom-container">
          <div className="custom-container-title">
            LOG DETAIL
          </div>
          <div className="custom-container-body ">
            <Form>
              <FormGroup>
                <Label for="fname">Functionality: </Label>
                <Input type="text" name="fname" value={currentLog.functionality}/>

                <Label for="mname">Message: </Label>
                <Input type="text" name="mname" value={currentLog.message}/>

                <Label for="lname">Location: </Label>
                <Input type="text" name="lname" value={currentLog.location}/>

                <Label for="date">Date: </Label>
                <Input type="text" name="date" value={props.ArrangeDate(currentLog.date)}/>

                <Label for="comment">Resolve-Comment: </Label>
                <Input type="textarea" name="comment" value={currentLog.comment} data-props="currentLog.comment"
                  onChange={(inpt) => {
                    if (!currentLog.resolved){
                      props.SetLogComment(inpt.target.value, currentLog._id);
                    }
                  }}
                />

              </FormGroup>
            </Form>
          </div>
        </div><br/>
      </Form>
      </ModalBody>
      <ModalFooter>
        <Col style={pad} sm={{ size: 4, offset: 0 }} hidden={currentLog.resolved}>
          <Button outline color="secondary" size="lg" block onClick={()=> {
            props.ResolveLog(currentLog._id, currentLog.comment);
          }} disabled={(!currentLog.comment)?true:false}>Resolved</Button>
        </Col>
      </ModalFooter>
    </Modal>
  );
}

const mapProps = (state) => ({
  log: state.log
})

export default connect(mapProps, {
  ArrangeDate,
  SetLogComment,
  ResolveLog
})(LogModal);
