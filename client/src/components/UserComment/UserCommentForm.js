import React from 'react';
import { connect } from 'react-redux';
import LabelInput from './../helpers/LabelInput';
import {
  ArrangeAmount,
  SetValue,
  ArrangeName,
} from '../../actions/helpers/displayAction';

import {
  GetDate,
} from '../../actions/helpers/dateAction';

import {
  SET_USER_COMMENT_VALUE,
} from './../../actions/types';

import {
} from '../../actions/userCommentAction';

class UserCommentForm extends React.Component {
  
  constructor (props) {
    super(props);

    this.state = {
    }
  }

  render () {
    const { userComment } = this.props.userComment;
    return (
      <div id="userComment-form" className="entry-form">
        <div>
          <div className="custom-container">
            <div className="custom-container-title">
              Comment Detail
            </div>
            <div className="custom-container-body">

            </div>
          </div>

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userComment: state.userComment
});

export default connect(mapStateToProps, {
  ArrangeAmount,
  GetDate,
  SetValue,
  ArrangeName,
})(UserCommentForm);
