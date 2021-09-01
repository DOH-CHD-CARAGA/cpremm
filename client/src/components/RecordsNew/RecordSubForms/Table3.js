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
  GetSafe,
} from '../../../actions/helpers/displayAction';

import {
  SET_RECORD_VALUE_NEW,
} from '../../../actions/types';


class Table3 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      route: "",
    }
  }


  render() {
    var { record } = this.props.recordNew;

    var dateChecked = {
      motherBoard: this.props.GetSafe(() => { return record.devices.desktop.dateChecked.motherBoard }, ""),
      processors: this.props.GetSafe(() => { return record.devices.desktop.dateChecked.processors }, ""),
      memCards: this.props.GetSafe(() => { return record.devices.desktop.dateChecked.memCards }, ""),
      hardDisk: this.props.GetSafe(() => { return record.devices.desktop.dateChecked.hardDisk }, ""),
      monitor: this.props.GetSafe(() => { return record.devices.desktop.dateChecked.monitor }, ""),
      ups: this.props.GetSafe(() => { return record.devices.desktop.dateChecked.ups }, ""),
      avr: this.props.GetSafe(() => { return record.devices.desktop.dateChecked.avr }, ""),
      keyboardMouse: this.props.GetSafe(() => { return record.devices.desktop.dateChecked.keyboardMouse }, ""),
      printers: this.props.GetSafe(() => { return record.devices.desktop.dateChecked.printers }, ""),
      scanners: this.props.GetSafe(() => { return record.devices.desktop.dateChecked.scanners }, ""),
    }

    return (
      <div id="record-add-form-3" className="entry-form">
        <Card>
          <CardHeader tag="h4">(HARDWARE) Fill in the dates of actual conducted</CardHeader>
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
                            label={"Check physical condition, clean with vacuum cleaner and blower"} value={dateChecked.motherBoard} type="date"
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.desktop.specs.hWare.dateChecked.motherBoard"} case={1}
                          />

                          <LabelInput
                            label={"Clean heatsink fans and remove clog dust"} value={dateChecked.processors} type="date"
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.desktop.specs.hWare.dateChecked.processors"} case={1}
                          />
                          <LabelInput
                            label={"Clean contacts of the memory modules"} value={dateChecked.memCards} type="date"
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.desktop.specs.hWare.dateChecked.memCards"} case={1}
                          />
                          <LabelInput
                            label={"Check disk space with tleast 25% free disk of the total drive"} value={dateChecked.hardDisk} type="date"
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.desktop.specs.hWare.dateChecked.hardDisk"} case={1}
                          />
                          <LabelInput
                            label={"Check for functionality and clean"} value={dateChecked.v} type="date"
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.desktop.specs.hWare.dateChecked.ups"} case={1}
                          />
                        </div>
                      </div>

                    </CardBody>
                  </Card>
                </div>

                <div className="col-md-6">
                  <Card>
                    <CardHeader tag="h6"></CardHeader>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-12">
                          <LabelInput
                            label={"Check for functionality and clean"} value={dateChecked.avr} type="date"
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.desktop.specs.hWare.dateChecked.avr"} case={1}
                          />
                          <LabelInput
                            label={"Clean monitors & check for functionality"} value={dateChecked.monitor} type="date"
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.desktop.specs.hWare.dateChecked.monitor"} case={1}
                          />
                          <LabelInput
                            label={"Check for functionality and clean"} value={dateChecked.keyboardMouse} type="date"
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.desktop.specs.hWare.dateChecked.keyboardMouse"} case={1}
                          />
                          <LabelInput
                            label={"Clean and check Printer physical status"} value={dateChecked.printers} type="date"
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.desktop.specs.hWare.dateChecked.printers"} case={1}
                          />
                          <LabelInput
                            label={"Check for functionality and clean"} value={dateChecked.scanners} type="date"
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                            }} prop={"devices.desktop.specs.hWare.dateChecked.scanners"} case={1}
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
})(Table3);
