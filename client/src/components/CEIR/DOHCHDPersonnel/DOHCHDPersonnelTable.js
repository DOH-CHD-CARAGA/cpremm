import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import {
   ArrangeDate,
   ArrangeName,
   GetList,
   GetDetail,
} from '../../../actions/helpers/displayAction';

import {
   SetDOHCHDPersonnelDetail,
   SetDOHCHDPersonnelDefault,
} from '../../../actions/DOHCHDPersonnelAction';

import DataTable from '../../helpers/DataTable';

const DOHCHDPersonnelTable = (props) => {

   return (

      <Fragment>

        <div id="downloadble-table" style={{display:"none"}}>
        <DataTable
            addData={() => {
               props.SetDOHCHDPersonnelDefault();
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
            dataBank={props.DOHCHDPersonnel}
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
                  { name: 'Name', prop: 'name' },
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

                        await props.SetDOHCHDPersonnelDetail(hfPersonnel._id);

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
                        <td scope='col'>{props.ArrangeName(hfPersonnel.name)}</td>
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


         <DataTable
            addData={() => {
               props.SetDOHCHDPersonnelDefault();
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
            dataBank={props.DOHCHDPersonnel}
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
                  // { name: 'Category ID' , prop: 'categoryID'},
                  // { name: 'Category ID #' , prop: 'categoryIDNumber'},
                  // { name: 'PhilHealth ID' , prop: 'philHealthID'},
                  // { name: 'PWD ID' , prop: 'pwdID'},
                  { name: 'Name', prop: 'name' },
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

                        await props.SetDOHCHDPersonnelDetail(hfPersonnel._id);

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
   DOHCHDPersonnel: state.DOHCHDPersonnel
})

export default connect(mapStateToProps, {
   ArrangeDate,
   ArrangeName,
   GetList,
   GetDetail,
   SetDOHCHDPersonnelDetail,
   SetDOHCHDPersonnelDefault,
})(DOHCHDPersonnelTable);

