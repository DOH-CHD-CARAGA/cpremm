import React from 'react';
import { connect } from 'react-redux';

import { Button } from 'reactstrap';

import {
} from '../../actions/helpers/displayAction';

import {

} from './../../actions/types';

class UserManual extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
    }

  }
  
  render () {
    return (
      <div className="user-manual-sheet">
        
      </div>
    );
  }

}



const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
})(UserManual);
