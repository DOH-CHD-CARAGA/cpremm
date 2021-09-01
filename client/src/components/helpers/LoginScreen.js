import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authAction';
import * as EmailValidator from 'email-validator';

import '../../bootstrap/css/bootstrap.min.css';
import '../../css/custom.css';
import TranseekLogoWhite from '../../img/Transeek-logo.png';

class LoginScreen extends Component {

  constructor () {
    super();

    this.state = {
      email: '',
      password: '',
      showEmailError: false
    }
  }
  componentWillUnmount () {
    if (this.props.auth.signedIn) {
      this.props.gotoApp();
      return null;
    }
  }


  render() {
    var showLoginError = 'none';
    if (this.props.auth.signInFailed) {
      showLoginError = 'block';
    }



    let errorInput = '';
    if (this.state.showEmailError) {
      errorInput = 'error-input'
    }


    return (

      <div className="login-container">
          <img src={TranseekLogoWhite} className="login-transeek-logo" alt="Transeek Logo" />
          <div className="login-form">
            <h4>Sign In</h4>
            <hr/>
            <div className="form-group">
              <h4 style={{
                  textAlign:'center',
                  fontSize: 20,
                  color: 'red',
                  display: showLoginError
                }}>Invalid Credentials</h4>
              <label>Email</label>
              <input
                type="text"
                className={`form-control ${errorInput}`}
                value={this.state.email}
                onChange={(e) => {
                  if (!EmailValidator.validate(e.target.value)) {
                    this.setState({
                      email: e.target.value,
                      showEmailError: true
                    });
                  }else {
                    this.setState({
                      email: e.target.value,
                      showEmailError: false
                    });
                  }

                }}
                placeholder="juan@transeek.com"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={this.state.password}
                onChange={(e) => {
                  this.setState({
                    password: e.target.value
                  });
                }}
                placeholder="*******"/>
            </div>
            <hr style={{
                width:60
              }}/>
            <button
              onClick={(e) => {


                if (!this.state.showEmailError) {
                  this.props.login(this.state.email, this.state.password);
                }


                  e.preventDefault();
              }}
              className="btn btn-lg btn-block transeek-primary"
              type="button">
              Sign In
            </button>

            <p style={{
                textAlign: 'center',
                marginTop:'10px'
              }}>Forgot Passowrd?</p>
          </div>
        </div>

    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})
// export default ;
export default connect(mapStateToProps, { login })(LoginScreen);
// export default LoginScreen;
