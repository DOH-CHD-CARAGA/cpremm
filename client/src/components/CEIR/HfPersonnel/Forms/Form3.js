import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import { connect } from 'react-redux';
import LabelInput from './../../../helpers/LabelInput';
import DOHLogo from '../../../../images/DOHLogo3.png';
import IATF from '../../../../images/iatf.png';
import NTF from '../../../../images/ntf.jpg';

import {
  ArrangeAmount,
  SetValue,
  ArrangeName,
  GetList,
  ArrangeDate,
  GetAge,
} from '../../../../actions/helpers/displayAction';

import {
  GetDate,
} from '../../../../actions/helpers/dateAction';

import {
  SET_HF_PERSONNEL_VALUE,
} from './../../../../actions/types';

import {
} from '../../../../actions/hfPersonnelAction';

class Form3 extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
    }
  }

  render () {

    const { toDisplay } = this.props.hfPersonnel;

    var hfPersonnel = {...this.props.personnelData}
      
    console.log(hfPersonnel);

    var elems = [];

      elems.push(

        <div id='hfPersonnel-form-2' className='f3 entry-form'>
          <div className="form-header">
            <div className="logo-div">
              <img src={DOHLogo} height="30" className="d-inline-block align-top" alt=""/>
              <img src={NTF} height="30" className="d-inline-block align-top" alt=""/>
              <img src={IATF} height="30" className="d-inline-block align-top" alt=""/>
            </div>
            <div className="text-div">
              <strong>HEALTH ASSESSMENT ALGORITHM FOR {this.props.vaccine} </strong><br/>
              <span>of the Philippine National COVID-19 Vaccine Deployment and Vaccination Program </span>
            </div>
          </div>

          <div className="form-body">
            <label>Findings: <em>(pls. check)</em></label>
            <div className="fb-div-1">
              <FormGroup check>
                <Input type="checkbox" id="checkbox2" checked={false} />
                <Label check for="checkbox2" >
                  Qualified for Vaccination 
                </Label>
              </FormGroup>
              <FormGroup check>
                <Input type="checkbox" id="checkbox2" checked={false} />
                <Label check for="checkbox2" >
                  Not-Qualified for Vaccination
                </Label>
              </FormGroup>
              <div className="fb-div-1-1">
                <FormGroup check>
                  <Input type="checkbox" id="checkbox2" checked={false} />
                  <Label check for="checkbox2" >
                    Temporary Deferral: 
                  </Label><br/>
                  <Label>
                      Reschedule Date of Vaccination: _______________________
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Input type="checkbox" id="checkbox2" checked={false} />
                  <Label check for="checkbox2" >
                    Permanent Deferral
                  </Label><br/>
                  <Label>
                    <strong>Remarks:</strong> ______________________________________________
                  </Label>
                </FormGroup>
              </div>
            </div>

            <label>Examined by:</label><br/><br/>
            <label>____________________________________</label><br/>
            <span>Date:</span><br/><br/><br/>

            <label>C. VACCINATION: <em>(to be filled up at Vaccination Area/Vaccinator)</em></label>

          </div>

          <div className="form-body-2">
            <table>
              <tr>
                <th> Vaccine </th>
                <th> Product Name/ Manufacturer </th>
                <th> Lot No. </th>
                <th> Date of Vaccination </th>
                <th> Name of Vaccinator </th>
                <th> Signature </th>
              </tr>
              <tr>
                <td> 1st Dose </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td> 2nd Dose </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th colSpan={6} style={{textAlign:"left"}}> POST VACCINATION MONITORING AREA </th>
              </tr>
              <tr>
                <th colSpan={2}> Vital Signs: </th>
                <th colSpan={2}> Every 15 mins </th>
                <th colSpan={2}> Every 30 mins </th>
              </tr>
              <tr>
                <td style={{textAlign:"left"}} colSpan={2}>
                  <FormGroup check>
                    <Input type="checkbox" id="checkbox2" checked={false} />
                    <Label check for="checkbox2" >
                      Temperature: 
                    </Label>
                  </FormGroup>
                </td>
                <td colSpan={2}> </td>
                <td colSpan={2}> </td>
              </tr>
              <tr>
                <td style={{textAlign:"left"}} colSpan={2}>
                  <FormGroup check>
                    <Input type="checkbox" id="checkbox2" checked={false} />
                    <Label check for="checkbox2" >
                      Heart Rate: 
                    </Label>
                  </FormGroup>
                </td>
                <td colSpan={2}> </td>
                <td colSpan={2}> </td>
              </tr>
              <tr>
                <td style={{textAlign:"left"}} colSpan={2}>
                  <FormGroup check>
                    <Input type="checkbox" id="checkbox2" checked={false} />
                    <Label check for="checkbox2" >
                      Respiratory Rate: 
                    </Label>
                  </FormGroup>
                </td>
                <td colSpan={2}> </td>
                <td colSpan={2}> </td>
              </tr>
              <tr>
                <td style={{textAlign:"left"}} colSpan={2}>
                  <FormGroup check>
                    <Input type="checkbox" id="checkbox2" checked={false} />
                    <Label check for="checkbox2" >
                      Oxygen saturation: 
                    </Label>
                  </FormGroup>
                </td>
                <td colSpan={2}> </td>
                <td colSpan={2}> </td>
              </tr>
              <tr>
                <td style={{textAlign:"left"}} colSpan={2}>
                  <FormGroup check>
                    <Input type="checkbox" id="checkbox2" checked={false} />
                    <Label check for="checkbox2" >
                      Blood Pressure: 
                    </Label>
                  </FormGroup>
                </td>
                <td colSpan={2}> </td>
                <td colSpan={2}> </td>
              </tr>
            </table>
          </div>


          <div className="form-footer">
            <strong>Page 4 | 4</strong>
          </div>

        </div>
      );
  
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
})(Form3);

