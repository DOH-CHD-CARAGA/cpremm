import React from 'react';
import { connect } from 'react-redux';
import { 
  Card,
  CardHeader,
  CardBody,
  Label,
} from 'reactstrap';
import CreatableSelect from 'react-select/creatable';
import { FaPlus, FaTimes } from 'react-icons/fa';
import LabelInput from '../../helpers/LabelInput';
import Search2 from '../../helpers/Search2';

import {
  GetDate,
} from '../../../actions/helpers/dateAction';

import {
  SetValue,
  SetValue2,
  GetList,
  ArrangeName,
} from '../../../actions/helpers/displayAction';

import {
  SetUserRecordEntry,
} from '../../../actions/recordAction';

import {
  SET_RECORD_VALUE,
  SET_REACT_SELECT_RECORD_OPTIONS,
} from '../../../actions/types';

class Table1 extends React.Component {
  
  constructor (props) {
    super(props);

    this.state = {
      route: "",
      currentSearch: 1,
    }
  }


  render () {

    var { record, recordDefault } = this.props.record;
    console.log(record);

    return (
      <div id="record-add-form-1" className="entry-form">
        <Card>
          <CardHeader tag="h5">Primary Details</CardHeader>
          <CardBody>
            <div className="form-content">
              <div className="row">
                <div className="col-md-8">
                  <Card>
                    <CardHeader tag="h6">Unit</CardHeader>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-6">
                          <LabelInput
                            label={"Property Code"} value={record.propertyCode} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE);
                            }} prop={"propertyCode"} case={1}
                          />
                          <LabelInput
                            label={"Serial"} value={record.serial} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE);
                            }} prop={"serial"} case={1}
                          />
                          <LabelInput
                            label={"Unit Type"} value={record.unitType} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE);
                            }} prop={"unitType"} case={1}
                          />
                          <div className="row">
                            <div className="col-md-6">
                              <LabelInput
                                label={"Brand"} value={record.brand} type="text" req={1}
                                onChange={(e) => {
                                  this.props.SetValue(e, SET_RECORD_VALUE);
                                }} prop={"brand"} case={1}
                              />
                            </div>
                            <div className="col-md-6">
                              <LabelInput
                                label={"Model"} value={record.model} type="text" req={1}
                                onChange={(e) => {
                                  this.props.SetValue(e, SET_RECORD_VALUE);
                                }} prop={"model"} case={1}
                              />                            
                            </div>
                            
                          </div>
                          
                          <LabelInput
                            label={"MAC Address"} value={record.mac} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE);
                            }} prop={"mac"} case={1}
                          />
                        </div>

                        <div className="col-md-6">
                          <LabelInput
                            label={"Specs"} value={record.specs.hWare.cpu} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE);
                            }} prop={"specs.hWare.cpu"} case={1}
                          />
                          <LabelInput
                            label={"Date Acquired"} value={(record.dateAcquired)?(this.props.GetDate(new Date(record.dateAcquired))):""} type="date" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE);
                            }} prop={"dateAcquired"} case={1}
                          />
                          <LabelInput
                            label={"Purchased"} value={record.purchased} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE);
                            }} prop={"purchased"} case={1}
                          />
                          <LabelInput
                            label={"Donated"} value={record.donated} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE);
                            }} prop={"donated"} case={1}
                          />
                          <LabelInput
                            label={"IP Address"} value={record.ip} type="text" req={1}
                            onChange={(e) => {
                              this.props.SetValue(e, SET_RECORD_VALUE);
                            }} prop={"ip"} case={1}
                          />
                        </div>
                      </div>

                    </CardBody>
                  </Card>  
                  {/* <Card>
                    <CardHeader tag="h6">User</CardHeader>
                    <CardBody>
                    </CardBody>
                  </Card>   */}
                </div>

                
                <div className="col-md-4">
                  <Card>
                    <CardHeader tag="h6">User</CardHeader>
                    <CardBody>
                      <div className="creatable-select-div">
                        <Search2
                          onChange={(val)=>{
                            this.setState({currentSearch: 1});
                          }}
                          ClearText={
                            () => {
                              this.props.SetValue2("endUser.userPAR", {...recordDefault.endUser.userPAR}, SET_RECORD_VALUE);
                            }
                          }
                          value={((record.endUser.userPAR) && (record.endUser.userPAR.hasOwnProperty("name")) && record.endUser.userPAR.name.first != "")?this.props.ArrangeName(record.endUser.userPAR.name):""}
                          title={<span>PAR<span className="astrsk"> *</span></span>}
                          options={[{value: "name", text: "Name"}]}
                          displaySelectOptions={false}
                          select={["userID", "name"]}
                          api="user/get"
                          reducer={SET_REACT_SELECT_RECORD_OPTIONS}
                          suggest={(this.state.currentSearch == 1)?{
                            display: (data, callback) => {  
                              return (
                                <div className="row" onClick={() => 
                                  {

                                    callback(this.props.ArrangeName(data.name));
                                    this.props.SetUserRecordEntry(data, "endUser.userPAR");

                                  }}>
                                  <div className="col-md-7"><span>{this.props.ArrangeName(data.name)}</span></div>
                                  <div className="col-md-5"><span>{data.userID}</span></div>
                                </div>
                              )
                            }
                          }:false}
                        />
                        {/* <div id="input-temp-display">
                          <LabelInput
                            label={"PAR"} value={""} type="text" req={1}
                          />
                        </div> */}

                        {/* <CreatableSelect
                          options={[]}
                          isClearable
                          onChange={async (val) => {
                            console.log(val);
                          }}
                          onInputChange={async (val) => {
                            console.log(val);
                            // await this.props.GetList("user/get", SET_REACT_SELECT_RECORD_OPTIONS, 1, 100000000, {name:val}, undefined, ["name"]);
                          }}
                          onFocus={() => {}}
                          noOptionsMessage={() => "Input Keyword to Search"}
                          placeholder={'Enter Name'}
                          className="creatable-select"
                        /> */}
                      </div>

                      <div className="creatable-select-div">
                        <Search2
                          onChange={(val)=>{
                            this.setState({currentSearch: 2});
                          }}
                          ClearText={
                            () => {
                              this.props.SetValue2("endUser.userCo", {...recordDefault.endUser.userCo}, SET_RECORD_VALUE);
                            }
                          }                          
                          value={((record.endUser.userCo) && (record.endUser.userCo.hasOwnProperty("name")) && record.endUser.userCo.name.first != "")?this.props.ArrangeName(record.endUser.userCo.name):""}
                          title={<span>CO<span className="astrsk"> *</span></span>}
                          options={[{value: "name", text: "Name"}]}
                          displaySelectOptions={false}
                          select={["userID", "name"]}
                          api="user/get"
                          reducer={SET_REACT_SELECT_RECORD_OPTIONS}
                          suggest={(this.state.currentSearch == 2)?{
                            display: (data, callback) => {  
                              return (
                                <div className="row" onClick={() => 
                                  {

                                    callback(this.props.ArrangeName(data.name));
                                    this.props.SetUserRecordEntry(data, "endUser.userCo");

                                  }}>
                                  <div className="col-md-7"><span>{this.props.ArrangeName(data.name)}</span></div>
                                  <div className="col-md-5"><span>{data.userID}</span></div>
                                </div>
                              )
                            }
                          }:false}
                        />
                      </div>
                      
                    </CardBody>
                  </Card>           
                  <Card>
                    <CardHeader tag="h6">Office</CardHeader>
                    <CardBody>
                      <div className="creatable-select-div">
                        <Search2
                            onChange={(val)=>{
                              this.setState({currentSearch: 3});
                            }}
                            ClearText={
                              () => {
                                this.props.SetValue2("office", {...recordDefault.office}, SET_RECORD_VALUE);
                              }
                            }                            
                            value={
                              (record.office.hasOwnProperty("division"))
                                ?(record.office.division + " - " + record.office.section)
                                :""
                            }
                            title={<span>Division - Section<span className="astrsk"> *</span></span>}
                            options={[{value: "office", text: "Office"}]}
                            displaySelectOptions={false}
                            select={["division", "section", "code"]}
                            api="office/get"
                            reducer={SET_REACT_SELECT_RECORD_OPTIONS}
                            suggest={(this.state.currentSearch == 3)?{
                              display: (data, callback) => {  
                                return (
                                  <div className="row" onClick={() => 
                                    {

                                      callback(data.division + " - " + data.section);
                                      this.props.SetUserRecordEntry(data, "office");

                                    }}>
                                    <div className="col-md-12"><span>{data.division + " - " + data.section}</span></div>
                                  </div>
                                )
                              }
                            }:false}
                          />
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
  record: state.record
});

export default connect(mapStateToProps, {
  GetDate,
  SetValue,
  SetValue2,
  GetList,
  ArrangeName,
  SetUserRecordEntry,
})(Table1);
