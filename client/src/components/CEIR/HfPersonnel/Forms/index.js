import React from 'react';
import { connect } from 'react-redux';

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
      modalType: '',
    }


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
       
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hfPersonnel: state.hfPersonnel,
})

export default connect(mapStateToProps, {
})(HfPersonnel);

