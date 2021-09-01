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

class Form2 extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
    }
  }

  render () {

    const { toDisplay } = this.props.hfPersonnel;

    var hfPersonnel = {...this.props.personnelData}

    console.log(hfPersonnel);
    var pName = hfPersonnel.name.last + ", " + hfPersonnel.name.first + ", " + hfPersonnel.name.mid + ", " + hfPersonnel.name.suffix;
    var pGender = hfPersonnel.sex.toLowerCase().includes("female")
                    ?2
                    :hfPersonnel.sex.toLowerCase().includes("male")
                      ?1
                      :3;
    var pBdate = (hfPersonnel.birthdate != null)?this.props.GetDate(new Date(hfPersonnel.birthdate), 0, "m/d/y", "/"):"";
    
    var elems = [];

    elems.push(

        <div id='hfPersonnel-form-2' className='f2 entry-form'>
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
          <div className="form-sub-header">
            <strong></strong>
          </div>

          <div className="form-body">
              <table className="hf-table-2">
                <tr>
                  <th>ASSESS THE PATIENT</th>
                  <th>YES <span>(if statement is satisﬁed)</span></th>
                  <th>NO <span>(if statement is not satisﬁed)</span></th>
                </tr>
                <tr>
                  <td>Aged 18-59 years old?</td>
                  <td>                    
                    <Input type="checkbox" checked={true} />
                  </td>
                  <td>
                    <Input type="checkbox" checked={false} />
                  </td>
                </tr>

                <tr>
                  <td>Has no severe allergic reaction after the 1st dose of the vaccine?</td>
                  <td>                    
                    <Input type="checkbox" checked={true} />
                  </td>
                  <td>
                    <Input type="checkbox" checked={false} />
                  </td>
                </tr>

                <tr>
                  <td rowSpan={2}>
                    Has no allergy to food, egg, medicines and no asthma? <br/>
                    <p>➢ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	If with allergy or asthma, will the vaccinator able to monitor the patient for 30 minutes?</p>
                  </td>
                  <td className="center-ab">                    
                    <Input type="checkbox" checked={true} />
                  </td>
                  <td>
                    <Input type="checkbox" checked={false} />
                  </td>
                </tr>

                <tr>
                  <td className="center">                    
                    <Input type="checkbox" checked={true} />
                  </td>
                  <td>
                    <Input type="checkbox" checked={false} />
                  </td>
                </tr>


                <tr>
                  <td rowSpan={2}>
                  Has no history of bleeding disorders or currently taking anti-coagulants? <br/>
                    <p>➢ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	Has no history of bleeding disorders or currently taking anti-coagulants?</p>
                  </td>
                  <td className="center-ab">                    
                    <Input type="checkbox" checked={true} />
                  </td>
                  <td>
                    <Input type="checkbox" checked={false} />
                  </td>
                </tr>

                <tr>
                  <td className="center">                    
                    <Input type="checkbox" checked={true} />
                  </td>
                  <td>
                    <Input type="checkbox" checked={false} />
                  </td>
                </tr>

                <tr>
                  <td>
                    Does not manifest any of the following symptoms:
                    <div className="th-divs">
                      <div className="th-div-2">
                        <FormGroup check>
                          <Input type="checkbox" id="checkbox2" checked={false} />
                          <Label check for="checkbox2" >
                            Fever/chills
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Input type="checkbox" id="checkbox2" checked={false} />
                          <Label check for="checkbox2" >
                            Headache
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Input type="checkbox" id="checkbox2" checked={false} />
                          <Label check for="checkbox2" >
                            Cough
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Input type="checkbox" id="checkbox2" checked={false} />
                          <Label check for="checkbox2" >
                            Colds
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Input type="checkbox" id="checkbox2" checked={false} />
                          <Label check for="checkbox2" >
                            Sore throat
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Input type="checkbox" id="checkbox2" checked={false} />
                          <Label check for="checkbox2" >
                            Myalgia
                          </Label>
                        </FormGroup>
                      </div>

                      <div className="th-div-2">
                        <FormGroup check>
                          <Input type="checkbox" id="checkbox2" checked={false} />
                          <Label check for="checkbox2" >
                            Fatigue
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Input type="checkbox" id="checkbox2" checked={false} />
                          <Label check for="checkbox2" >
                            Weakness
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Input type="checkbox" id="checkbox2" checked={false} />
                          <Label check for="checkbox2" >
                            Loss of smell/taste
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Input type="checkbox" id="checkbox2" checked={false} />
                          <Label check for="checkbox2" >
                            Diarrhea
                          </Label>
                        </FormGroup>
                        <FormGroup check className="cb-es">
                          <Input type="checkbox" id="checkbox2" checked={false} />
                          <Label check for="checkbox2" >
                            Shortness of breath/difficulty <br/> in breathing 
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Input type="checkbox" id="checkbox2" checked={false} />
                          <Label check for="checkbox2" >
                            Rashes
                          </Label>
                        </FormGroup>
                      </div>

                    </div>

                  </td>
                  <td>                    
                    <Input type="checkbox" checked={true} />
                  </td>
                  <td>
                    <Input type="checkbox" checked={false} />
                  </td>
                </tr>

                <tr>
                  <td>Has no history of exposure to a conﬁrmed or suspected COVID-19 case in the past 2 weeks?</td>
                  <td>                    
                    <Input type="checkbox" checked={true} />
                  </td>
                  <td>
                    <Input type="checkbox" checked={false} />
                  </td>
                </tr>

                <tr>
                  <td>Has not been previously treated for COVID-19 in the past 90 days?</td>
                  <td>                    
                    <Input type="checkbox" checked={true} />
                  </td>
                  <td>
                    <Input type="checkbox" checked={false} />
                  </td>
                </tr>

                <tr>
                  <td>Has not received any vaccine in the past 28 days and does not plan to receive another vaccine 28 days following vaccination?</td>
                  <td>                    
                    <Input type="checkbox" checked={true} />
                  </td>
                  <td>
                    <Input type="checkbox" checked={false} />
                  </td>
                </tr>

                <tr>
                  <td>Has not received convalescent plasma or monoclonal antibodies for COVID-19 in the past 90 days?</td>
                  <td>                    
                    <Input type="checkbox" checked={true} />
                  </td>
                  <td>
                    <Input type="checkbox" checked={false} />
                  </td>
                </tr>                

                <tr>
                  <td rowSpan={2}>
                    Not Pregnant?
                    <p>➢ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If pregnant, 2nd or 3rd Trimester?</p>
                  </td>
                  <td className="center-ab">                    
                    <Input type="checkbox" checked={true} />
                  </td>
                  <td>
                    <Input type="checkbox" checked={false} />
                  </td>
                </tr>

                <tr>
                  <td className="center">                    
                    <Input type="checkbox" checked={true} />
                  </td>
                  <td>
                    <Input type="checkbox" checked={false} />
                  </td>
                </tr>


                <tr>
                  <td rowSpan={2}>
                    Does not have any of the following diseases or health condition? <br/>
                    <div className="th-div-2 dd">
                      <FormGroup check>
                        <Input type="checkbox" id="checkbox2" checked={false} />
                        <Label check for="checkbox2" >
                          HIV
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Input type="checkbox" id="checkbox2" checked={false} />
                        <Label check for="checkbox2" >
                          Cancer/ Malignancy
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Input type="checkbox" id="checkbox2" checked={false} />
                        <Label check for="checkbox2" >
                          Underwent Transplant
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Input type="checkbox" id="checkbox2" checked={false} />
                        <Label check for="checkbox2" >
                          Under Steroid Medication/ Treatment
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Input type="checkbox" id="checkbox2" checked={false} />
                        <Label check for="checkbox2" >
                          Bed ridden, terminal illness, less than 6 months prognosis
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Input type="checkbox" id="checkbox2" checked={false} />
                        <Label check for="checkbox2" >
                          Autoimmune disease
                        </Label>
                      </FormGroup>
                    </div>
                    If with the abovementioned condition, has presented medical clearance prior to vaccination day? <br/>
                  </td>
                  <td>                    
                    <Input type="checkbox" checked={true} />
                  </td>
                  <td>
                    <Input type="checkbox" checked={false} />
                  </td>
                </tr>

                <tr>
                  <td className="center">                    
                    <Input type="checkbox" checked={true} />
                  </td>
                  <td>
                    <Input type="checkbox" checked={false} />
                  </td>
                </tr>

              </table>

              <div className="add-details">
                <LabelInput case={1}
                  label={'Recipient’s Name:'} value={pName} prop='category' type='text'
                />

                <div className="add-2-div">
                  <div className="ad2-1">
                    <LabelInput case={1}
                      label={'Birthdate:'} value={""} prop='category' type='text'
                    />
                  </div>
                  <div className="ad2-2">
                    <LabelInput case={1}
                      label={'Sex:'} value={"22 y/o"} prop='category' type='text'
                    />
                  </div>
                </div>
                <LabelInput case={1}
                  label={'Signature of Health Worker:'} value={pName} prop='category' type='text'
                />

              </div>


          </div>

          <div className="form-footer-2">
            <strong>Page 3 | 4</strong>
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
})(Form2);

