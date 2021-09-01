import {
  TOGGLE_ALERT,
  CHANGE_ALERT,
  SET_HEALTH_FACILITY_DETAIL,
  SET_HEALTH_FACILITY_DEFAULT,
  SET_HEALTH_FACILITYS,
  SET_HF_UPLOAD_DETAILS_VALUE,
} from './types';

import { SERVER_API, JWT } from '../config';
import axios from 'axios';

export const SetHealthFacilityDetail = (id) => (dispatch, getState) => {
  const { toDisplay } = getState().healthFacility;
  const healthFacility = toDisplay.filter((healthFacility) => healthFacility._id == id);

  dispatch({
    type: SET_HEALTH_FACILITY_DETAIL,
    detail: {
      healthFacility: [...healthFacility]
    }
  })

}

export const SetHealthFacilityDefault = () => (dispatch) => {
  dispatch({
    type: SET_HEALTH_FACILITY_DEFAULT,
  })
}

export const addHealthFacility = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: 'loading',
    msg: 'Adding HealthFacility'
  })

  const { healthFacility, healthFacilitys, gCount } = getState().healthFacility;

  return new Promise((resolve, reject) => {

    axios({
      url: `${SERVER_API}/ceir/health-facility/new`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        healthFacility: {...healthFacility}
      }
    })
    .then((res) =>{
      if (res.data.status){
        healthFacilitys.unshift({...res.data.healthFacility});
        if (gCount > 10){
          healthFacilitys.pop();
        }
        dispatch({
          type: SET_HEALTH_FACILITYS,
          data: {
            healthFacilitys: [...healthFacilitys],
            count: gCount + 1,
          }
        })
        dispatch({
          type: CHANGE_ALERT,
          resType: 'success',
          msg: 'HealthFacility Successfully Added'
        })
      }else {
        dispatch({
          type: CHANGE_ALERT,
          resType: 'failed',
          msg: 'Failed to Updated HealthFacility'
        })
      }
    })
    .catch(err => {
      reject(err);
    })

  })
}

export const updateHealthFacility = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: 'loading',
    msg: 'Updating HealthFacility'
  })

  const { healthFacility, gCount, toDisplay } = getState().healthFacility;
  const healthFacilitys = [...getState().healthFacility.healthFacilitys];

  return new Promise((resolve, reject) => {

    axios({
      url: `${SERVER_API}/ceir/health-facility/update`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        healthFacility: {...healthFacility}
      }
    })
    .then((res) =>{

      if (res.data.status){
        var newHealthFacilitys = toDisplay.map((r) => {
          if (healthFacility._id == r._id) {
            r = {...healthFacility};
          }
          return r;
        });

        dispatch({
          type: SET_HEALTH_FACILITYS,
          data: {
            healthFacilitys: [...newHealthFacilitys],
            count: gCount,
          }
        })
        dispatch({
          type: CHANGE_ALERT,
          resType: 'success',
          msg: 'HealthFacility Successfully Updated'
        })
      }else {
        dispatch({
          type: CHANGE_ALERT,
          resType: 'failed',
          msg: 'Failed to Updated HealthFacility'
        })
      }
    })
    .catch(err => {
      reject(err);
    })
  })
}


export const ArrangeHealthFacilities = (data) => (dispatch, getState) => {

  var arranged = data.map((row, i) => {
    return {
      region: row.hasOwnProperty("Region")?row["Region"]:"",
      province: row.hasOwnProperty("Province")?row["Province"]:"",
      name: row.hasOwnProperty("Name of Facility")?row["Name of Facility"]:"",
      munCity: row.hasOwnProperty("City/Municipality")?row["City/Municipality"]:"",
      category: row.hasOwnProperty("Service Capability(infirmary, Level I, II, or III Hospital)")?row["Service Capability(infirmary, Level I, II, or III Hospital)"]:"",
      ownership: row.hasOwnProperty("Ownership (Private, LGU, DOH)")?row["Ownership (Private, LGU, DOH)"]:"",
    }
  })
  console.log(arranged);

  dispatch({
    type: SET_HF_UPLOAD_DETAILS_VALUE,
    data: [...arranged],
  })
}

export const UploadRecordIndividually = () => (dispatch, getState) => {
	dispatch({
		type: TOGGLE_ALERT,
		resType: 'loading',
		msg: 'Uploading HF Personnel Record'
	})

	var toBeUploaded = [...getState().healthFacility.toBeUploaded];
	var toBeUploaded2 = [...getState().healthFacility.toBeUploaded];
  console.log(":::::::::::------------------+++");
  console.log(toBeUploaded);
  console.log(toBeUploaded2);
	return new Promise(async (resolve, reject) => {

		for (let x = 0, len = toBeUploaded.length; x < len; x++) {
			if (toBeUploaded[x].name.first != "" && toBeUploaded[x].name.last != "") {
				await axios({
					url: `${SERVER_API}/ceir/health-facility/new`,
					method: 'POST',
					headers: {
						'content-type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem(JWT)}`
					},
					data: {
						healthFacility: {
							...toBeUploaded[x],
						},
						index: x,
					}
				})
					.then(res => {
						console.log(res.data.index + " ************************************");
						console.log(res);
	
						toBeUploaded2[res.data.index] = {
							...toBeUploaded2[res.data.index],
							_id: res.data.healthFacility._id,
							healthFacilityID: res.data.healthFacility.healthFacilityID,
							uploadStatus: (res.data.status) ? "success" : "error",
						}
	
						// if (res.data.hasOwnProperty("duplicate")) {
						// 	console.log("^&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
						// 	toBeUploaded2[res.data.index] = {
						// 		...toBeUploaded2[res.data.index],
						// 		duplicates: [...res.data.duplicate],
						// 		uploadStatus: "duplicate",
						// 	}
						// }

						console.log(toBeUploaded2);
	
						dispatch({
							type: SET_HF_UPLOAD_DETAILS_VALUE,
							data: [...toBeUploaded2]
						})
	
					})
					.catch(err => {
						console.log("----------------");
						console.log(err);
	
						// dispatch({
						//   type: CHANGE_ALERT,
						//   resType: 'failed',
						//   msg: 'Failed to Upload HF Personnel Records'
						// })
	
					})				
			} else {

				toBeUploaded2[x] = {
					...toBeUploaded2[x],
					uploadStatus: "error",
				}				
				dispatch({
					type: SET_HF_UPLOAD_DETAILS_VALUE,
					data: [...toBeUploaded2]
				})

			}


		}

		resolve(true);
	})
}

