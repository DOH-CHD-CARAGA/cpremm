import React from 'react';
import { connect } from 'react-redux';

import { Button } from 'reactstrap';

import {
  GetList,
} from '../../actions/helpers/displayAction';

import {
  SET_ROLES,
  SET_SEARCHED_ROLES,
} from './../../actions/types';

import RoleTable from './RoleTable';
import RoleModal from './RoleModal';
import CountDiv from './../helpers/CountDiv';
import CommentBox from '../helpers/CommentBox';

class Role extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      modal: false,
      modalType: "",
    }

    this.toggleModal = this.toggleModal.bind(this); 

    props.GetList("role/get", SET_ROLES, 1, 10);
  }

  
  toggleModal (type) {
    this.setState({
      modal: !this.state.modal,
      modalType: type,
    });
  }

  render () {

    return (

      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="custom-cards-container">
            <div className="custom-cards rounded-container box-shadow-container table-responsive">
              <h6 className="title-bar">{"Admin Settings"}</h6>
              <hr/>
              <RoleModal toggle={this.toggleModal} modal={this.state.modal} modalType={this.state.modalType} />

              <RoleTable
                toggleModal={this.toggleModal}
                title = {"Roles"}
                filter = {{}}
                reducers = {{ get: SET_ROLES, search: SET_SEARCHED_ROLES }}
                toggle={ () => {
                  this.toggleModal("update")
                }}
              />

            </div>
          </div>
        </div>

        <div className="col-md-12">
            <CommentBox page="Role"/>
        </div>

      </div>
    );
  }

}



const mapStateToProps = (state) => ({
  role: state.role,
})

export default connect(mapStateToProps, {
  GetList,
})(Role);
