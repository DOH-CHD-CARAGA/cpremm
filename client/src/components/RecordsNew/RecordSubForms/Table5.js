import React from 'react';
import { connect } from 'react-redux';
import { 
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';

import { FaPlus, FaTimes } from 'react-icons/fa';
import LabelInput from '../../helpers/LabelInput';
import {
  GetDate,
} from '../../../actions/helpers/dateAction';

import {
  SetValue,
  GetList,
  ArrangeName,
  GetSafe
} from '../../../actions/helpers/displayAction';

import {
  SET_RECORD_VALUE_NEW,
} from '../../../actions/types';

class Table5 extends React.Component {
  
  constructor (props) {
    super(props);

    this.state = {
      route: "",
    }
  }


  render () {
    var { record } = this.props.recordNew;
    var sWare  = this.props.GetSafe(()=>{return record.devices.desktop.specs.sWare}, {});
    var dateChecked = {
      os: this.props.GetSafe(()=>{return sWare.dateChecked.os}, ""),
      office: this.props.GetSafe(()=>{return sWare.dateChecked.office}, ""),
      antivirus: this.props.GetSafe(()=>{return sWare.dateChecked.antivirus}, ""),
    }

    return (
      <div id="record-add-form-5" className="entry-form">
        <Card>
          <CardHeader tag="h3">(SOFTWARE) Fill in the dates of actual conducted</CardHeader>
          <CardBody>
            <div className="form-content">
              <div className="row">
                
                <div className="col-md-6">
                  <Card>
                    <CardHeader tag="h6"></CardHeader>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-12">
                          <LabelInput
                            label={"Check and Run Windows Update (Critical Updates) if necessary"} value={dateChecked.os} type="date" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.desktop.specs.sWare.dateChecked.os"} case={1}
                          />
                          <LabelInput
                            label={"Check for functionality and activation"} value={dateChecked.office} type="date" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.desktop.specs.sWare.dateChecked.office"} case={1}
                          />
                          <LabelInput
                            label={"Update & run antivirus definitions signatures"} value={dateChecked.antivirus} type="date" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.desktop.specs.sWare.dateChecked.antivirus"} case={1}
                          />
                        </div>
                      </div>

                    </CardBody>
                  </Card>  
                </div>


              </div>
            </div>

          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recordNew: state.recordNew
});

export default connect(mapStateToProps, {
  GetDate,
  SetValue,
  GetList,
  ArrangeName,
  GetSafe,
})(Table5);
