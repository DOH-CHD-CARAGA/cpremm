import React, { Component } from 'react';
import { Button, Label, Input, Col } from 'reactstrap';
import { connect } from 'react-redux';

import { SendUserLog, SetUserLog } from './../../actions/helpers/logAction';

const CommentBox = (props) =>  {
  // const fa = (props.alert.type == "Success") ? <FaCheckCircle className="fa-success"/> : <FaTimesCircle className="fa-success"/>;

  return (
    <div id="comment-box">
      <Label for="comment">Comment: </Label>
      <Input type="textarea" name="comment" value={props.log.userComment} data-props="currentLog.comment"
        onChange={(inpt) => {
          props.SetUserLog(inpt.target.value);
        }}
      />
      <Col sm={{ size: 4, offset: 8 }}>
        <Button outline color="secondary" size="sm" block onClick={()=> {
          props.SendUserLog(props.log.userComment, props.page);
        }} disabled={false}>Send</Button>
      </Col>
    </div>
  );
}

const mapStateToProps = (state) => ({
  log: state.log
})

export default connect(mapStateToProps, {
  SendUserLog,
  SetUserLog
})(CommentBox);
