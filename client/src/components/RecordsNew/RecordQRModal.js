import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Col } from 'reactstrap';

import InfoModal from '../helpers/InfoModal';
import QRCode from '../helpers/QRCode';

import {
  GetSafe,
} from '../../actions/helpers/displayAction';

class RecordQRModal extends React.Component {

  constructor (props) {
    super(props);
    this.state = {

    }

  }
  
  render () {
    
    const { toPrintQR } = this.props.recordNew;
    console.log("____!!!!!!!!!@@@@@@@@@@")
    console.log(toPrintQR)
  
    return (
      <InfoModal
        size = {"90%"}
        modal = {this.props.modal}
        toggle = {this.props.toggle}
        title = {""}
        fade={true}
        id="qr-modal"
        form = {
          <div className="row">
              {
                toPrintQR.map((data) => {
                  console.log(data);
                  return (
                    <div className="col-md-2 qr" >
                      <QRCode value={data._id} type="Set" text={this.props.GetSafe(()=> {return data.devices.desktop.serial || data.devices.desktop.propertyCode}, "")}/>
                      <span>{(data.text.division.length < 10)?data.text.division + " - " + data.text.section:data.text.division}</span>
                      <span>{data.text.userPAR}</span>
                      <span>{data.text.userCO}</span>
                    </div>
                  )
                })
              }             
          </div>
        }
        buttons = {[{type: "PRINT", callback: () => {}}]}
      />
    );    
  }

}


const mapStateToProps = (state) => ({
  recordNew: state.recordNew
})

export default connect(mapStateToProps, {
  GetSafe,
})(RecordQRModal);
