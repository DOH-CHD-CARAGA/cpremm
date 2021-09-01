import React from 'react';
import { connect } from 'react-redux';

import {
  GetList,
} from '../../../actions/helpers/displayAction';

import {
  SET_HF_PERSONNELS,
  SET_SEARCHED_HF_PERSONNELS,
  SET_HF_PERSONNEL_HEALTH_FACILITIES,
} from './../../../actions/types';

import HfPersonnelTable  from './HfPersonnelTable';
import HfPersonnelModal  from './HfPersonnelModal';
import HfPersonnelModal2 from './HfPersonnelModal2';
import HfPersonnelUploadModal from './HfPersonnelUploadModal';
import HfPersonnelDuplicateModal from './HfPersonnelDuplicateModal';
import HfPersonnelDeleteModal from './HfPersonnelDeleteModal';

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

class HfPersonnel extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      modal: false,
      modalUpload: false,
      modalDuplicate: false,
      modalDelete: false,
      modalType: '',
    }

    this.toggleModal = this.toggleModal.bind(this); 
    this.toggleUpload = this.toggleUpload.bind(this); 
    this.toggleDuplicateModal = this.toggleDuplicateModal.bind(this); 
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this); 
    
    props.GetList('hf-personnel/get', SET_HF_PERSONNELS, 1, 10);
		props.GetList('ceir/health-facility/get', SET_HF_PERSONNEL_HEALTH_FACILITIES, 1, 1000, undefined, undefined, {name: 1, province: 1});
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

  toggleDeleteModal (data) {
    this.setState({
      modalDelete: !this.state.modalDelete,
    });
  }

  render () {
    return (

      <div className='row justify-content-center' id="hf-personnel">
        <div className='col-md-12'>
          <div className='custom-cards-container'>
            <div className='custom-cards rounded-container box-shadow-container'>
              {/* <HfPersonnelModal toggle={this.toggleModal} modal={this.state.modal} modalType={this.state.modalType} /> */}
              <HfPersonnelModal2 toggle={this.toggleModal} modal={this.state.modal} modalType={this.state.modalType} />
              <HfPersonnelUploadModal toggle={this.toggleUpload} modal={this.state.modalUpload} toggleDuplicateModal={(data) => {
                  this.toggleDuplicateModal(data);
              }}/>
              <HfPersonnelDuplicateModal toggle={this.toggleDuplicateModal} modal={this.state.modalDuplicate}/>
              <HfPersonnelDeleteModal toggle={this.toggleDeleteModal} modal={this.state.modalDelete}/>
              
              {/* <div id="count-cards" className="row">
                <div className="row col-md-7">
                  <CardCountContainer name="ADN" hf={10} hw={200}/>              
                  <CardCountContainer name="ADS" hf={10} hw={200}/>              
                  <CardCountContainer name="SDN" hf={10} hw={200}/>              
                  <CardCountContainer name="SDS" hf={10} hw={200}/>              
                  <CardCountContainer name="PDI" hf={10} hw={200}/>              
                  <CardCountContainer name="TOTAL" hf={10} hw={200}/>              
                </div>
                <div className="row col-md-5">
                  <Doughnut data={{
                    datasets: [{
                      data: [212, 22, 73, 150, 132, 20],
                      backgroundColor: [
                      '#1395ba',
                      '#0d3c55',
                      '#c02e1d',
                      '#f16c20',
                      '#ebc844',
                      '#a2b86c',
                      '#435a08'
                      ],
                    }],
                    labels:["ADN", "ADS", "PRINTER", "UPS", "AVR", "SCANNER"],
                    text: '23%'            
                  }} />
                </div>
              </div><hr/> */}

              <HfPersonnelTable
                toggleModal={this.toggleModal}
                toggleUpload={this.toggleUpload}
                toggleDeleteModal={this.toggleDeleteModal}
                title = {'HF Personnels'}
                filter = {{}}
                reducers = {{ get: SET_HF_PERSONNELS, search: SET_SEARCHED_HF_PERSONNELS }}
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
})(HfPersonnel);

