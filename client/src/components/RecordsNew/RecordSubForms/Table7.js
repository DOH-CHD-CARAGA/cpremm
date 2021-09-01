import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';

import { FaPlus, FaTimes } from 'react-icons/fa';
import LabelInput from '../../helpers/LabelInput';
import Search2 from '../../helpers/Search2';
import {
  GetDate,
} from '../../../actions/helpers/dateAction';

import {
  SetValue,
  GetList,
  ArrangeName,
  UpperCaseFirstChar,
} from '../../../actions/helpers/displayAction';
import {
  UpdateRecordActions,
  UpdateOtherDevices,
} from '../../../actions/recordNewAction';

import {
  SET_REACT_SELECT_RECORD_OPTIONS_NEW,
} from '../../../actions/types';

class Table6 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentSearch: 1
    }
  }


  render() {
    var { record } = this.props.recordNew;
    console.log(record);
    return (
      <div id="record-add-form-7" className="entry-form">
        <Card>
          <CardHeader tag="h3">Other ICT Equipment(s) Issued</CardHeader>
          <CardBody>
            <div className="form-content">
              <div className="row">

                <div className="col-md-12">
                  <Card>
                    <CardHeader className="table-header" tag="h6">
                      <div className="row">
                        <div className="col-md-8"></div>
                        <div className="col-md-4">
                          <Search2
                            onChange={(val) => {
                              this.setState({
                                currentSearch: 1,
                                desktopKey: val,
                              });
                            }}
                            value={this.state.desktopKey}

                            title={"Search Device"}
                            options={[
                              { value: "ps", text: "----" },
                            ]}
                            filter={{}}
                            displaySelectOptions={false}
                            select={["serial", "propertyCode", "brand", "type"]}
                            api="device/get"
                            reducer={SET_REACT_SELECT_RECORD_OPTIONS_NEW}
                            minChar={1}
                            suggest={(this.state.currentSearch == 1) ? {
                              display: (data, callback) => {
                                return (
                                  <div className="row" onClick={() => {
                                    console.log(data);
                                    // callback(data.division + " - " + data.section);
                                    this.props.UpdateOtherDevices("+", data);

                                  }}>

                                    <div className="col-md-12 type">
                                      <div style={{ width: "100%" }}><span>{this.props.UpperCaseFirstChar(data.type)}</span></div>
                                    </div>

                                    <div className="col-md-12 detail">
                                      <div style={{ width: "20%" }}><span>{data.brand}</span></div>
                                      <div style={{ width: "30%" }}><span>{data.propertyCode}</span></div>
                                      <div style={{ width: "50%" }}><span>{data.serial}</span></div>
                                    </div>

                                  </div>
                                )
                              }
                            } : false}
                          />

                        </div>
                      </div>
                    </CardHeader>
                    <CardBody>

                      {
                        record.otherDevices.map((data, i) => {
                          return (
                            <div className="col-md-12 devices">
                              <Card>
                                <CardHeader tag="h6">
                                  {i+1} - Device
                                  <FaTimes className="del-button"
                                    onClick={() => {
                                      this.props.UpdateOtherDevices("-", undefined, i);
                                    }}
                                  />
                                </CardHeader>
                                <CardBody>
                                  <div>
                                    <div className="col-md-12">
                                      <LabelInput
                                        label="Item Description" value={data.type} type="text" req={1}
                                        onChange={(e) => {
                                          // this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                                        }} prop={""} case={1}
                                      />
                                    </div>
                                    <div className="col-md-12">
                                      <LabelInput
                                        label="Specification" value={data.brand} type="text" req={1}
                                        onChange={(e) => {
                                          // this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                                        }} prop={""} case={1}
                                      />
                                    </div>
                                    <div className="col-md-12">
                                      <LabelInput
                                        label="Serial #" value={data.serial} type="text" req={1}
                                        onChange={(e) => {
                                          // this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                                        }} prop={""} case={1}
                                      />
                                    </div>
                                    <div className="col-md-12">
                                      <LabelInput
                                        label="Property #" value={data.propertyNo} type="text" req={1}
                                        onChange={(e) => {
                                          // this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                                        }} prop={""} case={1}
                                      />
                                    </div>
                                    <div className="col-md-12">
                                      <LabelInput
                                        label="Status" value={data.status} type="select" req={1}
                                        options={[{ text: "In-Use", value: 1 }, { text: "Waste", value: 0 }]}
                                        onChange={(e) => {
                                          // this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                                        }} prop={""}
                                      />
                                    </div>

                                  </div>
                                </CardBody>
                              </Card>
                            </div>
                          )
                        })
                      }
{/* 
                      <table className="table table-hover table-striped">
                        <thead>
                          <tr>
                            <th>Item Description</th>
                            <th>Specification</th>
                            <th>Serial #</th>
                            <th>Property #</th>
                            <th>Status</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            record.otherDevices.map((data, i) => {
                              return (
                                <tr>
                                  <td>
                                    {data.type}
                                  </td>
                                  <td>
                                    {data.brand}
                                  </td>
                                  <td>
                                    {data.serial}
                                  </td>
                                  <td>
                                    {data.propertyNo}
                                  </td>
                                  <td>
                                    {(data.status) ? "WORKING" : "WASTED"}
                                  </td>
                                  <td>
                                    <FaTimes className="del-button"
                                      onClick={() => {
                                        this.props.UpdateOtherDevices("-", undefined, i);

                                        // this.props.UpdateRecordActions("-", i);
                                      }}
                                    />
                                  </td>
                                </tr>

                              )
                            })
                          }


                        </tbody>
                      </table> */}

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
  UpdateRecordActions,
  UpdateOtherDevices,
  UpperCaseFirstChar,
})(Table6);
