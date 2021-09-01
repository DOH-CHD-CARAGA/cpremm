/*
  Splash Screen or Loading SCreen\
  Diri icheck if naka login ba ang Admin
  if wala pa
    gotoLogin
  if nakalogin na
    gotoApp

*/

import { connect } from 'react-redux';

import React, { Component } from 'react';

import { ConnectSocket } from '../../actions/helpers/socketAction';

class SplashScreen extends Component {

  constructor () {
    super();

    this.state = {
      loggedIn: false
    }
  }



  componentWillMount() {
    this.props.ConnectSocket();
    const jwt = localStorage.getItem('jwt');

    if (jwt == '' || jwt == null) {
      this.props.gotoApp();
      // this.props.gotoLogin();
    }else {
      this.props.gotoApp();
    }
    // setTimeout(() => {
    //   this.props.gotoLogin();
    //   // this.props.gotoApp();
    // }, 2000)
  }




  render() {

    return (

      <div className="login-container">
        <h1>Preparing...</h1>
      </div>

    );
  }
}


const mapStateToProps = (state) => ({
  auth: state.auth
})
// export default ;
export default connect(mapStateToProps, {
  ConnectSocket
})(SplashScreen);
