import React from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardBody} from 'reactstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';
import LabelInput from '../helpers/LabelInput';

import {
  GetDate,
} from '../../actions/helpers/dateAction';

import {
  SetValue,
} from '../../actions/helpers/displayAction';

import {
  UpdateSchemaCount,
  arrangeFieldName,
} from '../../actions/appModuleAction';

import {
  SET_APP_MODULE_VALUE,
} from '../../actions/types';

class AppModuleForm extends React.Component {
  
  constructor (props) {
    super(props);

    this.state = {
      route: "",
    }
  }


  render () {

    const { appModule } = this.props.appModule;

    return (
      <div id="appModule-form" className="entry-form">
        <Card>
          <CardHeader tag="h5">Module</CardHeader>
          <CardBody>
            <div className="form-content">
              <div className="row">
                <div className="col-md-6">
                  <LabelInput
                    label={"Name"} value={appModule.name} type="text" req={1}
                    onChange={(e) => {
                      this.props.SetValue(e, SET_APP_MODULE_VALUE);
                    }} prop={"name"} case={1}
                  />
                </div>
                <div className="col-md-6">
                  <LabelInput
                    label={"Module Type"} value={appModule.moduleType} type="select" req={1}
                    options={[{value:"main", text: "Main Module"}, {value:"sub", text: "Sub Module"}, {value:"helper", text: "Module Helper"}]}
                    onChange={(e) => {
                      this.props.SetValue(e, SET_APP_MODULE_VALUE);
                    }} prop={"moduleType"} case={1}
                  />
                </div>
                <div className="col-md-12">
                  <LabelInput
                    label={"Description"} value={appModule.description} type="textarea" req={1}
                    onChange={(e) => {
                      this.props.SetValue(e, SET_APP_MODULE_VALUE);
                    }} prop={"description"} case={1}
                  />
                </div>
                <br/><br/>
                <div className="col-md-12">
                  <Card>
                    <CardHeader tag="h6">
                      Schema
                      <FaPlus className="posAction"
                        onClick={() => {
                          this.props.UpdateSchemaCount();
                        }}
                      />
                    </CardHeader>
                    <CardBody>
                      {
                        appModule.schemas.map((data, i) => {
                          return(
                            <Card>
                              <CardHeader tag="h6">
                                Field Name
                                <FaMinus 
                                  className="negAction"
                                  onClick={() => {
                                    this.props.UpdateSchemaCount("-", i);
                                  }}
                                />
                              </CardHeader>
                              <CardBody>
                                <div className="row">
                                  <div className="col-md-4">
                                    <LabelInput
                                      label={"Name"} value={data.name} type="text" req={1}
                                      onChange={(e) => {
                                        this.props.SetValue(e, SET_APP_MODULE_VALUE);
                                      }} prop={"schemas." + i + ".name"}
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <LabelInput
                                      label={"Field Name"} value={(data.fieldName != "")?data.fieldName:this.props.arrangeFieldName(data.name)} type="text" req={1}
                                      onChange={(e) => {
                                        this.props.SetValue(e, SET_APP_MODULE_VALUE);
                                      }} prop={"schemas." + i + ".fieldName"}
                                    />
                                  </div>
                                  <div className="col-md-4">
                                    <LabelInput
                                      label={"Type"} value={data.type} type="select" req={1}
                                      options={[
                                        {value:"String", text:"String"}, {value:"Number", text:"Number"},
                                        {value:"Date", text:"Date"}, {value:"Boolean", text:"Boolean"},
                                      ]}
                                      onChange={(e) => {
                                        this.props.SetValue(e, SET_APP_MODULE_VALUE);
                                      }} prop={"schemas." + i + ".type"} case={1}
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <LabelInput
                                      label={"Default Value"} value={data.defaultValue} type="textarea" req={1}
                                      onChange={(e) => {
                                        this.props.SetValue(e, SET_APP_MODULE_VALUE);
                                      }} prop={"schemas." + i + ".defaultValue"} case={1}
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <LabelInput
                                      label={"Description"} value={data.description} type="textarea" req={1}
                                      onChange={(e) => {
                                        this.props.SetValue(e, SET_APP_MODULE_VALUE);
                                      }} prop={"schemas." + i + ".description"} case={1}
                                    />
                                  </div>
                                </div>
                              </CardBody>
                            </Card>                  
    
                          )
                        })
                      }
                    
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
  appModule: state.appModule
});

export default connect(mapStateToProps, {
  GetDate,
  SetValue,
  UpdateSchemaCount,
  arrangeFieldName,
})(AppModuleForm);
