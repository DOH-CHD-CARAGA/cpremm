import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import {
  CheckPassword,
} from './../../actions/helpers/displayAction';

import InfoModal from './InfoModal';
import LabelInput from './LabelInput';

class PasswordRequire extends Component {

  constructor(props) {
    super(props);

    this.state = {
      password: "",
    }

  }

  render() {

    var butts = [
      { type: 'Confirm', callback: () => {
        this.props.CheckPassword(this.state.password);
      }, size: 4 },
    ];

    return (
      <InfoModal
        size={'30%'}
        modal={this.props.modal}
        toggle={this.props.toggle}
        title={''}
        form={
          <Fragment>
            <div className='inpt-grp col-md-12'>
              <LabelInput case={1}
                label={'Confirm Password: '} value={this.state.password} type='password' req={1}
                onChange={(e) => {
                  this.setState({
                    password: e.target.value
                  })
                }}
              />
            </div>
          </Fragment>
        }
        buttons={butts}
      />
    );
  }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
  CheckPassword,
})(PasswordRequire);

