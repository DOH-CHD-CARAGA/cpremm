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
  SET_PRE_POST_MONITORING_VALUE,
} from '../../../actions/types';

import {
} from '../../../actions/prePostMonitoringAction';

class PrePostMonitoringForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
    }
  }

  render () {

    const { prePostMonitoring } = this.props.prePostMonitoring;

    return (

      <div id='prePostMonitoring-form' className='entry-form'>
        <div>
          <div className='custom-container'>
              <div className='custom-container-title'>
                Pre-Post Monitoring Details
              </div>
              <div className='custom-container-body'>
                <div className='row'>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'name: '} value={prePostMonitoring.name} prop='name' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_PRE_POST_MONITORING_VALUE);
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
  prePostMonitoring: state.prePostMonitoring,
});

export default connect(mapStateToProps, {
  ArrangeAmount,
  GetDate,
  SetValue,
  ArrangeName,
  GetList,
})(PrePostMonitoringForm);

