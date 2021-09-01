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
  ArrangeDate,
} from '../../../actions/helpers/displayAction';
import {
  UpdateRecordActions,
} from '../../../actions/recordNewAction';

import {
  SET_RECORD_VALUE_NEW,
} from '../../../actions/types';

class Table6 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }


  render() {
    var { record } = this.props.recordNew;
    console.log("-------------------->>>>;;;");
    console.log(this.props.recordNew);
    return (
      <div id="record-add-form-6" className="entry-form">
        <Card>
          <CardHeader tag="h3">Corrective Action(s) Taken</CardHeader>
          <CardBody>
            <div className="form-content">
              <div className="row">

                <div className="col-md-12">
                  <Card>
                    <CardHeader className="table-header" tag="h6">
                      <FaPlus className="add-button"
                        onClick={() => {
                          this.props.UpdateRecordActions();
                        }}
                      />
                      <span style={{ fontSize: "16px", fontWeight: "bold", marginLeft: "20px" }}>{ record.actions.length + " Action/s" }</span>
                    </CardHeader>
                    <CardBody>

                      {
                        record.actions.map((data, i) => {
                          return (
                            <div className="col-md-12 corrective-action">
                              <Card>
                                <CardHeader tag="h6">
                                  {i+1} - Action
                                  <FaTimes className="del-button"
                                    onClick={() => {
                                      this.props.UpdateRecordActions("-", i);
                                    }}
                                  />
                                </CardHeader>
                                <CardBody>
                                  <div>
                                    <div className="col-md-12">
                                      <LabelInput
                                        label="Property Code" value={record.actions[i].propertyCode} type="text" req={1}
                                        onChange={(e) => {
                                          this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                                        }} prop={"actions." + i + ".propertyCode"} case={1}
                                      />
                                    </div>
                                    <div className="col-md-12">
                                      <LabelInput
                                        label="Item" value={record.actions[i].item} type="text" req={1}
                                        onChange={(e) => {
                                          this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                                        }} prop={"actions." + i + ".item"} case={1}
                                      />
                                    </div>
                                    <div className="col-md-12">
                                      <LabelInput
                                        label="Findings" value={record.actions[i].findings} type="textarea" req={1}
                                        onChange={(e) => {
                                          this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                                        }} prop={"actions." + i + ".findings"} case={1}
                                      />
                                    </div>
                                    <div className="col-md-12">
                                      <LabelInput
                                        label="Action Taken" value={record.actions[i].actionTaken} type="textarea" req={1}
                                        onChange={(e) => {
                                          this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                                        }} prop={"actions." + i + ".actionTaken"} case={1}
                                      />
                                    </div>
                                    <div className="col-md-12">
                                      <LabelInput
                                        label="Date" value={(record.actions[i].date) ? (this.props.GetDate(new Date(record.actions[i].date))) : ""} type="date" req={1}
                                        onChange={(e) => {
                                          this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                                        }} prop={"actions." + i + ".date"} case={1}
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
                            <th>PROPERTY CODE</th>
                            <th>ITEM</th>
                            <th>FINDINGS</th>
                            <th>ACTION TAKEN	</th>
                            <th>DATE</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            record.actions.map((data, i) => {
                              return (
                                <tr>
                                  <td>
                                    <LabelInput
                                      value={record.actions[i].propertyCode} type="text" req={1}
                                      onChange={(e) => {
                                        this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                                      }} prop={"actions." + i + ".propertyCode"} case={1}
                                    />
                                  </td>
                                  <td>
                                    <LabelInput
                                      value={record.actions[i].item} type="text" req={1}
                                      onChange={(e) => {
                                        this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                                      }} prop={"actions." + i + ".item"} case={1}
                                    />
                                  </td>
                                  <td>
                                    <LabelInput
                                      value={record.actions[i].findings} type="textarea" req={1}
                                      onChange={(e) => {
                                        this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                                      }} prop={"actions." + i + ".findings"} case={1}
                                    />
                                  </td>
                                  <td>
                                    <LabelInput
                                      value={record.actions[i].actionTaken} type="textarea" req={1}
                                      onChange={(e) => {
                                        this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                                      }} prop={"actions." + i + ".actionTaken"} case={1}
                                    />
                                  </td>
                                  <td>
                                    <LabelInput
                                      value={(record.actions[i].date) ? (this.props.GetDate(new Date(record.actions[i].date))) : ""} type="date" req={1}
                                      onChange={(e) => {
                                        this.props.SetValue(e, SET_RECORD_VALUE_NEW);
                                      }} prop={"actions." + i + ".date"} case={1}
                                    />
                                  </td>
                                  <td>
                                    <FaTimes className="del-button"
                                      onClick={() => {
                                        this.props.UpdateRecordActions("-", i);
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
  ArrangeDate,
  UpdateRecordActions,
})(Table6);
