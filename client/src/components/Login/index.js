import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { SERVER_URI } from '../../config';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
// import CircularProgressbar from 'react-circular-progressbar';
import { Progress } from 'reactstrap';
// import 'react-circular-progressbar/dist/styles.css';
import DOHLogo from '../../images/DOHLogo3.png';

import {
  ToggleAlert,
} from '../../actions/helpers/alertAction';
import Alert from '../helpers/Alert';


class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.LogIn = this.LogIn.bind(this);
  }

  componentWillMount(){
  }

  LogIn () {
    axios.post(`${SERVER_URI}/api/user/login`, {
      username: this.state.username,
      password: this.state.password
    }).then(res => {
      localStorage.setItem('doh-jwt', res.data.token);
      localStorage.setItem('doh-user-status', res.data.info.status);
      localStorage.setItem('doh-user-designation', res.data.info.designation);
      localStorage.setItem('doh-user-name', JSON.stringify(res.data.info.name));
      localStorage.setItem('doh-user-role', JSON.stringify(res.data.info.role));
      localStorage.setItem('doh-user-routes', JSON.stringify(res.data.info.role.routes));
      localStorage.setItem('doh-user-off', JSON.stringify(res.data.info.office));
      var prev = localStorage.getItem('doh-prev-url');

      this.props.history.push((prev == "/login")?res.data.info.role.routes[0].path :prev);
      window.location.reload();

    }).catch(err => {
      // alert('Login Failed');
      this.props.ToggleAlert("failed", 'Login Failed', true);
    })    
  }


  render() {

    return (
      <div id="login" className="">
        <Alert/>
        <div className="row justify-content-center">
          <div className="align-self-center login-div-container">
            <div className="doh-logo">
              <img src={DOHLogo} className="d-inline-block align-top" alt="DOH LOGO"/>
            </div>
            <div className="login-inputs">
              <input spellcheck="false" className="form-control" value={this.state.username} onChange={(val) => {
                this.setState({
                  username: val.target.value
                })
              }} placeholder="username" type="text" style={{marginTop: 5}} onKeyPress={(e) => {
                if (e.key == "Enter") {
                  this.LogIn();
                }
              }}/>
              <input spellcheck="false" className="form-control" value={this.state.password} onChange={(val) => {
                this.setState({
                  password: val.target.value
                })
              }} placeholder="********" type="password"  style={{marginTop: 5}} onKeyPress={(e) => {
                if (e.key == "Enter") {
                  this.LogIn();
                }
              }}/>
              <br/>
              <button className="btn button-primary btn-block" id="login-butt" onClick={this.LogIn}  style={{marginTop: 5,borderRadius:0}}>LOGIN</button>

              <button className="btn button-primary btn-block" id="signup-butt" onClick={() => {
                this.props.history.push('/signup');
                // window.location.reload();                
              }}  style={{marginTop: 5}}>SIGN UP</button>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
})

export default withRouter(connect(mapStateToProps, {
  ToggleAlert,
})(LoginScreen));
