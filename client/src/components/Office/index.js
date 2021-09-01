import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import {
  GetList,
} from '../../actions/helpers/displayAction';

import {
  SET_OFFICES,
  SET_SEARCHED_OFFICES,
} from './../../actions/types';

import OfficeTable from './OfficeTable';
import OfficeModal from './OfficeModal';

class Office extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      modal: false,
      modalType: "",
    }

    this.toggleModal = this.toggleModal.bind(this); 

    props.GetList("office/get", SET_OFFICES, 1, 10);
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
              <OfficeModal toggle={this.toggleModal} modal={this.state.modal} modalType={this.state.modalType} />

              <OfficeTable
                toggleModal={this.toggleModal}
                title = {"Offices"}
                filter = {{}}
                reducers = {{ get: SET_OFFICES, search: SET_SEARCHED_OFFICES }}
                toggle={ () => {
                  this.toggleModal("update")
                }}
              />              

            </div>
          </div>
        </div>

      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  office: state.office,
})

export default connect(mapStateToProps, {
  GetList,
})(Office);
