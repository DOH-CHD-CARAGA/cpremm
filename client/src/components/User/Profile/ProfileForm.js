import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Table, Input, Form, Label, Button, Col } from 'reactstrap';
import LabelInput from '../../helpers/LabelInput';
import {
    ArrangeName,
} from '../../../actions/helpers/displayAction';
  
const ProfileForm = (props) =>  {
    
    const name     = props.ArrangeName(JSON.parse(localStorage.getItem('doh-user-name')));
    const role     = JSON.parse(localStorage.getItem('doh-user-role'));
    const position = localStorage.getItem('doh-user-designation');
    const office   = JSON.parse(localStorage.getItem('doh-user-off'));

    console.log(localStorage.getItem('doh-user-name'));
    console.log(name);

  return (
    <div id="profile-form">
        <div className="form-content">
            <legend>My Profile</legend><br/>
            <label>Personal Info</label>
            <div className="row">
                <div className="col-md-12">
                    <div className="input-grp">
                        <LabelInput
                            label={"Name"} value={name.toUpperCase()} type="text"
                        />
                    </div>
                </div>       
            </div>    
            <label>Designation</label>
            <div className="row">
                <div className="col-md-6">
                    <div className="input-grp">
                        <LabelInput
                            label={"Position"} value={position.toUpperCase()} type="text"
                        />
                    </div>
                </div>       
                <div className="col-md-6">
                    <div className="input-grp">
                        <LabelInput
                            label={"Role"} value={role.name.toUpperCase()} type="text"
                        />
                    </div>
                </div>       
            </div>    
            <label>Office</label>
            <div className="row">
                <div className="col-md-6">
                    <div className="input-grp">
                        <LabelInput
                            label={"Division"} value={office.division} type="text"
                        />
                    </div>
                </div>       
                <div className="col-md-6">
                    <div className="input-grp">
                        <LabelInput
                            label={"Section"} value={office.section} type="text"
                        />
                    </div>
                </div>         
            </div>   

            <div className="row-footer">
                <Col sm={{ size: 2 }}>
                    <Button size="md" className="button-orange-gradient" color="primary" onClick={props.toggle}>Change Password</Button>
                </Col>
            </div>

        </div>
    </div>
  );

}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
    ArrangeName,
})(ProfileForm);
