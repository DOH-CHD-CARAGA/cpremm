import React, { Component } from 'react';
import DiMakita from '../../images/404Not-Found.png';
import { USER_ROUTES } from '../../config';

class ErrorScreen extends Component {
  
  render() {
    var routes = JSON.parse(localStorage.getItem(USER_ROUTES));
    console.log("+++++++++++++++++++++++++::::::::::::::::::");
    console.log(routes[0].path);

    return (
      <div id="content-not-found" className="justify-content-center">
        <button onClick={()=>{
          console.log(":::::::::::AAAAAAAAAAAAAA");
          this.props.history.push(routes[0].path);
          // window.location.reload();
        }}>Home</button><br/><br/>
        <button onClick={()=>{
          console.log(":::::::::::AAAAAAAAAAAAAA");
          this.props.history.push("/qr");
          // window.location.reload();
        }}>QR</button>
        <img src={DiMakita} id="error-img" className="d-inline-block align-top" alt="404"/>
      </div>
    );
  }
}

export default ErrorScreen;
