import React from 'react';
import { connect } from 'react-redux';

import { Button } from 'reactstrap';

import {
  GetList,
} from '../../actions/helpers/displayAction';

import {
  SET_USER_COMMENTS,
  SET_SEARCHED_USER_COMMENTS,
} from './../../actions/types';

import CountDiv from './../helpers/CountDiv';
import UserCommentTable from './UserCommentTable';
import UserCommentModal from './UserCommentModal';

class UserComment extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      modal: false,
      modalType: "",
      api: (window.location.pathname == "/admin/reported-issues")?"/get":"/get/mine",
    }

    this.toggleModal = this.toggleModal.bind(this); 
    console.log("userComment" + this.state.api);
    props.GetList("userComment" + this.state.api, SET_USER_COMMENTS, 1, 10);

  }

  
  toggleModal (type) {
    this.setState({
      modal: !this.state.modal,
      modalType: type,
    });
  }

  render () {
    console.log(this.state.api);
    return (

      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="custom-cards-container">
            <div className="custom-cards rounded-container box-shadow-container table-responsive">
            <h6 className="title-bar">{"Admin Settings"}</h6>
            <hr/>
              <UserCommentModal toggle={this.toggleModal} modal={this.state.modal} modalType={this.state.modalType} />

              <UserCommentTable
                toggleModal={this.toggleModal}
                title = {"User Comments"}
                filter = {{}}
                reducers = {{ get: SET_USER_COMMENTS, search: SET_SEARCHED_USER_COMMENTS }}
                toggle={ () => {
                  this.toggleModal("update")
                }}
                api={this.state.api}
              />              
            </div>
          </div>
        </div>
      </div>
    );
  }

}



const mapStateToProps = (state) => ({
  userComment: state.userComment,
})

export default connect(mapStateToProps, {
  GetList,
})(UserComment);
