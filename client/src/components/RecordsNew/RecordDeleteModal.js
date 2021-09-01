import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Col } from 'reactstrap';

import InfoModal from '../helpers/InfoModal';

import {
  deleteRecord
} from '../../actions/recordNewAction';

class RecordDeleteModal extends React.Component {

  constructor (props) {
    super(props);
    this.state = {

    }

  }
  
  render () {
    
  
    return (
      <InfoModal
        size = {"20%"}
        modal = {this.props.modal}
        toggle = {this.props.toggle}
        title = {""}
        fade={true}
        form = {
          <Fragment>
            <span>Delete this record?</span>
            <div className="row" style={{margin: 0, marginTop: "10px"}}>
              <div className="col-md-3" style={{paddingLeft: 0}}>
                <Col sm={{ size: 2 }} style={{paddingLeft: 0}}>
                  <Button size="sm" className="button-orange-gradient" color="primary" onClick={async ()=>{
                    var res = await this.props.deleteRecord();
                    console.log("::::::::>>>>>>>>>>>>>>>>>");
                    console.log(res);

                    if (res) {
                      var timer = setTimeout(() => {
                        this.props.toggle();
                        clearTimeout(timer);
                      }, 2000);

                      var timer2 = setTimeout(() => {
                        this.props.toggleMain();
                        clearTimeout(timer2);
                      }, 2200);
                    }

                  }}>YES</Button>
                </Col>
              </div>

              <div className="col-md-3" style={{paddingLeft: 0}}>
                <Col sm={{ size: 2 }} style={{paddingLeft: 0}}>
                  <Button size="sm" className="button-orange-gradient" color="primary" onClick={()=>{
                    this.props.toggle();
                  }}>NO</Button>
                </Col>
              </div>
            </div>
          </Fragment>
        }
        buttons = {[]}
      />
    );    
  }

}


const mapStateToProps = (state) => ({
  recordNew: state.recordNew
})

export default connect(mapStateToProps, {
  deleteRecord,
})(RecordDeleteModal);
