import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Progress } from 'reactstrap';
import { FaChartBar} from 'react-icons/fa';

import { 
  SET_RECORD_VALUE 
} from '../../../actions/types.js';
import {
  SubmitRegistration,
  DisplayTemp,
} from '../../../actions/types';

import CommentBox from '../../helpers/CommentBox';


import Table1 from './Table1';
import Table2 from './Table2';
import Table3 from './Table3';
import Table4 from './Table4';
import Table5 from './Table5';
import Table6 from './Table6';
import Table7 from './Table7';

class RecordSubForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: props.currentForm,
      modal: false,
      modalList: false,
    };

    this.changeForm = this.changeForm.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleList = this.toggleList.bind(this);
  }

  toggleList () {
    console.log(":::")
    this.setState({
      modalList: !this.state.modalList
    })
  }

  changeForm (val){
    if (val > 0){
      if (this.state.form < 6){
        this.setState({
          form: this.state.form + val
        });
      }
    }else if (val < 0){
      if (this.state.form > 1){
        this.setState({
          form: this.state.form + val
        });
      }
    }
  }

  toggle (val) {
    this.setState({
      modal: (val && typeof(val) == "boolean")?val:!this.state.modal
    });
  }

  render() {

    console.log(this.props);
    console.log(this.state);
    if (this.props.currentForm != this.state.form) {
      this.setState({
        form: this.props.currentForm
      })
    }

    var forms     = [Table1, Table2, Table3, Table4, Table5, Table6, Table7];
    var forNumObj = [1,2,3,4,5,6,7];

    const CurrentForm = forms[this.state.form-1];

    return (
      <div id="add-records-forms" className="page-content">


        <div className="col-md-12 form-numbers form-numbers-p">
            <div className="progress-bar-div">
              <Progress value={this.state.form} max="7" style={{height:"8px"}}/>
            </div>
            {forNumObj.map((i) => (
              <div style={{cursor:"pointer", margin:"0 0 0 115px"}} className={"form-number form-number-" + ((i <= this.state.form)?"done":"ongoing")}
                onClick={() => {
                  this.setState({form: i});
                  this.props.SetCurrentForm(i);
                }}
              >
                <span>{i}</span>
              </div>
            ))}
        </div>

        <div className="row" id="current-form">
          <CurrentForm changeForm={this.changeForm} toggle={this.toggle}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  record: state.record
})

export default connect(mapStateToProps, {

})(RecordSubForms);
