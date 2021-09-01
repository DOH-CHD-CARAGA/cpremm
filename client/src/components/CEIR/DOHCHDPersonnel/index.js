import React from 'react';
import { connect } from 'react-redux';

import {
  GetList,
} from '../../../actions/helpers/displayAction';

import {
  SET_DOH_CHD_PERSONNELS,
  SET_SEARCHED_DOH_CHD_PERSONNELS,
} from './../../../actions/types';

import DOHCHDPersonnelTable from './DOHCHDPersonnelTable';
import DOHCHDPersonnelModal from './DOHCHDPersonnelModal';

const CardCountContainer = (props) => {
  return (
    <div className="col-md-4 custom-container card-count-container">
      <div className="custom-container-title">
        {props.name}
      </div>
      <div className="row custom-container-body">
        <div className="col-md-6 custom-container ">
          <div className="custom-container-title">
            HF
          </div>
          <div className="custom-container-body first">
            <h1 className="report-number">{props.hf}</h1>
          </div>
        </div>   

        <div className="col-md-6 custom-container">
          <div className="custom-container-title">
            HW
          </div>
          <div className="custom-container-body">
            <h1 className="report-number">{props.hw}</h1>
          </div>
        </div>   

      </div>
    </div>  
  );
}

class DOHCHDPersonnel extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      modal: false,
      modalUpload: false,
      modalDuplicate: false,
      modalType: '',
    }

    this.toggleModal = this.toggleModal.bind(this); 
    this.toggleUpload = this.toggleUpload.bind(this); 
    this.toggleDuplicateModal = this.toggleDuplicateModal.bind(this); 

    props.GetList('hf-personnel/get', SET_DOH_CHD_PERSONNELS, 1, 10, { province: "adn", facility: "DOH-CHD Caraga" });
  }

  toggleModal (type) {
    this.setState({
      modal: !this.state.modal,
      modalType: type,
    });
  }

  toggleUpload () {
    this.setState({
      modalUpload: !this.state.modalUpload,
    });
  }

  toggleDuplicateModal (data) {
    this.setState({
      modalDuplicate: !this.state.modalDuplicate,
    });

  }

  render () {
    return (

      <div className='row justify-content-center' id="hf-personnel">
        <div className='col-md-12'>
          <div className='custom-cards-container'>
            <div className='custom-cards rounded-container box-shadow-container'>
              <DOHCHDPersonnelModal toggle={this.toggleModal} modal={this.state.modal} modalType={this.state.modalType} />

              <DOHCHDPersonnelTable
                toggleModal={this.toggleModal}
                toggleUpload={this.toggleUpload}
                title = {'DOH CHD Personnels'}
                filter = {{ province: "adn", facility: "DOH-CHD Caraga" }}
                reducers = {{ get: SET_DOH_CHD_PERSONNELS, search: SET_SEARCHED_DOH_CHD_PERSONNELS }}
                toggle={ () => {
                  this.toggleModal('update')
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
  hfPersonnel: state.hfPersonnel,
})

export default connect(mapStateToProps, {
  GetList,
})(DOHCHDPersonnel);

