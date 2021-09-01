import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileForm from './ProfileForm';
import ChangePassModal from './ChangePassModal';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modal: false,
    };

    this.toggle = this.toggle.bind(this);

  }

  toggle () {
      this.setState({
          modal: !this.state.modal
      })
  }

  render() {
    return (
      <div id="profile">
          <ChangePassModal modal={this.state.modal} toggle={this.toggle}/>
          <div className="custom-cards-container">
            <div className="custom-cards rounded-container box-shadow-container">
                <ProfileForm toggle={this.toggle}/>
            </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {

})(Profile);
