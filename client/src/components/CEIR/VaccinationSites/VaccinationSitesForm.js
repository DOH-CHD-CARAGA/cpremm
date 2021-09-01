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
  SET_VACCINATION_SITES_VALUE,
} from '../../../actions/types';

import {
} from '../../../actions/vaccinationSitesAction';

class VaccinationSitesForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
    }
  }

  render () {

    const { vaccinationSites } = this.props.vaccinationSites;

    return (

      <div id='vaccinationSites-form' className='entry-form'>
        <div>
          <div className='custom-container'>
              <div className='custom-container-title'>
                Vaccination Site Details
              </div>
              <div className='custom-container-body'>
                <div className='row'>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Code: '} value={vaccinationSites.code} prop='code' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_VACCINATION_SITES_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Code Short: '} value={vaccinationSites.codeShort} prop='codeShort' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_VACCINATION_SITES_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Name: '} value={vaccinationSites.name} prop='name' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_VACCINATION_SITES_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Type: '} value={vaccinationSites.type} prop='type' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_VACCINATION_SITES_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Ownership: '} value={vaccinationSites.ownership} prop='ownership' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_VACCINATION_SITES_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Address: '} value={vaccinationSites.address} prop='address' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_VACCINATION_SITES_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Supervisor: '} value={vaccinationSites.supervisor} prop='supervisor' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_VACCINATION_SITES_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Representative Staff: '} value={vaccinationSites.representativeStaff} prop='representativeStaff' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_VACCINATION_SITES_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Inventory Staff: '} value={vaccinationSites.inventoryStaff} prop='inventoryStaff' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_VACCINATION_SITES_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Status: '} value={vaccinationSites.status} prop='status' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_VACCINATION_SITES_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Inactive Note: '} value={vaccinationSites.inactiveNote} prop='inactiveNote' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_VACCINATION_SITES_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Number of Teams: '} value={vaccinationSites.numberOfTeams} prop='numberOfTeams' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_VACCINATION_SITES_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Added By: '} value={vaccinationSites.addedBy} prop='addedBy' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_VACCINATION_SITES_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Date Reported: '} value={vaccinationSites.dateReported} prop='dateReported' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_VACCINATION_SITES_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Updated By: '} value={vaccinationSites.updatedBy} prop='updatedBy' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_VACCINATION_SITES_VALUE);
                      }}
                    />
                  </div>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Date Updated: '} value={vaccinationSites.dateUpdated} prop='dateUpdated' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_VACCINATION_SITES_VALUE);
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
  vaccinationSites: state.vaccinationSites,
});

export default connect(mapStateToProps, {
  ArrangeAmount,
  GetDate,
  SetValue,
  ArrangeName,
  GetList,
})(VaccinationSitesForm);

