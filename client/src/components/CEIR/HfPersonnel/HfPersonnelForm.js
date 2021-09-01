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
  SET_HF_PERSONNEL_VALUE,
} from './../../../actions/types';

import {
} from '../../../actions/hfPersonnelAction';

class HfPersonnelForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
    }
  }

  render () {

    const { hfPersonnel } = this.props.hfPersonnel;

    return (

      <div id='hfPersonnel-form' className='entry-form'>
        <div>
          <div className='custom-container'>
              <div className='custom-container-title'>
                HF Personnel Details
              </div>
              <div className='custom-container-body'>
                <div className='row'>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Category: '} value={hfPersonnel.category} prop='category' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_HF_PERSONNEL_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Category ID: '} value={hfPersonnel.categoryID} prop='categoryID' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_HF_PERSONNEL_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Category ID number: '} value={hfPersonnel.categoryIDNumber} prop='categoryIDNumber' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_HF_PERSONNEL_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'PhilHealth ID: '} value={hfPersonnel.philHealthID} prop='philHealthID' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_HF_PERSONNEL_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'PWD ID: '} value={hfPersonnel.pwdID} prop='pwdID' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_HF_PERSONNEL_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Name: '} value={hfPersonnel.name} prop='name' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_HF_PERSONNEL_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Contact No: '} value={hfPersonnel.contactNo} prop='contactNo' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_HF_PERSONNEL_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Address: '} value={hfPersonnel.address} prop='address' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_HF_PERSONNEL_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Sex: '} value={hfPersonnel.sex} prop='sex' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_HF_PERSONNEL_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Birthdate: '} value={hfPersonnel.birthdate} prop='birthdate' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_HF_PERSONNEL_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Status: '} value={hfPersonnel.status} prop='status' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_HF_PERSONNEL_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Employment: '} value={hfPersonnel.employment} prop='employment' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_HF_PERSONNEL_VALUE);
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
  hfPersonnel: state.hfPersonnel,
});

export default connect(mapStateToProps, {
  ArrangeAmount,
  GetDate,
  SetValue,
  ArrangeName,
  GetList,
})(HfPersonnelForm);

