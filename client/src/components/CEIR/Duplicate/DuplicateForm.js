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
  SET_DUPLICATE_VALUE,
} from '../../../actions/types';

import {
} from '../../../actions/duplicateAction';

class DuplicateForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
    }
  }

  render () {

    const { duplicate } = this.props.duplicate;

    return (

      <div id='duplicate-form' className='entry-form'>
        <div>
          <div className='custom-container'>
              <div className='custom-container-title'>
                Duplicate Details
              </div>
              <div className='custom-container-body'>
                <div className='row'>

                  <div className='inpt-grp col-md-4'>
                    <LabelInput case={1}
                      label={'Name: '} value={duplicate.Name} prop='Name' type='text' req={1} dtype={5} case={1}
                      onChange={(e) => {
                        this.props.SetValue(e, SET_DUPLICATE_VALUE);
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
  duplicate: state.duplicate,
});

export default connect(mapStateToProps, {
  ArrangeAmount,
  GetDate,
  SetValue,
  ArrangeName,
  GetList,
})(DuplicateForm);

