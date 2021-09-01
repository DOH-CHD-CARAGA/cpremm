import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import InfoModal from './../../helpers/InfoModal';
import LabelInput from './../../helpers/LabelInput';
import FileUpload from './FileUpload';

import {
  EmptyFacilityData,
} from '../../../actions/hfPersonnelAction';


class HfPersonnelDeleteModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      province: "adn",
      facility: "",
    }
  }

  render() {

    const { toUpload, uploadDetails } = this.props.hfPersonnel;
    const { facilities } = this.props.hfPersonnel;
    var sorted = [
      ...facilities[this.state.province],
    ].sort();

    var arranged = [];

    for (let x = 0; x < sorted.length; x++) {
      arranged.push({
        text: sorted[x],
        value: sorted[x],
      });
    }

    var butts = [
      {
        type: 'Empty', 
        callback: () => {
          this.props.EmptyFacilityData();
        }, 
        size: 4,
        requirePassword: true,
      },
    ];

    return (
      <InfoModal
        size={'30%'}
        modal={this.props.modal}
        toggle={this.props.toggle}
        title={'Empty Facility Data'}
        // backdrop="static"
        form={
          <Fragment>
            <div className='inpt-grp col-md-12'>
              <LabelInput case={1}
                label={'Province: '} value={this.state.province} type='select' req={1}
                options={[
                  { text: "Agusan Del Norte", value: "adn", },
                  { text: "Agusan Del Sur", value: "ads", },
                  { text: "Surigao Del Norte", value: "sdn" },
                  { text: "Surigao Del Sur", value: "sds", },
                  { text: "Province of Dinagat Island", value: "pdi", },
                ]}
                onChange={(e) => {
                  this.setState({
                    province: e.target.value
                  })
                }}
              />
            </div>
            <div className='inpt-grp col-md-12'>
              <LabelInput case={1}
                label={'Facility: '} value={this.state.facility} type='select' req={1}
                options={[{ text: "--- Select Facility ---", value: "" }, ...arranged]}
                onChange={(e) => {
                  this.setState({
                    facility: e.target.value
                  })
                }}
              />
            </div>
          </Fragment>
        }
        buttons={butts}
      />
    );

  }

}

const mapStateToProps = (state) => ({
  hfPersonnel: state.hfPersonnel
})

export default connect(mapStateToProps, {
  EmptyFacilityData,
})(HfPersonnelDeleteModal);

