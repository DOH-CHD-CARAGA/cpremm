import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import {
   ArrangeDate,
   ArrangeName,
   GetList,
   GetDetail,
   GetAge,
} from '../../../actions/helpers/displayAction';

import {
   GetDate,
} from '../../../actions/helpers/dateAction';

import {
   SetHfPersonnelDetail,
   SetHfPersonnelDefault,
} from '../../../actions/hfPersonnelAction';

import DataTable from '../../helpers/DataTable';

const HfPersonnelTable = (props) => {
    const { facilities } = props.hfPersonnel;
    var sorted = [
      ...facilities.adn,
      ...facilities.ads,
      ...facilities.sdn,
      ...facilities.sds,
      ...facilities.pdi
   ].sort();

   var arranged = [];

   for (let x = 0; x < sorted.length; x++) {
      arranged.push({
         text: sorted[x],
         value: sorted[x],
      });
   }
   
   console.log("+++++++++++++++++++++++++++++");
   console.log(sorted);

    return (

      <Fragment>

        <div id="downloadble-table" style={{display:"none"}}>
         <DataTable
               addData={() => {
                  props.SetHfPersonnelDefault();
                  props.toggleModal('add');
               }}
               title={props.title}
               upload={{
                  callback: () => {
                     props.toggleUpload();
                  }
               }}
               filter={props.filter}
               api={{ get: 'hf-personnel/get', search: 'hf-personnel/get' }}
               dataBank={props.hfPersonnel}
               reducers={props.reducers}
               search={{
                  options: [
                     { value: 'hfPersonnelID', text: 'HfPersonnel ID' },
                     { value: 'province', text: 'Province' },
                     { value: 'facility', text: 'Facility' },
                     { value: 'category', text: 'Category' },
                     { value: 'philHealthID', text: 'PhilHealth ID' },
                     { value: 'pwdID', text: 'PWD ID' },
                     { value: 'name', text: 'Name' },
                     { value: 'address', text: 'Address' },
                     // {value: 'contactNo', text: 'Contact No'}, 
                  ],
                  select: [], suggest: false,
               }}
               table={{

                  head: [
                     { name: '#' },
                     { name: 'HFP ID', prop: 'hfPersonnelID', selected: true },
                     { name: 'Province', prop: 'province', selected: true },
                     { name: 'Facility', prop: 'facility' },
                     { name: 'Category', prop: 'category' },
                     { name: 'Category ID' , prop: 'categoryID'},
                     { name: 'Category ID #' , prop: 'categoryIDNumber'},
                     { name: 'PhilHealth ID' , prop: 'philHealthID'},
                     { name: 'PWD ID' , prop: 'pwdID'},
                     { name: 'Last_Name*', prop: 'name.last' },
                     { name: 'First_Name*', prop: 'name.first' },
                     { name: 'Middle_Name*', prop: 'name.mid' },
                     { name: 'Suffix*', prop: 'name.suffix' },
                     { name: 'Contact No' , prop: 'contactNo'},
                     { name: 'Region' , prop: 'address.region'},
                     { name: 'Province', prop: 'address.province' },
                     { name: 'Mun/City', prop: 'address.munCity' },
                     { name: 'Barangay', prop: 'address.barangay' },
                     { name: 'FullAddress' , prop: 'address.fullAddress'},
                     { name: 'Sex', prop: 'sex' },
                     { name: 'Birthdate' , prop: 'birthdate'},
                     { name: 'Status' , prop: 'status'},
                     { name: 'Employed' , prop: 'employment.employed'},
                     { name: 'Profession', prop: 'employment.profession' },
                     { name: 'Employer' , prop: 'employment.employerName'},
                     { name: 'LGU' , prop: 'employment.employerLGU'},
                     { name: 'Address' , prop: 'employment.employerAddress'},
                     { name: 'Contact #' , prop: 'employment.contactNo'},
                     { name: 'Direct Contact w/ COVID 19 Patient', prop: 'covidDetails.directCovid' },
                     { name: 'Diagnosed w/ COVID 19', prop: 'covidDetails.covidHistory' },
                     { name: 'Date of 1st Positive Result', prop: 'covidDetails.covidDate' },
                     { name: 'Classification of COVID 19', prop: 'covidDetails.classification' },
                     
                     { name: 'Pregnant Status' , prop: 'pregStatus'},
                     
                     { name: 'Drug Allergy?' , prop: 'allergy.drug'},
                     { name: 'Food Allergy?' , prop: 'allergy.food'},
                     { name: 'Insect Allergy?' , prop: 'allergy.insect'},
                     { name: 'Latex Allergy?' , prop: 'allergy.latex'},
                     { name: 'Mold Allergy?' , prop: 'allergy.mold'},
                     { name: 'Pet Allergy?' , prop: 'allergy.pet'},
                     { name: 'Pollen Allergy?' , prop: 'allergy.pollen'},
                     
                     { name: 'With Comorbidity?' , prop: 'allergy.with'},
                     { name: 'Hypertension' , prop: 'allergy.hypertension'},
                     { name: 'Heart Disease' , prop: 'allergy.heartDisease'},
                     { name: 'Kidney Disease' , prop: 'allergy.kidneyDisease'},
                     { name: 'Diabetes Mellitus' , prop: 'allergy.diabetesMellitus'},
                     { name: 'Bronchial Asthma' , prop: 'allergy.bronchialAsthma'},
                     { name: 'Immunodeficiency Status*' , prop: 'allergy.immunodeficiencyStatus'},
                     { name: 'Cancer' , prop: 'allergy.cancer'},
                     { name: 'Other' , prop: 'allergy.others'},

                     { name: 'Willing to be Vaccinated' , prop: 'consent'},

                  ],

                  body: (hfPersonnel, i) => {
                     console.log(hfPersonnel);
                     return (
                        <tr style={{ fontSize: '11px' }} className='clickable' data-id={hfPersonnel._id} onClick={async (e) => {

                           await props.SetHfPersonnelDetail(hfPersonnel._id);

                           props.toggle();
                           // props.GetDetail('hfPersonnel/detail', SET_DEVICE_DETAIL, hfPersonnel._id)
                           //   .then(data => {
                           //     // props.toggle();
                           //   });

                        }}>
                           <td scope='col'>{i + 1}</td>
                           <td scope='col'>{hfPersonnel.hfPersonnelID}</td>
                           <td scope='col'>{(hfPersonnel.province) ? hfPersonnel.province.toUpperCase() : ""}</td>
                           <td scope='col'>{hfPersonnel.facility || ""}</td>
                           <td scope='col'>{hfPersonnel.category}</td>
                           <td scope='col'>{ hfPersonnel.categoryID }</td>
                           <td scope='col'>{ hfPersonnel.categoryIDNumber }</td>
                           <td scope='col'>{ hfPersonnel.philHealthID }</td>
                           <td scope='col'>{ ((hfPersonnel.pwdID == "undefined")?"":hfPersonnel.pwdID) || "" }</td>
                           <td scope='col'>{hfPersonnel.name.last}</td>
                           <td scope='col'>{hfPersonnel.name.first}</td>
                           <td scope='col'>{hfPersonnel.name.mid}</td>
                           <td scope='col'>{hfPersonnel.name.suffix}</td>
                           <td scope='col'>{ hfPersonnel.contactNo }</td>
                           <td scope='col'>{ hfPersonnel.address.region }</td>
                           <td scope='col'>{hfPersonnel.address.province}</td>
                           <td scope='col'>{hfPersonnel.address.munCity}</td>
                           <td scope='col'>{hfPersonnel.address.barangay}</td>
                           <td scope='col'>{ hfPersonnel.address.fullAddress }</td>
                           <td scope='col'>{hfPersonnel.sex}</td>
                           <td scope='col'>{ props.ArrangeDate(new Date(hfPersonnel.birthdate), false) }</td>
                           <td scope='col'>{ hfPersonnel.status }</td>
                           <td scope='col'>{ hfPersonnel.employment.employed }</td>
                           <td scope='col'>{hfPersonnel.employment.profession}</td>
                           <td scope='col'>{ hfPersonnel.employment.employerName }</td>
                           <td scope='col'>{ hfPersonnel.employment.employerLGU }</td>
                           <td scope='col'>{ hfPersonnel.employment.employerAddress }</td>
                           <td scope='col'>{ hfPersonnel.employment.contactNo }</td>
                           <td scope='col'>{ hfPersonnel.covidDetails.directCovid }</td>
                           <td scope='col'>{ hfPersonnel.covidDetails.covidHistory }</td>
                           <td scope='col'>{ hfPersonnel.covidDetails.covidDate }</td>
                           <td scope='col'>{ hfPersonnel.covidDetails.classification }</td>

                           <td scope='col'>{ hfPersonnel.pregStatus }</td>

                           <td scope='col'>{ hfPersonnel.allergy.drug }</td>
                           <td scope='col'>{ hfPersonnel.allergy.food }</td>
                           <td scope='col'>{ hfPersonnel.allergy.insect }</td>
                           <td scope='col'>{ hfPersonnel.allergy.latex }</td>
                           <td scope='col'>{ hfPersonnel.allergy.mold }</td>
                           <td scope='col'>{ hfPersonnel.allergy.pet }</td>
                           <td scope='col'>{ hfPersonnel.allergy.pollen }</td>

                           <td scope='col'>{ (hfPersonnel.hasOwnProperty("comorbidities"))?hfPersonnel.comorbidities.with:"" }</td>
                           <td scope='col'>{ (hfPersonnel.hasOwnProperty("comorbidities"))?hfPersonnel.comorbidities.hypertension:"" }</td>
                           <td scope='col'>{ (hfPersonnel.hasOwnProperty("comorbidities"))?hfPersonnel.comorbidities.heartDisease:"" }</td>
                           <td scope='col'>{ (hfPersonnel.hasOwnProperty("comorbidities"))?hfPersonnel.comorbidities.kidneyDisease:"" }</td>
                           <td scope='col'>{ (hfPersonnel.hasOwnProperty("comorbidities"))?hfPersonnel.comorbidities.diabetesMellitus:"" }</td>
                           <td scope='col'>{ (hfPersonnel.hasOwnProperty("comorbidities"))?hfPersonnel.comorbidities.bronchialAsthma:"" }</td>
                           <td scope='col'>{ (hfPersonnel.hasOwnProperty("comorbidities"))?hfPersonnel.comorbidities.immunodeficiencyStatus:"" }</td>
                           <td scope='col'>{ (hfPersonnel.hasOwnProperty("comorbidities"))?hfPersonnel.comorbidities.cancer:"" }</td>
                           <td scope='col'>{ (hfPersonnel.hasOwnProperty("comorbidities"))?hfPersonnel.comorbidities.others:"" }</td>

                           <td scope='col'>{ hfPersonnel.consent }</td>

                        </tr>
                     )
                  }
               }}
            />
        </div>

        <div id="downloadble-table-none" style={{display:"none"}}>
         <DataTable
               addData={() => {
                  props.SetHfPersonnelDefault();
                  props.toggleModal('add');
               }}
               title={props.title}
               upload={{
                  callback: () => {
                     props.toggleUpload();
                  }
               }}
               filter={props.filter}
               api={{ get: 'hf-personnel/get', search: 'hf-personnel/get' }}
               dataBank={props.hfPersonnel}
               reducers={props.reducers}
               search={{
                  options: [
                     { value: 'hfPersonnelID', text: 'HfPersonnel ID' },
                     { value: 'province', text: 'Province' },
                     { value: 'facility', text: 'Facility' },
                     { value: 'category', text: 'Category' },
                     { value: 'philHealthID', text: 'PhilHealth ID' },
                     { value: 'pwdID', text: 'PWD ID' },
                     { value: 'name', text: 'Name' },
                     { value: 'address', text: 'Address' },
                     // {value: 'contactNo', text: 'Contact No'}, 
                  ],
                  select: [], suggest: false,
               }}
               table={{

                  head: [
                     { name: '#' },
                     { name: 'HFP ID', prop: 'hfPersonnelID', selected: true },
                     { name: 'Province', prop: 'province', selected: true },
                     { name: 'Facility', prop: 'facility' },
                     { name: 'Category', prop: 'category' },
                     { name: 'Category_ID*' , prop: 'categoryID'},
                     { name: 'Category_ID_Number*' , prop: 'categoryIDNumber'},
                     { name: 'PhilHealth_ID' , prop: 'philHealthID'},
                     { name: 'PWD ID' , prop: 'pwdID'},
                     { name: 'Last_Name*', prop: 'name.last' },
                     { name: 'First_Name*', prop: 'name.first' },
                     { name: 'Middle_Name*', prop: 'name.mid' },
                     { name: 'Suffix*', prop: 'name.suffix' },
                     { name: 'Contact_No.*' , prop: 'contactNo'},
                     { name: 'Current_Residence:_Region' , prop: 'address.region'},
                     { name: 'Current_Residence: Province*', prop: 'address.province' },
                     { name: 'Current_Residence: Municipality/City*', prop: 'address.munCity' },
                     { name: 'Current_Residence: Barangay*', prop: 'address.barangay' },
                     // { name: 'FullAddress' , prop: 'address.fullAddress'},
                     { name: 'Sex*', prop: 'sex' },
                     { name: 'Birthdate_mm/dd/yyyy_*' , prop: 'birthdate'},
                     { name: 'Age*' , prop: 'Age'},
                     
                     { name: 'Willing to be Vaccinated' , prop: 'consent'},

                     { name: 'Reason for Refusal' , prop: ''},
                     { name: 'Age more than 16 years old?' , prop: ''},
                     { name: 'Has no allergies to PEG or polysorbate?' , prop: ''},
                     { name: 'Has no severe allergic reaction after the 1st dose of the vaccine?', prop: '' },
                     { name: 'Has no allergy to food, egg, medicines, and no asthma?', prop: '' },
                     { name: '* If with allergy or asthma, will the vaccinator able to monitor the patient for 30 minutes?', prop: '' },
                     { name: 'Has no history of bleeding disorders or currently taking anti-coagulants?', prop: '' },
                     { name: '* if with bleeding history, is a gauge 23 - 25 syringe available for injection?', prop: '' },
                     { name: 'Does not manifest any of the following symptoms: Fever/chills, Headache, Cough, Colds, Sore throat,  Myalgia, Fatigue, Weakness, Loss of smell/taste, Diarrhea, Shortness of breath/ difficulty in breathing', prop: '' },
                     { name: '* If manifesting any of the mentioned symptom/s, specify all that apply', prop: '' },
                     { name: 'Has no history of exposure to a confirmed or suspected COVID-19 case in the past 2 weeks?', prop: '' },
                     { name: 'Has not been previously treated for COVID-19 in the past 90 days?', prop: '' },
                     { name: 'Has not received any vaccine in the past 2 weeks?', prop: '' },
                     { name: 'Has not received convalescent plasma or monoclonal antibodies for COVID-19 in the past 90 days?', prop: '' },
                     { name: 'Not Pregnant?', prop: '' },
                     { name: '* if pregnant, 2nd or 3rd Trimester?', prop: '' },
                     { name: 'Does not have any of the following: HIV, Cancer/ Malignancy, Underwent Transplant, Under Steroid Medication/ Treatment, Bed Ridden, terminal illness, less than 6 months prognosis', prop: '' },
                     { name: '* If with mentioned condition/s, specify.', prop: '' },
                     { name: '* If with mentioned condition, has presented medical clearance prior to vaccination day?', prop: '' },
                     { name: 'Deferral', prop: '' },
                     { name: 'Date of Vaccination', prop: '' },
                     { name: 'Vaccine Manufacturer Name', prop: '' },
                     { name: 'Batch Number', prop: '' },
                     { name: 'Lot Number', prop: '' },
                     { name: 'Vaccinator Name', prop: '' },
                     { name: 'Profession of Vaccinator', prop: '' },
                     { name: '1st Dose', prop: '' },
                     { name: '2nd Dose', prop: '' },

                     
                  ],

                  body: (hfPersonnel, i) => {
                     console.log(hfPersonnel);
                     var pBdate = (hfPersonnel.birthdate != null)?props.GetDate(new Date(hfPersonnel.birthdate), 0, "m/d/y", "/"):"";

                     return (
                        <tr style={{ fontSize: '11px' }} className='clickable' data-id={hfPersonnel._id} onClick={async (e) => {

                           await props.SetHfPersonnelDetail(hfPersonnel._id);

                           props.toggle();
                           // props.GetDetail('hfPersonnel/detail', SET_DEVICE_DETAIL, hfPersonnel._id)
                           //   .then(data => {
                           //     // props.toggle();
                           //   });

                        }}>
                           <td scope='col'>{i + 1}</td>
                           <td scope='col'>{hfPersonnel.hfPersonnelID}</td>
                           <td scope='col'>{(hfPersonnel.province) ? hfPersonnel.province.toUpperCase() : ""}</td>
                           <td scope='col'>{hfPersonnel.facility || ""}</td>
                           <td scope='col'>{hfPersonnel.category}</td>
                           <td scope='col'>{ hfPersonnel.categoryID }</td>
                           <td scope='col'>{ hfPersonnel.categoryIDNumber }</td>
                           <td scope='col'>{ hfPersonnel.philHealthID }</td>
                           <td scope='col'>{ ((hfPersonnel.pwdID == "undefined")?"":hfPersonnel.pwdID) || "" }</td>
                           <td scope='col'>{hfPersonnel.name.last}</td>
                           <td scope='col'>{hfPersonnel.name.first}</td>
                           <td scope='col'>{hfPersonnel.name.mid}</td>
                           <td scope='col'>{hfPersonnel.name.suffix}</td>
                           <td scope='col'>{ hfPersonnel.contactNo }</td>
                           <td scope='col'>{ hfPersonnel.address.region }</td>
                           <td scope='col'>{hfPersonnel.address.province}</td>
                           <td scope='col'>{hfPersonnel.address.munCity}</td>
                           <td scope='col'>{hfPersonnel.address.barangay}</td>
                           {/* <td scope='col'>{ hfPersonnel.address.fullAddress }</td> */}
                           <td scope='col'>{hfPersonnel.sex}</td>
                           <td scope='col'>{ pBdate }</td>
                           <td scope='col'>{ props.GetAge(pBdate) }</td>

                           <td scope='col'>{ hfPersonnel.consent }</td>

                           <td scope='col'></td>
                           <td scope='col'></td>
                           <td scope='col'></td>
                           <td scope='col'></td>
                           <td scope='col'></td>
                           <td scope='col'></td>
                           <td scope='col'></td>
                           <td scope='col'></td>
                           <td scope='col'></td>
                           <td scope='col'></td>
                           <td scope='col'></td>
                           <td scope='col'></td>
                           <td scope='col'></td>
                           <td scope='col'></td>
                           <td scope='col'>{ hfPersonnel.pregStatus }</td>
                           <td scope='col'></td>
                           <td scope='col'></td>
                           <td scope='col'></td>
                           <td scope='col'></td>
                           <td scope='col'></td>
                           <td scope='col'></td>
                           <td scope='col'></td>
                           <td scope='col'></td>
                           <td scope='col'></td>
                           <td scope='col'></td>
                           <td scope='col'></td>
                           <td scope='col'></td>
                           <td scope='col'></td>

                        </tr>
                     )
                  }
               }}
            />
        </div>         



         <DataTable
            addData={() => {
               props.SetHfPersonnelDefault();
               props.toggleModal('add');
            }}
            title={props.title}
            upload={{
               callback: () => {
                  props.toggleUpload();
               }
            }}
            trash={{
               callback: () => {
               //   console.log("trash");
                  props.toggleDeleteModal()
               }
             }}              
            filter={props.filter}
            api={{ get: 'hf-personnel/get', search: 'hf-personnel/get' }}
            dataBank={props.hfPersonnel}
            reducers={props.reducers}
            search={{
               options: [
                  { value: 'hfPersonnelID', text: 'HfPersonnel ID' },
                  { value: 'province', text: 'Province' },
                  { value: 'facility', text: 'Facility' },
                  { value: 'category', text: 'Category' },
                  { value: 'philHealthID', text: 'PhilHealth ID' },
                  { value: 'pwdID', text: 'PWD ID' },
                  { value: 'name', text: 'Name' },
                  { value: 'address', text: 'Address' },
                  // {value: 'contactNo', text: 'Contact No'}, 
               ],
               options2: {
                  province: [
                    {text: " --- Select Province --- ",  value: ""},
                    {text: "Agusan Del Norte", value: "adn",},
                    {text: "Agusan Del Sur", value: "ads",  },
                    {text: "Surigao Del Norte", value: "sdn"},
                    {text: "Surigao Del Sur", value: "sds", },
                    {text: "Province of Dinagat Island", value: "pdi",},                 
                  ],
                  facility: [
                     ...arranged
                  ]
               },
               select: [], suggest: false,
            }}
            table={{

               head: [
                  { name: '#' },
                  { name: 'HFP ID', prop: 'hfPersonnelID', selected: true },
                  { name: 'Province', prop: 'province' },
                  { name: 'Facility', prop: 'facility' },
                  { name: 'Category', prop: 'category' },
                  // { name: 'Category ID' , prop: 'categoryID'},
                  // { name: 'Category ID #' , prop: 'categoryIDNumber'},
                  // { name: 'PhilHealth ID' , prop: 'philHealthID'},
                  // { name: 'PWD ID' , prop: 'pwdID'},
                  { name: 'Name', prop: 'name.last' },
                  // { name: 'Contact No' , prop: 'contactNo'},
                  // { name: 'Region' , prop: 'address.region'},
                  { name: 'Province', prop: 'address.province' },
                  { name: 'Mun/City', prop: 'address.munCity' },
                  { name: 'Barangay', prop: 'address.barangay' },
                  // { name: 'FullAddress' , prop: 'address.fullAddress'},
                  { name: 'Sex', prop: 'sex' },
                  // { name: 'Birthdate' , prop: 'birthdate'},
                  // { name: 'Status' , prop: 'status'},
                  // { name: 'Employed' , prop: 'employment.employed'},
                  { name: 'Profession', prop: 'employment.profession' },
                  // { name: 'Employer' , prop: 'employment.employerName'},
                  // { name: 'LGU' , prop: 'employment.employerLGU'},
                  // { name: 'Address' , prop: 'employment.employerAddress'},
                  // { name: 'Contact #' , prop: 'employment.contactNo'},
               ],

               body: (hfPersonnel, i) => {
                  console.log(hfPersonnel);
                  return (
                     <tr style={{ fontSize: '11px' }} className='clickable' data-id={hfPersonnel._id} onClick={async (e) => {

                        await props.SetHfPersonnelDetail(hfPersonnel._id);

                        props.toggle();
                        // props.GetDetail('hfPersonnel/detail', SET_DEVICE_DETAIL, hfPersonnel._id)
                        //   .then(data => {
                        //     // props.toggle();
                        //   });

                     }}>
                        <td scope='col'>{i + 1}</td>
                        <td scope='col'>{hfPersonnel.hfPersonnelID}</td>
                        <td scope='col'>{(hfPersonnel.province) ? hfPersonnel.province.toUpperCase() : ""}</td>
                        <td scope='col'>{hfPersonnel.facility || ""}</td>
                        <td scope='col'>{hfPersonnel.category}</td>
                        {/* <td scope='col'>{ hfPersonnel.categoryID }</td>
                  <td scope='col'>{ hfPersonnel.categoryIDNumber }</td>
                  <td scope='col'>{ hfPersonnel.philHealthID }</td>
                  <td scope='col'>{ ((hfPersonnel.pwdID == "undefined")?"":hfPersonnel.pwdID) || "" }</td> */}
                        <td scope='col'>{props.ArrangeName(hfPersonnel.name)}</td>
                        {/* <td scope='col'>{ hfPersonnel.contactNo }</td> */}
                        {/* <td scope='col'>{ hfPersonnel.address.region }</td> */}
                        <td scope='col'>{hfPersonnel.address.province}</td>
                        <td scope='col'>{hfPersonnel.address.munCity}</td>
                        <td scope='col'>{hfPersonnel.address.barangay}</td>
                        {/* <td scope='col'>{ hfPersonnel.address.fullAddress }</td> */}
                        <td scope='col'>{hfPersonnel.sex}</td>
                        {/* <td scope='col'>{ props.ArrangeDate(new Date(hfPersonnel.birthdate), false) }</td> */}
                        {/* <td scope='col'>{ hfPersonnel.status }</td> */}

                        {/* <td scope='col'>{ hfPersonnel.employment.employed }</td> */}
                        <td scope='col'>{hfPersonnel.employment.profession}</td>
                        {/* <td scope='col'>{ hfPersonnel.employment.employerName }</td> */}
                        {/* <td scope='col'>{ hfPersonnel.employment.employerLGU }</td>
                  <td scope='col'>{ hfPersonnel.employment.employerAddress }</td>
                  <td scope='col'>{ hfPersonnel.employment.contactNo }</td> */}
                     </tr>
                  )
               }
            }}
         />

      </Fragment>
   );
}

const mapStateToProps = (state) => ({
   hfPersonnel: state.hfPersonnel
})

export default connect(mapStateToProps, {
   ArrangeDate,
   ArrangeName,
   GetList,
   GetDetail,
   GetAge,
   GetDate,
   SetHfPersonnelDetail,
   SetHfPersonnelDefault,
})(HfPersonnelTable);

