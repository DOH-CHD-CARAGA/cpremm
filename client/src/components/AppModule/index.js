import React from 'react';
import { connect } from 'react-redux';

import { Button } from 'reactstrap';

import {
  GetList,
} from '../../actions/helpers/displayAction';

import {
  SET_APP_MODULES,
  SET_SEARCHED_APP_MODULES,
} from './../../actions/types';

import AppModuleTable from './AppModuleTable';
import AppModuleModal from './AppModuleModal';

class AppModule extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      modal: false,
      modalType: "",
    }

    this.toggleModal = this.toggleModal.bind(this); 

    props.GetList("admin/appModule/get", SET_APP_MODULES, 1, 10);
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
            <div className="custom-cards rounded-container box-shadow-container">
            <h6 className="title-bar">{"Admin Settings"}</h6>
            <hr/>
              <AppModuleModal toggle={this.toggleModal} modal={this.state.modal} modalType={this.state.modalType} />

              <AppModuleTable
                toggleModal={this.toggleModal}
                title = {"App Modules"}
                filter = {{}}
                reducers = {{ get: SET_APP_MODULES, search: SET_SEARCHED_APP_MODULES }}
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
  appModule: state.appModule,
})

export default connect(mapStateToProps, {
  GetList,
})(AppModule);
