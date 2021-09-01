import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Label, Button, Col } from 'reactstrap';
import LabelInput from '../../helpers/LabelInput';
import axios from 'axios';
import { SERVER_URI } from '../../../config';

import { 
    savePassword
} from '../../../actions/userAction';

class ChangePassModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
        password: {
            old: "",
            new: "",
            new2: "",
        },
        oldPasswordValid: false
    };

    this.passwordInput = this.passwordInput.bind(this);
    this.OldPasswordMatch = this.OldPasswordMatch.bind(this);
    this.newPasswordMatch = this.newPasswordMatch.bind(this);
    this.isValidNewPassword = this.isValidNewPassword.bind(this);
  }

  passwordInput (e, type) {
      this.setState({
          password: {
              ...this.state.password,
              [type]: e.target.value
          }
      })
  }

  OldPasswordMatch (password) {
      if (password.length > 7){
        axios({
            url: `${SERVER_URI}/api/user/checkpassword`,
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('jvv-jwt'),
            },
            params: {
                password: password
            }
          })
          .then(res => {
              this.setState({
                  oldPasswordValid: res.data
              })
          })
          .catch(err => {
            return false;
          });
      } else {
          return false;
      }

  }

  newPasswordMatch () {
    return (this.state.password.new === this.state.password.new2 && this.state.password.new2 != "");
  }

  isValidNewPassword () {
    return (this.state.password.new.length > 7);
  }

  render() {
    const newPM = this.newPasswordMatch(), isVNP = this.isValidNewPassword();
    const ableToSave = (this.state.oldPasswordValid && newPM && isVNP)?true:false;

    var mess = "";
    // mess  = (!this.state.oldPasswordValid && this.state.password.old != "")?"Old Password Did'nt Match":"";
    // mess += (!newPM && this.state.password.new != "")?"New Password Did'nt Match":((mess != "")?" | ":"");
    // mess += (!isVNP && this.state.password.new != "")?"Invalid New Password":((mess != "")?" | ":"");


    return (
      
        <div id="change-pass-modal">
    
            <Modal id="ci-modal" isOpen={this.props.modal} fade={true} toggle={this.props.toggle} style={{maxWidth: "40%"}}>
                <ModalHeader style={{borderBottom: 'none'}} toggle={this.props.toggle}>Change Password</ModalHeader>
                <ModalBody>
                    <div className="form-content">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="input-grp">
                                    <LabelInput
                                        label={"Old Password"} value={this.state.password.old} type="password"
                                        onChange={(e) => {
                                            this.passwordInput(e, "old");  
                                            this.OldPasswordMatch(e.target.value);                                          
                                        }}
                                    />
                                </div>
                            </div>       
                        </div>      
                        <div className="row">
                            <div className="col-md-12">
                                <div className="input-grp">
                                    <LabelInput
                                        label={"New Password"} value={this.state.password.new} type="password"
                                        onChange={(e) => {
                                            this.passwordInput(e, "new");                                            
                                        }}
                                    />
                                </div>
                            </div>       
                        </div>    
                        <div className="row">
                            <div className="col-md-12">
                                <div className="input-grp">
                                    <LabelInput
                                        label={"Confirm New Password"} value={this.state.password.new2} type="password"
                                        onChange={(e) => {
                                            this.passwordInput(e, "new2");                                            
                                        }}
                                    />
                                </div>
                            </div>       
                        </div> 
                        <hr/>
                        <i>{mess}</i>   
    
                    </div>
    
                </ModalBody>
                <ModalFooter style={{borderTop: 'none'}}>
                    <Col sm={{ size: 3 }}>
                        <Button size="md" disabled={!ableToSave} className="button-orange-gradient" color="primary" onClick={() => {
                            this.props.savePassword(this.state.password.new);
                        }}>Save</Button>
                    </Col>
                </ModalFooter>
            </Modal>        
    
        </div>
    
      );    
  }

}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
    savePassword
})(ChangePassModal);
