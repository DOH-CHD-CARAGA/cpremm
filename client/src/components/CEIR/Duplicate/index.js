import React from 'react';
import { connect } from 'react-redux';
import LabelInput from '../../helpers/LabelInput';

import {
  GetList,
} from '../../../actions/helpers/displayAction';

import {
  SET_DUPLICATES,
  SET_SEARCHED_DUPLICATES,
} from '../../../actions/types';

import DuplicateTable from './DuplicateTable';
import DuplicateModal from './DuplicateModal';

class Duplicate extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      modal: false,
      modalType: '',
      province: "",
    }

    this.toggleModal = this.toggleModal.bind(this); 

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
              <DuplicateModal toggle={this.toggleModal} modal={this.state.modal} modalType={this.state.modalType} />
              <div className="row">
                <div className="col-md-4">
                  <LabelInput case={1}
                    label={'Province: '} value={this.state.province} type='select' req={1}
                    options={[
                      {text: " --- Select Province --- ",  value: ""},
                      {text: "Agusan Del Norte",  value: "adn"},
                      {text: "Agusan Del Sur",    value: "ads"},
                      {text: "Surigao Del Norte", value: "sdn"},
                      {text: "Surigao Del Sur",   value: "sds"},
                      {text: "Province of Dinagat Island",  value: "pdi"},
                    ]}
                    onChange={(e) => {
                      this.setState({
                        province: e.target.value
                      })
                      this.props.GetList('hf-personnel/get-duplicates', SET_DUPLICATES, 1, 10, {province: e.target.value});
                    }}
                  />
                </div>
              </div>
              <DuplicateTable
                toggleModal={this.toggleModal}
                title = {'Duplicates'}
                filter = {{}}
                reducers = {{ get: SET_DUPLICATES, search: SET_SEARCHED_DUPLICATES }}
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
  duplicate: state.duplicate,
})

export default connect(mapStateToProps, {
  GetList,
})(Duplicate);

