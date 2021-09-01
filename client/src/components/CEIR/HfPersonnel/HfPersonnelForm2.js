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
    var age = this.props.GetAge(hfPersonnel.birthdate);
    console.log(pGender);
    console.log(":::::::::::::::::::::::::::::::::::SSSS");
    console.log(age);
    console.log(hfPersonnel.birthdate);
    var address1 = hfPersonnel.address.fullAddress, address2 = hfPersonnel.address.barangay + " / " + hfPersonnel.address.munCity + " / " + hfPersonnel.address.province;
    var pStatus = hfPersonnel.status.includes("01_Single")
                    ?1
                    :hfPersonnel.status.includes("02_Married")
                      ?2
                      :hfPersonnel.status.includes("03_Widow/Widower")
                        ?3
                        :hfPersonnel.status.includes("04_Separated/Annulled")
                          ?4
                          :hfPersonnel.status.includes("05_Living_with_Partner")
                            ?5
                            :6;
  
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
            <strong>VACCINEE'S PROFILE</strong>
          </div>

          <div className="form-body">

            <div className="fb-th table-header">
              <div className="th-1">
                <span>Implementing Post:</span>
              </div>            
              <div className="th-2">
                <span>Date:</span>
              </div>
            </div>

            <div className="fb-th table-header-2">
              <span>A. PESONAL INFORMATION (<i>to be filled up at Waiting Area</i>)</span>
            </div>

            <div className="fb-th table-header-3">
              <div className="th-1">
                <LabelInput case={1}
                  label={'Name: '} value={pName} prop='category' type='text'
                />
                <span> (Last Name, First Name, Middle Name, Suffix) </span>
              </div>            
              <div className="th-2">
                <div className="th-div-1">
                  <label>Sex:</label>
                </div>
                <div>
                  <FormGroup check>
                    <Input type="checkbox" id="checkbox2" checked={(pGender == 1)?true:false} />
                    <Label check for="checkbox2" >
                      Male
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input type="checkbox" id="checkbox2" checked={(pGender == 2)?true:false} />
                    <Label check for="checkbox2" >
                      Female
                    </Label>
                  </FormGroup>
                </div>
              </div>            
            </div>

            <div className="fb-th table-header-4">
              <div className="th-1">
                <LabelInput case={1}
                  label={'Birthdate: '} value={pBdate} prop='category' type='text'
                />
                <span> (mm/dd/yyyy) </span>
              </div>   
              <div className="th-2">
                <LabelInput case={1}
                  label={'Age: '} value={age} prop='category' type='text'
                />
                <span>y/o</span>
              </div>  
            </div>   

            <div className="fb-th table-header-5">
              <div className="th-1">
                <LabelInput case={1}
                  className="th-add-1"
                  label={'Adress: '} value={address1} prop='category' type='text'
                />
                <span className="th-s-1"> (Unit/Building/House Number. Street name, Purok Zone,) </span>
                <LabelInput case={1}
                  className="th-add-2"
                  label={''} value={address2} prop='category' type='textarea'
                />
                <span className="th-s-2"> (Barangay, City/Municipality/ Province) </span>
              </div>   
              <div className="th-2">
                <LabelInput case={1}
                  label={'Contact No: '} value={hfPersonnel.contactNo} prop='category' type='text'
                />
                <span>(Mobile No. or Landline)</span>
              </div>  
            </div>   

            <div className="fb-th table-header-6">
              <div className="th-1">
                <div className="th-div-1">
                  <label>Civil Status:</label>
                </div>
                <div className="th-div-2">
                  <FormGroup check>
                    <Input type="checkbox" id="checkbox2" checked={(pStatus == 1)?true:false} />
                    <Label check for="checkbox2" >
                      Single
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input type="checkbox" id="checkbox2" checked={(pStatus == 2)?true:false} />
                    <Label check for="checkbox2" >
                      Married
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input type="checkbox" id="checkbox2" checked={(pStatus == 3)?true:false} />
                    <Label check for="checkbox2" >
                      Widow/Widower
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input type="checkbox" id="checkbox2" checked={(pStatus == 4)?true:false} />
                    <Label check for="checkbox2" >
                      Separated/Annulled
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input type="checkbox" id="checkbox2" checked={(pStatus == 5)?true:false} />
                    <Label check for="checkbox2" >
                      Living with Partner
                    </Label>
                  </FormGroup>
                </div>
              </div>            

              <div className="th-2">

                <LabelInput case={1}
                  label={'Profession/Designation: '} value={hfPersonnel.employment.profession} prop='category' type='text'
                />
                <LabelInput case={1}
                  label={'Area of Assignment: (Department/Section/Ward/Office): '} value={hfPersonnel.facility} prop='category' type='text'
                />
                <LabelInput case={1}
                  label={'Employer Name and Address: '} value={hfPersonnel.employment.employerName + ", " + hfPersonnel.employment.employerAddress} prop='category' type='textarea'
                />

              </div>            
            </div>      


            <div className="fb-th table-header-2">
              <span>B. PHYSICAL/MEDICAL EXAMINATION(<i>to be filled up at Screening Area/Screener(Doctor/Nurse)</i>)</span>
            </div>


            <div className="fb-th table-header-7">
              <div className="th-1">
                <label>Vital Signs:</label>
                <div>
                  <div className="th-box">
                    <FormGroup check>
                      <Input type="checkbox" id="checkbox2"/>
                      <Label check for="checkbox2" >
                        Heart rate: ___________________________________
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input type="checkbox" id="checkbox2"/>
                      <Label check for="checkbox2" >
                        Temparature: ___________________________
                      </Label>
                    </FormGroup>

                  </div>

                  <FormGroup check>
                    <Input type="checkbox" id="checkbox2"/>
                    <Label check for="checkbox2" >
                      Respiratory rate: _____________________________
                    </Label>
                  </FormGroup>

                  <FormGroup check>
                    <Input type="checkbox" id="checkbox2"/>
                    <Label check for="checkbox2" >
                      Blood Pressure: ______________________________
                    </Label>
                  </FormGroup>

                  <FormGroup check>
                    <Input type="checkbox" id="checkbox2"/>
                    <Label check for="checkbox2" >
                      Oxygen Saturation: ___________________________
                    </Label>
                  </FormGroup>


                </div>

              </div>

            </div>

            <div className="fb-th table-header-8">
              <div className="th-1">
                <label>Cardiovascular Examination:</label>
                <div>

                  <FormGroup check>
                    <Input type="checkbox" id="checkbox2"/>
                    <Label check for="checkbox2" >
                      Normal Rate and Rhythm: _________________________________________
                    </Label>
                  </FormGroup>

                  <FormGroup check>
                    <Input type="checkbox" id="checkbox2"/>
                    <Label check for="checkbox2" >
                      (+) Murmurs: ______________________________________________________
                    </Label>
                  </FormGroup>

                  <FormGroup check>
                    <Input type="checkbox" id="checkbox2"/>
                    <Label check for="checkbox2" >
                      (+) Irregular heart Rate and Rhythm: _______________________________
                    </Label>
                  </FormGroup>


                </div>

              </div>

            </div>

          </div>

          <div className="form-footer">
            <strong>Page 1 | 4</strong>
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

