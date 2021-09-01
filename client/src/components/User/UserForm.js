import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, FormGroup} from 'reactstrap';
import { FaPlus, FaTimes } from 'react-icons/fa';
import LabelInput from './../helpers/LabelInput';
import {
  ArrangeAmount,
  SetValue,
  ArrangeName,
  GetList,
} from '../../actions/helpers/displayAction';

import {
  GetDate,
} from '../../actions/helpers/dateAction';

import {
  SET_USER_VALUE,
} from './../../actions/types';

import {
} from '../../actions/userAction';

class UserForm extends React.Component {
  
  constructor (props) {
    super(props);

    this.state = {
    }

  }

  render () {
    const { user, images } = this.props.user;
    console.log("======------------------------>>>>>>>>>..");
    console.log(this.props);
    console.log(user);
    console.log(this.props.modalType);

    var offices = [{text: "-- office --", value: ""}];
    this.props.office.offices.map((office) => {
      offices.push({
        text: office.division + " - " + office.section,
        value: office._id
      })
    })
    
    var roles = [{text: "-- role --", value: ""}];
    this.props.role.roles.map((role) => {
      roles.push({
        text: role.name,
        value: role._id
      })
    })
    
    return (
      <div id="user-form" className="entry-form">
        <div>
          <div className="custom-container">

              <div className="custom-container-title">
                Personal Info
              </div>

              <div className="custom-container-body">
                <div className="row">
                  <div className="inpt-grp col-md-4">
                    <LabelInput case={1}
                      label={"First Name: "} value={user.name.first} prop="name.first" type="text" req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_USER_VALUE);
                      }}
                    />
                  </div>
                  <div className="inpt-grp col-md-4">
                    <LabelInput case={1}
                      label={"Middle Name: "} value={user.name.mid} prop="name.mid" type="text" req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_USER_VALUE);
                      }}
                    />
                  </div>
                  <div className="inpt-grp col-md-4">
                    <LabelInput case={1}
                      label={"Last Name: "} value={user.name.last} prop="name.last" type="text" req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_USER_VALUE);
                      }}
                    />
                  </div>

                </div>    
              </div>

              <br/>
              <div className="custom-container-title">
                Assigned Position
              </div>
              <div className="row">
                <div className="inpt-grp col-md-12">
                  <id className="row">
                    <div className="col-md-6">
                      <LabelInput case={1}
                        label={"Designation: "} value={user.designation} prop="designation" type="text" req={1} case={1}
                        onChange={(e) => {
                          this.props.SetValue(e, SET_USER_VALUE);
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <LabelInput case={1}
                        label={"Employment Type: "} value={user.status} prop="status" type="select" req={1} case={1}
                        options={[
                          {text: "Job Order", value: "JOB ORDER"}, 
                          {text: "Contractual", value: "CONTRACTUAL"}, 
                          {text: "Regular", value: "REGULAR"}, 
                        ]}
                        onChange={(e) => {
                          this.props.SetValue(e, SET_USER_VALUE);
                        }}
                      />
                    </div>
                  </id>
                </div>                
                <div className="col-md-12">
                  <LabelInput
                      label={"Office: "} onChange={(e) => {
                        this.props.SetValue(e, SET_USER_VALUE);
                      }} value={user.office._id}
                      prop={"office"} type="select" req={1}
                      options={offices}
                    />
                </div>
                <div className="col-md-12">
                  <LabelInput
                      label={"App Role: "} onChange={(e) => {
                        this.props.SetValue(e, SET_USER_VALUE);
                      }} value={user.role._id}
                      prop={"role"} type="select" req={1}
                      options={roles}
                    />
                </div>
              </div> 

              <br/>
              {/* <div className="custom-container-title">
                Assigned Role
              </div>
              <div className="row">
                <div className="col-md-12">
                  <LabelInput
                      label={"Role: "} onChange={(e) => {
                        this.props.SetValue(e, SET_USER_VALUE);
                      }} value={user.role}
                      prop={"role"} type="select" req={1}
                      options={roles}
                    />
                </div>
              </div>  */}
              
          </div>
 
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  role: state.role,
  office: state.office,
});

export default connect(mapStateToProps, {
  ArrangeAmount,
  GetDate,
  SetValue,
  ArrangeName,
  GetList,
})(UserForm);
