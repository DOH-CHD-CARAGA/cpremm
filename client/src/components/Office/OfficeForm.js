import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, FormGroup} from 'reactstrap';
import { FaPlus, FaTimes } from 'react-icons/fa';
import LabelInput from '../helpers/LabelInput';

import {
  GetDate,
} from '../../actions/helpers/dateAction';

import {
  SetValue,
} from '../../actions/helpers/displayAction';

import {
  SET_OFFICE_VALUE,
} from '../../actions/types';

class OfficeForm extends React.Component {
  
  constructor (props) {
    super(props);

    this.state = {
      route: "",
    }
  }


  render () {
    
    const { office } = this.props.office;

    return (
      <div id="office-form" className="entry-form">
        <div className="custom-container">

          <div className="custom-container-title">
            Office Info
          </div>

          <div className="custom-container-body">
            <div className="row">
              <div className="inpt-grp col-md-6">
                <LabelInput case={1}
                  label={"Office ID "} value={office.officeID} prop="officeID" type="text" dtype={5} case={1}
                  className="uneditable"
                />
              </div>
              <div className="inpt-grp col-md-6">
                <LabelInput case={1}
                  label={"Office Code "} value={office.code} prop="code" type="text" req={1} dtype={5} case={1}
                  onChange={(e) => {
                    this.props.SetValue(e, SET_OFFICE_VALUE);
                  }}
                />
              </div>
            </div>   

            <div className="row">
              <div className="inpt-grp col-md-6">
                <LabelInput case={1}
                  label={"Division "} value={office.division} prop="division" type="text" req={1} dtype={5} case={1}
                  onChange={(e) => {
                    this.props.SetValue(e, SET_OFFICE_VALUE);
                  }}
                />
              </div>
              <div className="inpt-grp col-md-6">
                <LabelInput case={1}
                  label={"Section "} value={office.section} prop="section" type="text" req={1} dtype={5} case={1}
                  onChange={(e) => {
                    this.props.SetValue(e, SET_OFFICE_VALUE);
                  }}
                />
              </div>
            </div>   
          </div>

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  office: state.office
});

export default connect(mapStateToProps, {
  GetDate,
  SetValue,
})(OfficeForm);
