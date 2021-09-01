import React from 'react';
import { connect } from 'react-redux';
import LabelInput from './../../helpers/LabelInput';

import {
  ArrangeAmount,
  SetValue,
  ArrangeName,
  GetList,
} from '../../../actions/helpers/displayAction';

import {
  GetDate,
} from '../../../actions/helpers/dateAction';

import {
  SET_DOH_CHD_PERSONNEL_VALUE,
} from './../../../actions/types';

import {
} from '../../../actions/DOHCHDPersonnelAction';

class DOHCHDPersonnelForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
    }
  }

  render () {

    const { DOHCHDPersonnel } = this.props.DOHCHDPersonnel;

    return (

      <div id='DOHCHDPersonnel-form' className='entry-form'>
        <div>
          <div className='custom-container'>
              <div className='custom-container-title'>
                HF Personnel Details
              </div>
              <div className='custom-container-body'>
                <div className='row'>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Category: '} value={DOHCHDPersonnel.category} prop='category' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_DOH_CHD_PERSONNEL_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Category ID: '} value={DOHCHDPersonnel.categoryID} prop='categoryID' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_DOH_CHD_PERSONNEL_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Category ID number: '} value={DOHCHDPersonnel.categoryIDNumber} prop='categoryIDNumber' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_DOH_CHD_PERSONNEL_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'PhilHealth ID: '} value={DOHCHDPersonnel.philHealthID} prop='philHealthID' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_DOH_CHD_PERSONNEL_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'PWD ID: '} value={DOHCHDPersonnel.pwdID} prop='pwdID' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_DOH_CHD_PERSONNEL_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Name: '} value={DOHCHDPersonnel.name} prop='name' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_DOH_CHD_PERSONNEL_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Contact No: '} value={DOHCHDPersonnel.contactNo} prop='contactNo' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_DOH_CHD_PERSONNEL_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Address: '} value={DOHCHDPersonnel.address} prop='address' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_DOH_CHD_PERSONNEL_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Sex: '} value={DOHCHDPersonnel.sex} prop='sex' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_DOH_CHD_PERSONNEL_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Birthdate: '} value={DOHCHDPersonnel.birthdate} prop='birthdate' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_DOH_CHD_PERSONNEL_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Status: '} value={DOHCHDPersonnel.status} prop='status' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_DOH_CHD_PERSONNEL_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Employment: '} value={DOHCHDPersonnel.employment} prop='employment' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_DOH_CHD_PERSONNEL_VALUE);
                      }}
                    />
                  </div>

                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  DOHCHDPersonnel: state.DOHCHDPersonnel,
});

export default connect(mapStateToProps, {
  ArrangeAmount,
  GetDate,
  SetValue,
  ArrangeName,
  GetList,
})(DOHCHDPersonnelForm);

