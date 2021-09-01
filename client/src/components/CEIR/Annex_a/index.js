import React from 'react';
import { connect } from 'react-redux';

import {
  GetList,
} from '../../../actions/helpers/displayAction';

import {
  SET_ANNEX_AS,
  SET_SEARCHED_ANNEX_AS,
} from '../../../actions/types';

import Annex_aTable from './Annex_aTable';
import Annex_aModal from './Annex_aModal';

class Annex_a extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      modal: false,
      modalType: '',
    }

    this.toggleModal = this.toggleModal.bind(this); 

    props.GetList('hf-personnel/annex-a', SET_ANNEX_AS, 1, 10, {"province": 1});
  }

  toggleModal (type) {
    this.setState({
      modal: !this.state.modal,
      modalType: type,
    });
  }

  render () {
    return (

      <div className='row justify-content-center'>
        <div className='col-md-12'>
          <div className='custom-cards-container'>
            <div className='custom-cards rounded-container box-shadow-container'>
              <Annex_aModal toggle={this.toggleModal} modal={this.state.modal} modalType={this.state.modalType} />

              <Annex_aTable
                toggleModal={this.toggleModal}
                title = {'Annex A'}
                filter = {{}}
                reducers = {{ get: SET_ANNEX_AS, search: SET_SEARCHED_ANNEX_AS }}
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
  annex_a: state.annex_a,
})

export default connect(mapStateToProps, {
  GetList,
})(Annex_a);

