import React from 'react';
import { connect } from 'react-redux';
import LabelInput from '../../helpers/LabelInput';

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
  SET_HEALTH_FACILITY_VALUE,
} from '../../../actions/types';

import {
} from '../../../actions/healthFacilityAction';

class HealthFacilityForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
    }
  }

  render () {

    const { healthFacility } = this.props.healthFacility;

    return (

      <div id='healthFacility-form' className='entry-form'>
        <div>
          <div className='custom-container'>
              <div className='custom-container-title'>
                Health Facility Details
              </div>
              <div className='custom-container-body'>
                <div className='row'>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Region: '} value={healthFacility.region} prop='region' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_HEALTH_FACILITY_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Province: '} value={healthFacility.province} prop='province' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_HEALTH_FACILITY_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Municipality/city: '} value={healthFacility.munCity} prop='munCity' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_HEALTH_FACILITY_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Category: '} value={healthFacility.category} prop='category' type='select' req={1} dtype={5} case={1}
                      options={[
                        {text: " --- Select --- ", value: ""},
                        {text: "RHU", value: "RHU"},
                        {text: "CHO", value: "CHO"},
                        {text: "MHO", value: "MHO"},
                        {text: "PHO", value: "PHO"},
                        {text: "DOH", value: "DOH"},
                        {text: "Infirmary Hospital", value: "Infirmary Hospital"},
                        {text: "Level 1 Hospital", value: "Level 1 Hospital"},
                        {text: "Level 2 Hospital", value: "Level 2 Hospital"},
                        {text: "Main Health Center", value: "Main Health Center"},
                        {text: "Municipal Health Center", value: "Municipal Health Center"},
                      ]}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_HEALTH_FACILITY_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Ownership: '} value={healthFacility.ownership} prop='ownership' type='select' req={1} dtype={5} case={1}
                      options={[
                        {text: " --- Select --- ", value: ""},
                        {text: "Government", value: "Government"},
                        {text: "Private", value: "Private"},
                      ]}                      
                      onChange={(e) => {
                        this.props.SetValue(e, SET_HEALTH_FACILITY_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Name: '} value={healthFacility.name} prop='name' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_HEALTH_FACILITY_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Contact: '} value={healthFacility.contact} prop='contact' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_HEALTH_FACILITY_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Email: '} value={healthFacility.email} prop='email' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_HEALTH_FACILITY_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Focals: '} value={healthFacility.focals} prop='focals' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_HEALTH_FACILITY_VALUE);
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
  healthFacility: state.healthFacility,
});

export default connect(mapStateToProps, {
  ArrangeAmount,
  GetDate,
  SetValue,
  ArrangeName,
  GetList,
})(HealthFacilityForm);

