import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import { connect } from 'react-redux';
import LabelInput from './../../helpers/LabelInput';
import DOHLogo from '../../../images/DOHLogo3.png';
import IATF from '../../../images/iatf.png';
import NTF from '../../../images/ntf.jpg';

import {
  ArrangeAmount,
  SetValue,
  ArrangeName,
  GetList,
  ArrangeDate,
  GetAge,
} from '../../../actions/helpers/displayAction';

import {
  GetDate,
} from '../../../actions/helpers/dateAction';

import {
  SET_HF_PERSONNEL_VALUE,
} from './../../../actions/types';

import {
} from '../../../actions/hfPersonnelAction';

class HfPersonnelForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
    }
  }

  render () {

    const { toDisplay } = this.props.hfPersonnel;
    var hfPersonnel = {};
    var elems = [];

    for (let x = 0; x < toDisplay.length; x++) {
      hfPersonnel = {...toDisplay[x]}
      
    console.log(hfPersonnel);
    var pName = hfPersonnel.name.last + ", " + hfPersonnel.name.first + ", " + hfPersonnel.name.mid + ", " + hfPersonnel.name.suffix;
    var pGender = hfPersonnel.sex.toLowerCase().includes("female")
                    ?2
                    :hfPersonnel.sex.toLowerCase().includes("male")
                      ?1
                      :3;
    var pBdate = (hfPersonnel.birthdate != null)?this.props.GetDate(new Date(hfPersonnel.birthdate), 0, "m/d/y", "/"):"";
    
      elems.push(

        <div id='hfPersonnel-form-2' className='entry-form'>
          <div className="form-header">
            <div className="logo-div">
              <img src={DOHLogo} height="30" className="d-inline-block align-top" alt=""/>
              <img src={NTF} height="30" className="d-inline-block align-top" alt=""/>
              <img src={IATF} height="30" className="d-inline-block align-top" alt=""/>
            </div>
            <div className="text-div">
              <strong>HEALTH ASSESSMENT ALGORITHM FOR SINOVAC </strong><br/>
              <span>of the Philippine National COVID-19 Vaccine Deployment and Vaccination Program </span>
            </div>
          </div>
          <div className="form-sub-header">
            <strong></strong>
          </div>

          <div className="form-body">

          </div>

          <div className="form-footer">
            <strong>Page 3 | 4</strong>
          </div>

        </div>
      );
    }

    return elems;
    
  }

}

const mapStateToProps = (state) => ({
  hfPersonnel: state.hfPersonnel,
});

export default connect(mapStateToProps, {
  ArrangeAmount,
  GetDate,
  SetValue,
  ArrangeName,
  GetList,
  GetAge,
})(HfPersonnelForm);

