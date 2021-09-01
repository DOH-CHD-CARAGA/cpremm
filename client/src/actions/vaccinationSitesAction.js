import {
  TOGGLE_ALERT,
  CHANGE_ALERT,
  SET_VACCINATION_SITES_DETAIL,
  SET_VACCINATION_SITES_DEFAULT,
  SET_VACCINATION_SITESS,
  SET_VACCINATION_TO_UPLOAD_LIST,
} from './types';

import { SERVER_API, JWT } from '../config';
import axios from 'axios';

export const SetVaccinationSitesDetail = (id) => (dispatch, getState) => {
  const { toDisplay } = getState().vaccinationSites;
  const vaccinationSites = toDisplay.filter((vaccinationSites) => vaccinationSites._id == id);

  dispatch({
    type: SET_VACCINATION_SITES_DETAIL,
    detail: {
      vaccinationSites: [...vaccinationSites]
    }
  })

}

export const SetVaccinationSitesDefault = () => (dispatch) => {
  dispatch({
    type: SET_VACCINATION_SITES_DEFAULT,
  })
}

export const addVaccinationSites = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: 'loading',
    msg: 'Adding Vaccination Sites'
  })

  const { vaccinationSites, vaccinationSitess, gCount } = getState().vaccinationSites;

  return new Promise((resolve, reject) => {

    axios({
      url: `${SERVER_API}/ceir/vaccination-sites/new`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        vaccinationSites: {...vaccinationSites}
      }
    })
    .then((res) =>{
      if (res.data.status){
        vaccinationSitess.unshift({...res.data.vaccinationSites});
        if (gCount > 10){
          vaccinationSitess.pop();
        }
        dispatch({
          type: SET_VACCINATION_SITESS,
          data: {
            vaccinationSitess: [...vaccinationSitess],
            count: gCount + 1,
          }
        })
        dispatch({
          type: CHANGE_ALERT,
          resType: 'success',
          msg: 'Vaccination Sites Successfully Added'
        })
      }else {
        dispatch({
          type: CHANGE_ALERT,
          resType: 'failed',
          msg: 'Failed to Updated Vaccination Sites'
        })
      }
    })
    .catch(err => {
      reject(err);
    })

  })
}

export const updateVaccinationSites = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: 'loading',
    msg: 'Updating Vaccination Sites'
  })

  const { vaccinationSites, gCount } = getState().vaccinationSites;
  const vaccinationSitess = [...getState().vaccinationSites.vaccinationSitess];

  return new Promise((resolve, reject) => {

    axios({
      url: `${SERVER_API}/ceir/vaccination-sites/update`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        vaccinationSites: {...vaccinationSites}
      }
    })
    .then((res) =>{

      if (res.data.status){
        vaccinationSitess.map((r) => {
          if (vaccinationSites._id == r._id) {
            r = {...vaccinationSites};
          }
          return r;
        });

        dispatch({
          type: SET_VACCINATION_SITESS,
          data: {
            vaccinationSitess: [...vaccinationSitess],
            count: gCount,
          }
        })
        dispatch({
          type: CHANGE_ALERT,
          resType: 'success',
          msg: 'Vaccination Sites Successfully Updated'
        })
      }else {
        dispatch({
          type: CHANGE_ALERT,
          resType: 'failed',
          msg: 'Failed to Updated Vaccination Sites'
        })
      }
    })
    .catch(err => {
      reject(err);
    })
  })
}

export const ArrangeVaccinationSites = (data) => (dispatch, getState) => {

  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  var arranged = data.map((row, i) => {
    return {
      vaccinationSitesID : "",
      code : row["Bakuna Center Code"] || "",
      codeShort : row["Bakuna Center Code Short"] || "",
      name : row["Bakuna Center Name"] || "",
      type : row["Type"] || "",
      ownership : row["Ownership Major Classification"] || "",
      address : {
        longitude: row["Longitude"] || "",
        latitude: row["Latitude"] || "",
    
        addressLine: row["Street Name and #:"] || "",
        building: row["Building name and #"] || "",
        region: {
          name: row["Region Name"] || "",
          psgc: row["Region PSGC"] || "",
        },
        province: {
          name: row["Province Name"] || "",
          psgc: row["Province PSGC"] || "",
        },
        munCity: {
          name: row["City/Municipality Name"] || "",
          psgc: (row["City/Municipality PSGC"] + "") || "",
        },
        barangay: {
          name: row["Barangay Name"] || "",
          psgc: (row["Barangay PSGC"] + "") || "",
        },
      },
      supervisor : {
        name: {
          first: row["Bakuna Center Supervisor First Name"] || "",
          mid:   "",
          last:  row["Bakuna Center Supervisor Last Name"] || "",
        },
        contact: (row["Bakuna Center Supervisor Mobile Number"] + "") || "",
        email: row["Bakuna Center Supervisor Email Address"] || "",
      },
      representativeStaff : {
        name: {
          first: row["Overall IT/System Representative First Name"] || "",
          mid:   "",
          last:  row["Overall IT/System Representative Last Name"] || "",
        },
        contact: (row["Overall IT/System Representative Mobile Number"] + "") || "",
        email: row["Overall IT/System Representative Email Address"] || "",
      },
      inventoryStaff : {
        name: {
          first: row["Inventory System User First Name"] || "",
          mid:   "",
          last:  row["Inventory System User Last Name"] || "",
        },
        contact: (row["Inventory System User Mobile Number"] + "") || "",
        email: row["Inventory System User Email Address"] || "",
      },
      
      status : row["Bakuna Center Status in the database"] || "",
      inactiveNote : row["Reason for inactive"] || "",
      numberOfTeams : row["Number Of Vaccination Teams"] || "",
      addedBy : row["Added By"] || "",
      dateReported : new Date(Math.round((row["Date Reported"] - 25569) * 86400 * 1000)) || null,
      updatedBy : row["Updated By"] || "",
      dateUpdated : new Date(Math.round((row["Date Updated"] - 25569) * 86400 * 1000)) || null,
    };
  })
  console.log(arranged);

  dispatch({
    type: SET_VACCINATION_TO_UPLOAD_LIST,
    data: [...arranged],
  })

}
