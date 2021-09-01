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
  SET_VAS_REPORT_VALUE,
} from './../../../actions/types';

import {
} from '../../../actions/vasReportAction';

class VasReportForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
    }
  }

  render () {

    const { vasReport } = this.props.vasReport;

    return (

      <div id='vasReport-form' className='entry-form'>
        <div>
          <div className='custom-container'>
              <div className='custom-container-title'>
                VAS Report Details
              </div>
              <div className='custom-container-body'>
                <div className='row'>

                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  vasReport: state.vasReport,
});

export default connect(mapStateToProps, {
  ArrangeAmount,
  GetDate,
  SetValue,
  ArrangeName,
  GetList,
})(VasReportForm);

