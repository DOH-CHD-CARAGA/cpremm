import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import JobOrderRequestForm from '../JobOrderRequest/JobOrderRequestForm';
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
   SET_JO_REQ_QR_FETCH_DATE,
} from './../../actions/types';

import {
   addJobOrderRequest,
   SetJobOrderRequestDefault,
} from '../../actions/jobOrderRequestAction';

class Corrective extends Component {
   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: '',
         scan: false,
         scanned: false,
         qr: "",
         searchAuto: true,
      };
      this.QRScanToggle = this.QRScanToggle.bind(this);
      this.GetFetchData = this.GetFetchData.bind(this);

   }

   componentWillMount() {
   }

   QRScanToggle(val = null) {
      this.setState({
         scan: (val == null) ? !this.state.scan : val
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

      const { jobOrderRequest, submitted } = this.props.jobOrderRequest;
      console.log(this.state);
      console.log(submitted);

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
               Corrective
            </label>
            {
               (jobOrderRequest.device._id && jobOrderRequest.device._id != "")
                  ? <Fragment>
                     <div className="qr-div">
                        <IoMdQrScanner onClick={() => {
                           this.props.SetJobOrderRequestDefault();
                           this.QRScanToggle();
                        }} />
                     </div>

                     <JobOrderRequestForm modalType="update" />

                     <div className="button-div">
                        <Button className="button-orange-gradient" disabled={false}
                           onClick={() => {
                              this.props.addJobOrderRequest(() => {
                                 this.setState({
                                    scanned: false,
                                 });
                                 this.props.SetJobOrderRequestDefault();
                                 this.QRScanToggle(false);

                              });
                           }}>
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
                                             this.props.GetList("device/get", SET_JO_REQ_QR_FETCH_DATE, 1, 10, { _id: this.state.qr });
                                          }}>Search</Button>
                                       </FormGroup>
                                    </div>
                                    : (() => {
                                       console.log("AAAAAAAAAAS");
                                       this.setState({
                                          scan: false,
                                          scanned: false,
                                       })
                                       this.props.GetList("device/get", SET_JO_REQ_QR_FETCH_DATE, 1, 10, { _id: this.state.qr });
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
   jobOrderRequest: state.jobOrderRequest
})

export default withRouter(connect(mapStateToProps, {
   GetList,
   addJobOrderRequest,
   SetJobOrderRequestDefault,
})(Corrective));

