import React from 'react';
import { connect } from 'react-redux';
import { Button, Col } from 'reactstrap';

import InfoModal from '../helpers/InfoModal';
import RecordAddForm from './RecordAddForm';
import RecordSubForms from './RecordSubForms';

import {
  addRecord,
  updateRecord,
  toggleSubmitted,
} from '../../actions/recordAction';

class RecordAddModal extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      page: "front",
      currentForm: 1,
    }

    this.SetCurrentForm = this.SetCurrentForm.bind(this);
  }

  SetCurrentForm (form) {
    this.setState({
      currentForm: form
    })
  }

  
  componentDidUpdate (){
    console.log("----------->>>>>>>>>>>;;;;;;;;");
    console.log(this.props.record.submitted);
    console.log(this.props.modal);
    console.log(this.state.currentForm);
    console.log(this.props.record.submitted && this.props.modal && this.state.currentForm != 1);
    if (this.props.record.submitted && this.props.modal && this.state.currentForm != 1){
      var timer = setTimeout(() => {
        this.setState({
          currentForm: 1
        })
        this.props.togglePrintable();
        this.props.toggleSubmitted();
        clearTimeout(timer);
      }, 2000);
    }
  }
  
  render () {
    var butts = [];
    console.log(this.props);
    if (this.state.currentForm == 6) {
      butts.push({type: "BACK", callback: () => {
        this.setState({currentForm: this.state.currentForm-1})
      }});

      if (this.props.modalType == "add"){
        butts.push({type: "PROCEED", callback: this.props.Proceed});
      }else if (this.props.modalType == "update"){
        butts.push({type: "PROCEED", callback: this.props.ProceedUpdate});
      }
  
    }else if (this.state.currentForm < 6 && this.state.currentForm > 1) {
      butts.push({type: "BACK", callback: () => {
        this.setState({currentForm: this.state.currentForm-1})
      }});
      butts.push({type: "NEXT", callback: () => {
        this.setState({currentForm: this.state.currentForm+1})
      }});
    }else {
      butts.push({type: "NEXT", callback: () => {
        this.setState({currentForm: this.state.currentForm+1})
      }});
    }
  
    return (
      <InfoModal
        size = {"90%"}
        modal = {this.props.modal}
        toggle = {this.props.toggle}
        title = {"New Record"}
        form = {
          <RecordSubForms 
            SetCurrentForm={this.SetCurrentForm} 
            currentForm={this.state.currentForm}
            modal = {this.props.modal}
          />
        }
        buttons = {butts}
      />
    );    
  }

}


const mapStateToProps = (state) => ({
  record: state.record
})

export default connect(mapStateToProps, {
  addRecord,
  updateRecord,
  toggleSubmitted,
})(RecordAddModal);
