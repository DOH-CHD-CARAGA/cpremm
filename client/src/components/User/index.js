import React from 'react';
import { connect } from 'react-redux';

import { Button } from 'reactstrap';

import {
  GetList,
} from '../../actions/helpers/displayAction';

import {
  SET_USERS,
  SET_SEARCHED_USERS,
  SET_ROLES,
  SET_OFFICES,
} from './../../actions/types';

import CountDiv from './../helpers/CountDiv';
import UserTable from './UserTable';
import UserModal from './UserModal';
import CommentBox from '../helpers/CommentBox';

class User extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      modal: false,
      modalType: "",
    }

    this.toggleModal = this.toggleModal.bind(this); 

    props.GetList("user/get", SET_USERS, 1, 10);
    props.GetList("role/get", SET_ROLES, 1, 100000, undefined, { name: 1 });
    props.GetList("office/get", SET_OFFICES, 1, 100000, undefined, { division: 1 });

  }

  
  toggleModal (type) {
    this.setState({
      modal: !this.state.modal,
      modalType: type,
    });
  }

  render () {
    console.log(this.props.user);
    return (

      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="custom-cards-container">
            <div className="custom-cards rounded-container box-shadow-container table-responsive">
            <h6 className="title-bar">{"Admin Settings"}</h6>
            <hr/>
              <UserModal toggle={this.toggleModal} modal={this.state.modal} modalType={this.state.modalType} />

              <UserTable
                toggleModal={this.toggleModal}
                title = {"Users"}
                filter = {{}}
                reducers = {{ get: SET_USERS, search: SET_SEARCHED_USERS }}
                toggle={ () => {
                  this.toggleModal("update")
                }}
              />              
            </div>
          </div>
        </div>


        <div className="col-md-12">
            <CommentBox page="User"/>
        </div>

      </div>
    );
  }

}



const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps, {
  GetList,
})(User);
