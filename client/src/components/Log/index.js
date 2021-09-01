import React, { Component } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

import { connect } from 'react-redux';

import {
  GetLogs,
  GetLog,
  ResolveLog,
} from '../../actions/helpers/logAction';

import CommentBox from '../helpers/CommentBox';
import LogTable from './Log_Table';
import LogModal from './Log_Modal';

class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.ShowLog = this.ShowLog.bind(this);
    this.toggle = this.toggle.bind(this);
    this.GetNextBatch = this.GetNextBatch.bind(this);
  }

  toggle(e) {
    this.setState({
      modal: !this.state.modal
    })
  }

  ShowLog (i){
    this.props.GetLog(i);
  }

  GetNextBatch (page){
    this.props.GetLogs(page);
  }

  componentWillMount(){
    this.props.GetLogs();
  }

  render() {
    const { log } = this.props;
    const totCount = ((log.logsCount.resolved)?log.logsCount.resolved:0) + ((log.logsCount.unresolved)?log.logsCount.unresolved:0);
    console.log(log);
    return (
      <div>
        <div id="" className="justify-content-center">
          <div className="custom-cards-container">
            <div className="custom-cards rounded-container box-shadow-container">
              <div>
                <div>
                {/*------------------------- MODAL -------------------------*/}
                  <LogModal toggle={this.toggle} modal={this.state.modal}/>
                </div>

                <div className="row" id="comment-log">
                  <div className="col-md-8">
                    <LogTable GetNextBatch ={this.GetNextBatch} toggle={this.toggle} logs = {log.logs} count={totCount} ShowLog={this.ShowLog}/>
                  </div>
                  <div className="col-md-4" id="log-count">
                    <div className="custom-container">
                      <div className="custom-container-title">
                        RECORDED ERROR LOGS
                      </div>
                      <div className="custom-container-body">
                        <h1 className="report-number">{ totCount }</h1>
                      </div>
                    </div>
                    <div className="row custom-container" id="other">
                      <div class="col-md-6">
                        <div className="custom-container-title">
                          RESOLVED
                        </div>
                        <div className="custom-container-body">
                          <h1 className="report-number">{log.logsCount.resolved}</h1>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div className="custom-container-title">
                          UNRESOLVED
                        </div>
                        <div className="custom-container-body">
                          <h1 className="report-number">{log.logsCount.unresolved}</h1>
                        </div>
                      </div>
                    </div>
                    <div className="row custom-container" id="other">
                      <div class="col-md-6">
                        <div className="custom-container-title">
                          VIEWED
                        </div>
                        <div className="custom-container-body">
                          <h1 className="report-number">{log.logsCount.viewed}</h1>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div className="custom-container-title">
                          UNVIEWED
                        </div>
                        <div className="custom-container-body">
                          <h1 className="report-number">{log.logsCount.unviewed}</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/*<CommentBox page="Registration"/>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  log: state.log
})

export default connect(mapStateToProps, {
  GetLogs,
  GetLog,
  ResolveLog,
})(Log);
