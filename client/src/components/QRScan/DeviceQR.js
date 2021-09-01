import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DeviceForm from '../Device/DeviceForm';
import QRCodeScanner from '../helpers/QRCodeScanner';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { IoMdQrScanner } from 'react-icons/io';
import {
   FormGroup, Label, Input, Button,
} from 'reactstrap';

import {
   GetList,
} from '../../actions/helpers/displayAction';

import {
   SET_DEVICE_QR_FETCH_DATE,
} from './../../actions/types';

import {
   SubmitDevice,
   SetDeviceDefault,
} from '../../actions/deviceAction';

class DeviceQR extends Component {
   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: '',
         currentForm: 1,
         scan: false,
         scanned: false,
         qr: "",
         searchAuto: true,
      };
      this.SetCurrentForm = this.SetCurrentForm.bind(this);
      this.QRScanToggle = this.QRScanToggle.bind(this);
      this.GetFetchData = this.GetFetchData.bind(this);

   }

   SetCurrentForm(form) {
      this.setState({
         currentForm: form
      })
   }

   componentWillMount() {
   }

   QRScanToggle() {
      this.setState({
         scan: !this.state.scan
      })
   }

   GetFetchData(data) {
      console.log("::::::::_!!!!!!!!!!!!!!!");
      console.log(data);

      if (data != null) {
         this.setState({
            scanned: true,
            qr: data
         })
      } else {
         this.setState({
            scanned: false
         })
      }
   }


   render() {

      const { device, submitted } = this.props.device;
      console.log(device);
      console.log(submitted);

      if (submitted) {

         var timer = setTimeout(() => {
            this.setState({
               currentForm: 1
            })

            clearTimeout(timer);
         }, 2200);


         this.props.toggleSubmitted();
      }

      return (
         <div id="qr-scan-preventive" className="corrective">
            <label className="home-butt" onClick={() => {
               this.props.history.push("/qr");
            }}>
               QR
            </label>
            <label className="home-butt" onClick={() => {
               this.props.history.push("/");
            }}>
               Dashboard
            </label><br/>
            
            <label>
               Device
            </label>
            {
               (device._id && device._id != "")
                  ? <Fragment>
                     <div className="qr-div">
                        <IoMdQrScanner onClick={() => {
                           this.props.SetDeviceDefault();
                           this.QRScanToggle();
                        }} />
                     </div>

                     <DeviceForm modalType="update" />

                     <div className="button-div">
                        <Button className="button-orange-gradient" disabled={false}
                           onClick={this.props.SubmitDevice}>
                           <span>Save</span>
                        </Button>

                     </div>

                  </Fragment>

                  : <Fragment>
                     <div className="qr-scan-propmt">
                        {
                           (this.state.scan)
                              ?
                              !this.state.scanned
                                 ? <div className="qr-scan-feed">
                                    <QRCodeScanner dataFetch={this.GetFetchData} />
                                 </div>
                                 : (!this.state.searchAuto)
                                    ? <div id="scanned-notif-div">
                                       <span>ID FOUND</span><br />
                                       <FormGroup check>
                                          <Label check>
                                             <Input type="checkbox" value={this.state.searchAuto} onChange={(e) => {
                                                this.setState({
                                                   searchAuto: e.target.checked
                                                })
                                             }} />
                                             Search Automatically
                                          </Label><br />
                                          <Button className="button-orange-gradient" onClick={() => {
                                             this.props.GetList("device/get", SET_DEVICE_QR_FETCH_DATE, 1, 10, { _id: this.state.qr });
                                          }}>Search</Button>
                                       </FormGroup>
                                    </div>
                                    : (() => {
                                       console.log("AAAAAAAAAAS");
                                       this.setState({
                                          scan: false,
                                          scanned: false,
                                       })
                                       this.props.GetList("device/get", SET_DEVICE_QR_FETCH_DATE, 1, 10, { _id: this.state.qr });
                                    })()
                              : <div className="qr-scan-propmt-div">
                                 <span onClick={this.QRScanToggle}>Click to Scan</span>
                                 <IoMdQrScanner onClick={this.QRScanToggle} />
                              </div>
                        }
                        {/* <QRCodeScanner /> */}
                     </div>
                  </Fragment>
            }



         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   device: state.device
})

export default withRouter(connect(mapStateToProps, {
   GetList,
   SubmitDevice,
   SetDeviceDefault,
})(DeviceQR));

