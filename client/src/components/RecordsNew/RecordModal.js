import React from 'react';
import { connect } from 'react-redux';
import { Button, Col } from 'reactstrap';

import InfoModal from '../helpers/InfoModal';
import RecordPrintableFormFront from './RecordPrintableFormFront';
import RecordPrintableFormBack from './RecordPrintableFormBack';

import {
  addRecord,
  updateRecord,
  SubmitRecord,
} from '../../actions/recordNewAction';

class RecordModal extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      page: "front",
    }
  }
  
  render () {
    var butts = [
      {type: "PRINT", callback: () => {}}
    ];  

    if (this.props.isMaster) {

      if (this.props.modalType == "update") {
        butts.unshift({type: "UPDATE", callback: () => {
          this.props.toggle();
          this.props.toggleAdd();
        }});

        butts.unshift({type: "DELETE", callback: () => {
          this.props.toggleDelete();
        }});

      } else {
        butts.unshift({type: "SUBMIT", callback: this.props.SubmitRecord});
      }
    }
  
    return (
      <InfoModal
        size = {"90%"}
        modal = {this.props.modal}
        toggle = {this.props.toggle}
        modalHeaderAddOns = {
          <Col sm={{ size: 3 }}>
            <Button size="sm" color="primary" onClick={() => {
              this.setState({
                page: (this.state.page === "front")?"back":"front"
              })
            }}>{(this.state.page === "front")?"Go to Back":"Go to Front"}</Button>
          </Col>
        }
        title = {"Record Form: " + ((this.state.page === "front")?"Front Page":"Back Page")}
        form = {
          (this.state.page === "front")
           ?<RecordPrintableFormFront modalType={this.props.modalType}/>
           :<RecordPrintableFormBack modalType={this.props.modalType}/>
        }
        buttons = {butts}
      />
    );    
  }

}


const mapStateToProps = (state) => ({
  recordNew: state.recordNew
})

export default connect(mapStateToProps, {
  addRecord,
  updateRecord,
  SubmitRecord,
})(RecordModal);
