import React from 'react';
import { connect } from 'react-redux';

import { Button } from 'reactstrap';

import {
} from '../../actions/helpers/displayAction';

import {

} from './../../actions/types';

import Sheet from './Sheet';

class UserManual extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
    }

  }
  
  render () {
    return (
      <div id="user-manual" className="row justify-content-center">
        <div className="col-md-12">
          <div className="custom-cards-container">
            <div className="custom-cards rounded-container box-shadow-container">
               <Sheet/>
            </div>
          </div>
        </div>
      </div>
    );
  }

}



const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
})(UserManual);
