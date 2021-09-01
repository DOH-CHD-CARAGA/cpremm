import React, { Component, Fragment } from 'react';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { MdDevicesOther, MdAssignment, MdAssignmentLate } from 'react-icons/md';


class QRScan extends Component {
   constructor(props) {
      super(props);
      this.state = {

      };
   }



   render() {

      return (
         <div id="qr-scan-main">
            <label className="home-butt" onClick={() => {
               this.props.history.push("/");
            }}>
               Dashboard
            </label><br/>
            <div className="scan-types" onClick={() => {
               this.props.history.push("/qr-scan-preventive");
            }}>
               <MdAssignment />
               <span>Preventive</span>
            </div>
            <div className="scan-types" onClick={() => {
               this.props.history.push("/qr-scan-corrective");
            }}>
               <MdAssignmentLate />
               <span>Corrective</span>
            </div>
            <div className="scan-types" onClick={() => {
               this.props.history.push("/qr-scan-device");
            }}>
               <MdDevicesOther />
               <span>Device</span>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
})

export default withRouter(connect(mapStateToProps, {
})(QRScan));

