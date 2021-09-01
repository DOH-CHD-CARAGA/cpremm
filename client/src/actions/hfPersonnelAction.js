import {
	TOGGLE_ALERT,
	CHANGE_ALERT,
	SET_HF_PERSONNEL_DETAIL,
	SET_HF_PERSONNEL_DEFAULT,
	SET_HF_PERSONNELS,
	SET_HF_PERSONNEL_TO_UPLOAD,
	RESET_HF_PERSONNEL_UPLOAD,
	RESET_HF_PERSONNEL_UPLOAD_BOOL,
	SET_CEIR_DASHBOARD_NUMBERS,
	SET_PROFESSION_CLASSIFICATION,
	SET_CATEGORY_CLASSIFICATION,
} from './types';

import { SERVER_API, JWT } from '../config';
import axios from 'axios';

import { RequirePassword } from './helpers/displayAction';

export const SetHfPersonnelDetail = (id) => (dispatch, getState) => {
	const { toDisplay } = getState().hfPersonnel;
	const hfPersonnel = toDisplay.filter((hfPersonnel) => hfPersonnel._id == id);

	dispatch({
		type: SET_HF_PERSONNEL_DETAIL,
		detail: {
			hfPersonnel: [...hfPersonnel]
		}
	})

}

export const SetHfPersonnelDefault = () => (dispatch) => {
	dispatch({
		type: SET_HF_PERSONNEL_DEFAULT,
	})
}

export const addHfPersonnel = () => (dispatch, getState) => {
	dispatch({
		type: TOGGLE_ALERT,
		resType: 'loading',
		msg: 'Adding HF Personnel'
	})

	const { hfPersonnel, hfPersonnels, gCount } = getState().hfPersonnel;

	return new Promise((resolve, reject) => {

		axios({
			url: `${SERVER_API}/hf-personnel/new`,
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem(JWT)}`
			},
			data: {
				hfPersonnel: { ...hfPersonnel }
			}
		})
			.then((res) => {
				if (res.data.status) {
					hfPersonnels.unshift({ ...res.data.hfPersonnel });
					if (gCount > 10) {
						hfPersonnels.pop();
					}
					dispatch({
						type: SET_HF_PERSONNELS,
						data: {
							hfPersonnels: [...hfPersonnels],
							count: gCount + 1,
						}
					})
					dispatch({
						type: CHANGE_ALERT,
						resType: 'success',
						msg: 'HF Personnel Successfully Added'
					})
				} else {
					dispatch({
						type: CHANGE_ALERT,
						resType: 'failed',
						msg: 'Failed to Updated HF Personnel'
					})
				}
			})
			.catch(err => {
				reject(err);
			})

	})
}

export const updateHfPersonnel = () => (dispatch, getState) => {
	dispatch({
		type: TOGGLE_ALERT,
		resType: 'loading',
		msg: 'Updating HF Personnel'
	})

	const { hfPersonnel, gCount } = getState().hfPersonnel;
	const toDisplay = [...getState().hfPersonnel.toDisplay];

	return new Promise((resolve, reject) => {

		axios({
			url: `${SERVER_API}/hf-personnel/update`,
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem(JWT)}`
			},
			data: {
				hfPersonnel: { ...hfPersonnel }
			}
		})
			.then((res) => {

				if (res.data.status) {
					toDisplay.map((r) => {
						if (hfPersonnel._id == r._id) {
							r = { ...hfPersonnel };
						}
						return r;
					});

					dispatch({
						type: SET_HF_PERSONNELS,
						data: {
							hfPersonnels: [...toDisplay],
							count: gCount,
						}
					})
					dispatch({
						type: CHANGE_ALERT,
						resType: 'success',
						msg: 'HF Personnel Successfully Updated'
					})
				} else {
					dispatch({
						type: CHANGE_ALERT,
						resType: 'failed',
						msg: 'Failed to Updated HF Personnel'
					})
				}
			})
			.catch(err => {
				reject(err);
			})
	})
}

export const ArrangeFHPersonnel = (records) => (dispatch, getState) => {
	console.log("::::::::::::______+++++++==");
	console.log(records);
	dispatch({
		type: SET_HF_PERSONNEL_TO_UPLOAD,
		toUpload: [...records]
	})
}

export const UploadRecord = () => (dispatch, getState) => {
	dispatch({
		type: TOGGLE_ALERT,
		resType: 'loading',
		msg: 'Uploading HF Personnel Record'
	})

	var toUpload = [...getState().hfPersonnel.toUpload];
	var toUpload2 = [...getState().hfPersonnel.toUpload];
	console.log("$$$$$$$$$$$$$$$$$$$$$$$$4");
	console.log(toUpload);

	toUpload = toUpload.map((record, i) => {
		return {
			category: record.Category || "",
			categoryID: record.CategoryID || "",
			categoryIDNumber: ((typeof (record.CategoryIDnumber == "number")) ? (record.CategoryIDnumber + "") : record.CategoryIDnumber) || "",
			philHealthID: ((typeof (record.PhilHealthID == "number")) ? (record.PhilHealthID + "") : record.PhilHealthID) || "",
			pwdID: ((typeof (record.PWD_ID == "number")) ? (record.PWD_ID + "") : record.PWD_ID) || "",
			name: {
				first: record.Firstname || "",
				mid: record.Middlename || "",
				last: record.Lastname || "",
				suffix: record.Suffix || "",
			},
			contactNo: ((typeof (record.Contact_no == "number")) ? (record.Contact_no + "") : record.Contact_no) || "",
			address: {
				fullAddress: record.Full_address || "",
				region: record.Region || "",
				province: record.Province || "",
				munCity: record.MunCity || "",
				barangay: record.Barangay || "",
			},
			sex: record.Sex || "",
			birthdate: (record.Birthdate_ && record.Birthdate_ != "") ? new Date(Math.round((record.Birthdate_ - 25569) * 86400 * 1000)) : null,
			status: record.Civilstatus || "",
			employment: {
				employed: record.Employed || "",
				profession: record.Profession || "",
				employerName: record.Employer_name || "",
				employerLGU: record.Employer_LGU || "",
				employerAddress: record.Employer_address || "",
				contactNo: record['Employer_contact_no.'] || "",
			},
			covidDetails: {
				directCovid: record.Direct_covid || "",
				covidHistory: record.covid_history || "",
				covidDate: (record.covid_date && record.covid_date != "") ? new Date(Math.round((record.covid_date - 25569) * 86400 * 1000)) : null,
				classification: record.covid_classification || "",
			},

			allergy: {
				drug: record.Allergy_01 || "",
				food: record.Allergy_02 || "",
				insect: record.Allergy_03 || "",
				latex: record.Allergy_04 || "",
				mold: record.Allergy_05 || "",
				pet: record.Allergy_06 || "",
				pollen: record.Allergy_07 || "",
			},

			comorbidities: {
				with: record.W_comorbidities || "",
				hypertension: record.Comorbidity_01 || "",
				heartDisease: record.Comorbidity_02 || "",
				kidneyDisease: record.Comorbidity_03 || "",
				diabetesMellitus: record.Comorbidity_04 || "",
				bronchialAsthma: record.Comorbidity_05 || "",
				immunodeficiencyStatus: record.Comorbidity_06 || "",
				cancer: record.Comorbidity_07 || "",
				others: record.Comorbidity_08 || "",
			},

			pregStatus: record.Preg_status || "",
			consent: record.Consent || "",

		}
	})


	console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%55");
	console.log(toUpload);


	return new Promise(async (resolve, reject) => {
		await axios({
			url: `${SERVER_API}/hf-personnel/upload`,
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem(JWT)}`
			},
			data: {
				hfPersonnel: [...toUpload]
			}
		})
			.then(res => {
				console.log("************************************");
				console.log(res);
				console.log(res.data.result);

				toUpload2 = toUpload2.map((record, i) => {
					return {
						...record,
						uploadStatus: res.data.result[i].success ? "success" : "error"
					}
				})

				dispatch({
					type: SET_HF_PERSONNEL_TO_UPLOAD,
					toUpload: [...toUpload2]
				})

				dispatch({
					type: CHANGE_ALERT,
					resType: 'success',
					msg: 'HF Personnel Records Successfully Uploaded'
				})

			})
			.catch(err => {
				console.log("----------------");
				console.log(err);

				dispatch({
					type: CHANGE_ALERT,
					resType: 'failed',
					msg: 'Failed to Upload HF Personnel Records'
				})

			})

		resolve(true);
	})
}

export const UploadRecordIndividually = () => (dispatch, getState) => {
	dispatch({
		type: TOGGLE_ALERT,
		resType: 'loading',
		msg: 'Uploading HF Personnel Record'
	})

	var toUpload = [...getState().hfPersonnel.toUpload];
	var toUpload2 = [...getState().hfPersonnel.toUpload];
	var { uploadDetails } = getState().hfPersonnel;
	var { show } = getState().alert;

	toUpload = toUpload.map((record, i) => {
		console.log("::::::::::____________((((((++++");
		console.log(record.Birthdate_);
		console.log((typeof record.Birthdate_ == "string"));
		console.log((record.Birthdate_ && record.Birthdate_ != ""));
		console.log((record.Birthdate_ && record.Birthdate_ != "") 
		? (typeof record.Birthdate_ == "string")
			?new Date(record.Birthdate_)
			:new Date(Math.round((record.Birthdate_ - 25569) * 86400 * 1000)) 
		:null);
		console.log(typeof record.Birthdate_);
		return {
			category: record.Category || "",
			categoryID: record.CategoryID || "",
			categoryIDNumber: ((typeof (record.CategoryIDnumber == "number")) ? (record.CategoryIDnumber + "") : record.CategoryIDnumber) || "",
			philHealthID: ((typeof (record.PhilHealthID == "number")) ? (record.PhilHealthID + "") : record.PhilHealthID) || "",
			pwdID: ((typeof (record.PWD_ID == "number")) ? (record.PWD_ID + "") : record.PWD_ID) || "",
			name: {
				first: record.Firstname || "",
				mid: record.Middlename || "",
				last: record.Lastname || "",
				suffix: record.Suffix || "",
			},
			contactNo: ((typeof (record.Contact_no == "number")) ? (record.Contact_no + "") : record.Contact_no) || "",
			address: {
				fullAddress: record.Full_address || "",
				region: record.Region || "",
				province: record.Province || "",
				munCity: record.MunCity || "",
				barangay: record.Barangay || "",
			},
			sex: record.Sex || "",
			birthdate: (record.Birthdate_ && record.Birthdate_ != "") 
								? (typeof record.Birthdate_ == "string")
									?new Date(record.Birthdate_)
									:new Date(Math.round((record.Birthdate_ - 25569) * 86400 * 1000)) 
								:null,
			status: record.Civilstatus || "",
			employment: {
				employed: record.Employed || "",
				profession: record.Profession || "",
				employerName: record.Employer_name || "",
				employerLGU: record.Employer_LGU || "",
				employerAddress: record.Employer_address || "",
				contactNo: record['Employer_contact_no.'] || "",
			},
			covidDetails: {
				directCovid: record.Direct_covid || "",
				covidHistory: record.covid_history || "",
				covidDate: (record.covid_date && record.covid_date != "") ? new Date(Math.round((record.covid_date - 25569) * 86400 * 1000)) : null,
				classification: record.covid_classification || "",
			},

			allergy: {
				drug: record.Allergy_01 || "",
				food: record.Allergy_02 || "",
				insect: record.Allergy_03 || "",
				latex: record.Allergy_04 || "",
				mold: record.Allergy_05 || "",
				pet: record.Allergy_06 || "",
				pollen: record.Allergy_07 || "",
			},

			comorbidities: {
				with: record.W_comorbidities || "",
				hypertension: record.Comorbidity_01 || "",
				heartDisease: record.Comorbidity_02 || "",
				kidneyDisease: record.Comorbidity_03 || "",
				diabetesMellitus: record.Comorbidity_04 || "",
				bronchialAsthma: record.Comorbidity_05 || "",
				immunodeficiencyStatus: record.Comorbidity_06 || "",
				cancer: record.Comorbidity_07 || "",
				others: record.Comorbidity_08 || "",
			},

			pregStatus: record.Preg_status || "",
			consent: record.Consent || "",

		}
	})


	return new Promise(async (resolve, reject) => {

		for (let x = 0, len = toUpload.length; x < len; x++) {
		// for (let x = 0, len = 1; x < len; x++) {
			if (toUpload[x].name.first != "" && toUpload[x].name.last != "") {
				await axios({
					url: `${SERVER_API}/hf-personnel/new`,
					method: 'POST',
					headers: {
						'content-type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem(JWT)}`
					},
					data: {
						hfPersonnel: {
							...toUpload[x],
							province: uploadDetails.province,
							facility: uploadDetails.facility,
						},
						index: x,
					}
				})
					.then(res => {
						console.log(res.data.index + " ************************************");
						console.log(res);
	
						toUpload2[res.data.index] = {
							...toUpload2[res.data.index],
							_id: res.data.hfPersonnel._id,
							hfPersonnelID: res.data.hfPersonnel.hfPersonnelID,
							uploadStatus: (res.data.status) ? "success" : "error",
						}
	
						if (res.data.hasOwnProperty("duplicate")) {
							console.log("^&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
							toUpload2[res.data.index] = {
								...toUpload2[res.data.index],
								duplicates: [...res.data.duplicate],
								uploadStatus: "duplicate",
							}
						}
						console.log(toUpload2);
	
						dispatch({
							type: SET_HF_PERSONNEL_TO_UPLOAD,
							toUpload: [...toUpload2]
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

				for (let y = 0; y < 100000; y++) {
					
				}

				toUpload2[x] = {
					...toUpload2[x],
					uploadStatus: "error",
				}				
				dispatch({
					type: SET_HF_PERSONNEL_TO_UPLOAD,
					toUpload: [...toUpload2]
				})

			}


		}


		// Check for Missed Record
		for (let x = 0, len = toUpload2.length; x < len; x++) {
			console.log("###################################################");
			if (!toUpload2[x].hasOwnProperty("uploadStatus")) {
				console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
				await axios({
					url: `${SERVER_API}/hf-personnel/new`,
					method: 'POST',
					headers: {
						'content-type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem(JWT)}`
					},
					data: {
						hfPersonnel: {
							...toUpload2[x],
							province: uploadDetails.province,
							facility: uploadDetails.facility,
						},
						index: x,
					}
				})
					.then(res => {
	
						toUpload2[res.data.index] = {
							...toUpload2[res.data.index],
							_id: res.data.hfPersonnel._id,
							hfPersonnelID: res.data.hfPersonnel.hfPersonnelID,
							uploadStatus: (res.data.status) ? "success" : "error",
						}
	
						if (res.data.hasOwnProperty("duplicate")) {
							toUpload2[res.data.index] = {
								...toUpload2[res.data.index],
								duplicates: [...res.data.duplicate],
								uploadStatus: "duplicate",
							}
						}
	
						dispatch({
							type: SET_HF_PERSONNEL_TO_UPLOAD,
							toUpload: [...toUpload2]
						})
	
					})
					.catch(err => {
						console.log("----------------");
						console.log(err);
	
					})			
			}
		}


		resolve(true);
	})
}

export const ResetUpload = () => (dispatch, getState) => {

	dispatch({
		type: RESET_HF_PERSONNEL_UPLOAD,
	})
	dispatch({
		type: RESET_HF_PERSONNEL_UPLOAD_BOOL,
		bool: true,
	})
}

export const setResetUploadBool = (bool) => (dispatch, getState) => {

	dispatch({
		type: RESET_HF_PERSONNEL_UPLOAD_BOOL,
		bool: bool,
	})
}

export const GetCEIRDashboardNumbers = () => (dispatch, getState) => {

	return new Promise(async (resolve, reject) => {
		await axios({
			url: `${SERVER_API}/hf-personnel/get-dashboard-numbers`,
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem(JWT)}`
			},
		})
		.then(res => {
			console.log(":::::>.................");
			console.log(res.data.data);
			var prov = "";
			var provinces = {
				adn: {hw:0, hf: 0},
				ads: {hw:0, hf: 0},
				sdn: {hw:0, hf: 0},
				sds: {hw:0, hf: 0},
				pdi: {hw:0, hf: 0},
				trash: {hw:0, hf: 0},
				total: {hw:0, hf: 0},
			}

			for (let x = 0, len = res.data.data.length; x < len; x++) {
				prov = res.data.data[x]._id.province.split("_").join(" ").toLowerCase();
				console.log(prov);

				provinces.total.hf++;
				provinces.total.hw += res.data.data[x].countAll;

				if (prov.includes("adn")) {
					// if (!provinces.adn.hasOwnProperty(res.data.data[x]._id.facility)) {
					provinces.adn.hf++;
					// }
					provinces.adn[res.data.data[x]._id.facility] = res.data.data[x].countAll; 
					provinces.adn.hw += res.data.data[x].countAll;
				}else if (prov.includes("ads")) {
					provinces.ads.hf++;
					provinces.ads[res.data.data[x]._id.facility] = res.data.data[x].countAll; 
					provinces.ads.hw += res.data.data[x].countAll;
				}else if (prov.includes("sdn")) {
					provinces.sdn.hf++;
					provinces.sdn[res.data.data[x]._id.facility] = res.data.data[x].countAll; 
					provinces.sdn.hw += res.data.data[x].countAll;
				}else if (prov.includes("sds")) {
					provinces.sds.hf++;
					provinces.sds[res.data.data[x]._id.facility] = res.data.data[x].countAll; 
					provinces.sds.hw += res.data.data[x].countAll;
				}else if (prov.includes("pdi")) {
					provinces.pdi.hf++;
					provinces.pdi[res.data.data[x]._id.facility] = res.data.data[x].countAll; 
					provinces.pdi.hw += res.data.data[x].countAll;
				}else {
					provinces.trash.hf++;
					provinces.trash[res.data.data[x]._id.facility] = res.data.data[x].countAll; 
					provinces.trash.hw += res.data.data[x].countAll;
				}
				// console.log(res.data.data[x]._id.prov);
				// console.log(res.data.data[x]._id.facility);
			}

			console.log("||||||||||||||||||+++++++++++++++++++++");
			console.log(provinces);

			dispatch({
				type: SET_CEIR_DASHBOARD_NUMBERS,
				numbers: {...provinces}
			})
		})
		.catch(err => {
			console.log("*****************>>>>>>>>.");
			console.log(err);
		})
	})
}

export const GetCEIRDashboardProfession = (filter) => (dispatch, getState) => {

	return new Promise(async (resolve, reject) => {
		await axios({
			url: `${SERVER_API}/hf-personnel/get-dashboard-classification-numbers/professions`,
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem(JWT)}`
			},
			params: {
				filter: {...filter}
			}
		})
		.then(res => {
			var professions = {
				"01_Dental_Hygienist": 0,
				"02_Dental_Technologist": 0,
				"03_Dentist": 0,
				"04_Medical_Technologist": 0,
				"05_Midwife": 0,
				"06_Nurse": 0,
				"07_Nutritionist_Dietician": 0,
				"08_Occupational_Therapist": 0,
				"09_Optometrist": 0,
				"10_Pharmacist": 0,
				"11_Physical_Therapist": 0,
				"12_Physician": 0,
				"13_Radiologic_Technologist": 0,
				"14_Respiratory_Therapist": 0,
				"15_X_ray_Technologist": 0,
				"16_Barangay_Health_Worker": 0,
				"17_Maintenance_Staff": 0,
				"18_Administrative_Staff": 0,
				"others": 0,
			};
			res.data.data2.map((profession, i) => {
				if (/*profession._id.profession.split("_")[0] == "01" || */profession._id.profession.toLowerCase().includes("dental_hygienist")) {
					professions["01_Dental_Hygienist"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "02" || */profession._id.profession.toLowerCase().includes("dental_technologist")) {
					professions["02_Dental_Technologist"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "03" || */profession._id.profession.toLowerCase().includes("dentist")) {
					professions["03_Dentist"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "04" || */profession._id.profession.toLowerCase().includes("medical_technologist")) {
					professions["04_Medical_Technologist"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "05" || */profession._id.profession.toLowerCase().includes("midwife")) {
					professions["05_Midwife"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "06" || */profession._id.profession.toLowerCase().includes("nurse")) {
					professions["06_Nurse"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "07" || */profession._id.profession.toLowerCase().includes("nutritionist_dietician")) {
					professions["07_Nutritionist_Dietician"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "08" || */profession._id.profession.toLowerCase().includes("occupational_therapist")) {
					professions["08_Occupational_Therapist"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "09" || */profession._id.profession.toLowerCase().includes("optometrist")) {
					professions["09_Optometrist"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "10" || */profession._id.profession.toLowerCase().includes("pharmacist")) {
					professions["10_Pharmacist"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "11" || */profession._id.profession.toLowerCase().includes("physical_therapist")) {
					professions["11_Physical_Therapist"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "12" || */profession._id.profession.toLowerCase().includes("physician")) {
					professions["12_Physician"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "13" || */profession._id.profession.toLowerCase().includes("radiologic_technologist")) {
					professions["13_Radiologic_Technologist"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "14" || */profession._id.profession.toLowerCase().includes("respiratory_therapist")) {
					professions["14_Respiratory_Therapist"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "15" || */profession._id.profession.toLowerCase().includes("x_ray_technologist")) {
					professions["15_X_ray_Technologist"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "16" || */profession._id.profession.toLowerCase().includes("barangay_health_worker") || profession._id.profession.toLowerCase().includes("bhw")) {
					professions["16_Barangay_Health_Worker"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "17" || */profession._id.profession.toLowerCase().includes("maintenance_staff")) {
					professions["17_Maintenance_Staff"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "18" || */profession._id.profession.toLowerCase().includes("administrative_staff")) {
					professions["18_Administrative_Staff"] += profession.countAll;
				} else {
					if (
						profession._id.profession == "BPATS" || profession._id.profession == "SK CHAIRMAN" || profession._id.profession == "PUROK-PRESIDENT" || profession._id.profession == "BARANGAY TANOD" || profession._id.profession == "BRGY. SK CHAIRMAN" || 
						profession._id.profession == "BRGY.TANOD" || profession._id.profession == "PUROK LEADER" || profession._id.profession == "BRGY. TANOD (BHERT)" || profession._id.profession == "KAGAWAD" || profession._id.profession == "BRGY. SECRETARY" || 
						profession._id.profession == "BRGY. CAPTAIN" || profession._id.profession == "BRGY.KGAWAD" || profession._id.profession == "BHERT" || profession._id.profession == "BRGY. TREASURER" || profession._id.profession == "TANOD" ||
						profession._id.profession == "Barangay kagawad" || profession._id.profession == "BRGY. KAGAWAD" || profession._id.profession == "PUNONG BARANGAY" || profession._id.profession == "BARANGAY KAGAWAD" || profession._id.profession == "BRGY.KAGAWAD" ||
						profession._id.profession == "BRGY KAGAWAD" || profession._id.profession == "BARANGAY CAPTAIN" || profession._id.profession == "BRGY. OFFICIAL" || profession._id.profession == "Brgy.Kagawad" || profession._id.profession == "BRGY. RESCUE CHAIRMAN" ||
						profession._id.profession == "BPATS Pres." || profession._id.profession == "PUNONG BRGY" || profession._id.profession == "BARANGAY COUNCIL" || profession._id.profession == "BRGY.TANOD (BHERT)" || profession._id.profession == "BNS" || 
						profession._id.profession.includes("BHERT") || profession._id.profession.includes("BARANGAY") || profession._id.profession.includes("BRGY") || profession._id.profession.includes("TANOD") ||
						profession._id.profession.includes("PUROK") || profession._id.profession.includes("KAGAWAD") || profession._id.profession.includes("SLP PRESIDENT") ||
						profession._id.profession.includes("05_Others_BNS") || profession._id.profession.includes("CAPTAIN") || profession._id.profession.includes("19_Others_BHERTS")
					) {
						professions["19_BHERTS"] += profession.countAll;
					} else {
						console.log(profession._id.profession);
						console.log(profession.categories);
						console.log(profession.countAll);
						console.log("--------------------------------------");
						professions.others += profession.countAll;							
					}
				}
			});

			dispatch({
				type: SET_PROFESSION_CLASSIFICATION,
				professions: {...professions}
			})

		})
		.catch(err => {
			console.log("*****************>>>>>>>>.");
			console.log(err);
		})
	})
}

export const GetCEIRDashboardCategories = (filter) => (dispatch, getState) => {

	return new Promise(async (resolve, reject) => {
		await axios({
			url: `${SERVER_API}/hf-personnel/get-dashboard-classification-numbers/categories`,
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem(JWT)}`
			},
			params: {
				filter: {...filter}
			}
		})
		.then(res => {
			console.log(":::::::::::::::------------------");
			console.log(res);

			var categories = {
				"01_Health_Care_Worker": 0,
				"02_Senior_Citizen": 0,
				"03_Indigent": 0,
				"04_Uniformed_Personnel": 0,
				"05_Essential_Worker": 0,
				"06_Other": 0,
				"Unset": 0,
			};

			res.data.data.map((category, i) => {
				if (category._id.category.split("_")[0] == "01" || category._id.category.toLowerCase().includes("health_care_worker")) {
					categories["01_Health_Care_Worker"] += category.countAll;
				} else if (category._id.category.split("_")[0] == "02" || category._id.category.toLowerCase().includes("senior_citizen")) {
					categories["02_Senior_Citizen"] += category.countAll;
				} else if (category._id.category.split("_")[0] == "03" || category._id.category.toLowerCase().includes("indigent")) {
					categories["03_Indigent"] += category.countAll;
				} else if (category._id.category.split("_")[0] == "04" || category._id.category.toLowerCase().includes("uniformed_personnel")) {
					categories["04_Uniformed_Personnel"] += category.countAll;
				} else if (category._id.category.split("_")[0] == "05" || category._id.category.toLowerCase().includes("essential_worker")) {
					categories["05_Essential_Worker"] += category.countAll;
				} else if (category._id.category.split("_")[0] == "06" || category._id.category.toLowerCase().includes("other")) {
					categories["06_Other"] += category.countAll;
				} else if (category._id.category == "") {
					categories["Unset"] += category.countAll;					
				}
			})

			dispatch({
				type: SET_CATEGORY_CLASSIFICATION,
				categories: {...categories}
			})

		})
		.catch(err => {
			console.log("*****************>>>>>>>>.");
			console.log(err);
		})
	})
}

export const GetCEIRDashboardClassificationNumbers = () => (dispatch, getState) => {

	return new Promise(async (resolve, reject) => {
		await axios({
			url: `${SERVER_API}/hf-personnel/get-dashboard-classification-numbers`,
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem(JWT)}`
			},
		})
		.then(res => {
			console.log(":::::::::::::::===================");
			console.log(res);
			var professions = {
				"01_Dental_Hygienist": 0,
				"02_Dental_Technologist": 0,
				"03_Dentist": 0,
				"04_Medical_Technologist": 0,
				"05_Midwife": 0,
				"06_Nurse": 0,
				"07_Nutritionist_Dietician": 0,
				"08_Occupational_Therapist": 0,
				"09_Optometrist": 0,
				"10_Pharmacist": 0,
				"11_Physical_Therapist": 0,
				"12_Physician": 0,
				"13_Radiologic_Technologist": 0,
				"14_Respiratory_Therapist": 0,
				"15_X_ray_Technologist": 0,
				"16_Barangay_Health_Worker": 0,
				"17_Maintenance_Staff": 0,
				"18_Administrative_Staff": 0,
				"19_BHERTS": 0,
				"others": 0,
			};
			console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
			res.data.data2.map((profession, i) => {
				if (/*profession._id.profession.split("_")[0] == "01" || */profession._id.profession.toLowerCase().includes("dental_hygienist")) {
					professions["01_Dental_Hygienist"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "02" || */profession._id.profession.toLowerCase().includes("dental_technologist")) {
					professions["02_Dental_Technologist"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "03" || */profession._id.profession.toLowerCase().includes("dentist")) {
					professions["03_Dentist"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "04" || */profession._id.profession.toLowerCase().includes("medical_technologist")) {
					professions["04_Medical_Technologist"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "05" || */profession._id.profession.toLowerCase().includes("midwife")) {
					professions["05_Midwife"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "06" || */profession._id.profession.toLowerCase().includes("nurse")) {
					professions["06_Nurse"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "07" || */profession._id.profession.toLowerCase().includes("nutritionist_dietician")) {
					professions["07_Nutritionist_Dietician"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "08" || */profession._id.profession.toLowerCase().includes("occupational_therapist")) {
					professions["08_Occupational_Therapist"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "09" || */profession._id.profession.toLowerCase().includes("optometrist")) {
					professions["09_Optometrist"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "10" || */profession._id.profession.toLowerCase().includes("pharmacist")) {
					professions["10_Pharmacist"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "11" || */profession._id.profession.toLowerCase().includes("physical_therapist")) {
					professions["11_Physical_Therapist"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "12" || */profession._id.profession.toLowerCase().includes("physician")) {
					professions["12_Physician"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "13" || */profession._id.profession.toLowerCase().includes("radiologic_technologist")) {
					professions["13_Radiologic_Technologist"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "14" || */profession._id.profession.toLowerCase().includes("respiratory_therapist")) {
					professions["14_Respiratory_Therapist"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "15" || */profession._id.profession.toLowerCase().includes("x_ray_technologist")) {
					professions["15_X_ray_Technologist"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "16" || */profession._id.profession.toLowerCase().includes("barangay_health_worker") || profession._id.profession.toLowerCase().includes("bhw")) {
					professions["16_Barangay_Health_Worker"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "17" || */profession._id.profession.toLowerCase().includes("maintenance_staff")) {
					professions["17_Maintenance_Staff"] += profession.countAll;
				} else if (/*profession._id.profession.split("_")[0] == "18" || */profession._id.profession.toLowerCase().includes("administrative_staff")) {
					professions["18_Administrative_Staff"] += profession.countAll;
				} else {
					if (
						profession._id.profession == "BPATS" || profession._id.profession == "SK CHAIRMAN" || profession._id.profession == "PUROK-PRESIDENT" || profession._id.profession == "BARANGAY TANOD" || profession._id.profession == "BRGY. SK CHAIRMAN" || 
						profession._id.profession == "BRGY.TANOD" || profession._id.profession == "PUROK LEADER" || profession._id.profession == "BRGY. TANOD (BHERT)" || profession._id.profession == "KAGAWAD" || profession._id.profession == "BRGY. SECRETARY" || 
						profession._id.profession == "BRGY. CAPTAIN" || profession._id.profession == "BRGY.KGAWAD" || profession._id.profession == "BHERT" || profession._id.profession == "BRGY. TREASURER" || profession._id.profession == "TANOD" ||
						profession._id.profession == "Barangay kagawad" || profession._id.profession == "BRGY. KAGAWAD" || profession._id.profession == "PUNONG BARANGAY" || profession._id.profession == "BARANGAY KAGAWAD" || profession._id.profession == "BRGY.KAGAWAD" ||
						profession._id.profession == "BRGY KAGAWAD" || profession._id.profession == "BARANGAY CAPTAIN" || profession._id.profession == "BRGY. OFFICIAL" || profession._id.profession == "Brgy.Kagawad" || profession._id.profession == "BRGY. RESCUE CHAIRMAN" ||
						profession._id.profession == "BPATS Pres." || profession._id.profession == "PUNONG BRGY" || profession._id.profession == "BARANGAY COUNCIL" || profession._id.profession == "BRGY.TANOD (BHERT)" || profession._id.profession == "BNS" || 
						profession._id.profession.includes("BHERT") || profession._id.profession.includes("BARANGAY") || profession._id.profession.includes("BRGY") || profession._id.profession.includes("TANOD") ||
						profession._id.profession.includes("PUROK") || profession._id.profession.includes("KAGAWAD") || profession._id.profession.includes("SLP PRESIDENT") ||
						profession._id.profession.includes("05_Others_BNS") || profession._id.profession.includes("CAPTAIN") || profession._id.profession.includes("19_Others_BHERTS")
					) {
						professions["19_BHERTS"] += profession.countAll;
					} else {
						console.log(profession._id.profession);
						console.log(profession.categories);
						console.log(profession.countAll);
						console.log("--------------------------------------");
						professions.others += profession.countAll;							
					}
				}
			})

			var categories = {
				"01_Health_Care_Worker": 0,
				"02_Senior_Citizen": 0,
				"03_Indigent": 0,
				"04_Uniformed_Personnel": 0,
				"05_Essential_Worker": 0,
				"06_Other": 0,
				"Unset": 0,
			};

			res.data.data.map((category, i) => {
				if (category._id.category.split("_")[0] == "01" || category._id.category.toLowerCase().includes("health_care_worker")) {
					categories["01_Health_Care_Worker"] += category.countAll;
				} else if (category._id.category.split("_")[0] == "02" || category._id.category.toLowerCase().includes("senior_citizen")) {
					categories["02_Senior_Citizen"] += category.countAll;
				} else if (category._id.category.split("_")[0] == "03" || category._id.category.toLowerCase().includes("indigent")) {
					categories["03_Indigent"] += category.countAll;
				} else if (category._id.category.split("_")[0] == "04" || category._id.category.toLowerCase().includes("uniformed_personnel")) {
					categories["04_Uniformed_Personnel"] += category.countAll;
				} else if (category._id.category.split("_")[0] == "05" || category._id.category.toLowerCase().includes("essential_worker")) {
					categories["05_Essential_Worker"] += category.countAll;
				} else if (category._id.category.split("_")[0] == "06" || category._id.category.toLowerCase().includes("other")) {
					categories["06_Other"] += category.countAll;
				} else if (category._id.category == "") {
					categories["Unset"] += category.countAll;					
				}
			})


			// console.log(professions);
			// console.log(Object.keys(professions));

			// console.log(categories);
			// console.log(Object.keys(categories));
			
			dispatch({
				type: SET_PROFESSION_CLASSIFICATION,
				professions: {...professions}
			})
			dispatch({
				type: SET_CATEGORY_CLASSIFICATION,
				categories: {...categories}
			})

		})
		.catch(err => {
			console.log("*****************>>>>>>>>.");
			console.log(err);
		})
	})
}

export const deleteHfPersonnel = () => (dispatch, getState) => {
	dispatch({
		type: TOGGLE_ALERT,
		resType: 'loading',
		msg: 'Deleting HF Personnel Record'
	})

	var toUpload = [...getState().hfPersonnel.toUpload];
	var toUpload2 = [...getState().hfPersonnel.toUpload];
	var { uploadDetails } = getState().hfPersonnel;

	toUpload = toUpload.map((record, i) => {
		return {
			category: record.Category || "",
			categoryID: record.CategoryID || "",
			categoryIDNumber: ((typeof (record.CategoryIDnumber == "number")) ? (record.CategoryIDnumber + "") : record.CategoryIDnumber) || "",
			philHealthID: ((typeof (record.PhilHealthID == "number")) ? (record.PhilHealthID + "") : record.PhilHealthID) || "",
			pwdID: ((typeof (record.PWD_ID == "number")) ? (record.PWD_ID + "") : record.PWD_ID) || "",
			name: {
				first: record.Firstname || "",
				mid: record.Middlename || "",
				last: record.Lastname || "",
				suffix: record.Suffix || "",
			},
			contactNo: ((typeof (record.Contact_no == "number")) ? (record.Contact_no + "") : record.Contact_no) || "",
			address: {
				fullAddress: record.Full_address || "",
				region: record.Region || "",
				province: record.Province || "",
				munCity: record.MunCity || "",
				barangay: record.Barangay || "",
			},
			sex: record.Sex || "",
			birthdate: (record.Birthdate_ && record.Birthdate_ != "") ? new Date(Math.round((record.Birthdate_ - 25569) * 86400 * 1000)) : null,
			status: record.Civilstatus || "",
			employment: {
				employed: record.Employed || "",
				profession: record.Profession || "",
				employerName: record.Employer_name || "",
				employerLGU: record.Employer_LGU || "",
				employerAddress: record.Employer_address || "",
				contactNo: record['Employer_contact_no.'] || "",
			},
			covidDetails: {
				directCovid: record.Direct_covid || "",
				covidHistory: record.covid_history || "",
				covidDate: (record.covid_date && record.covid_date != "") ? new Date(Math.round((record.covid_date - 25569) * 86400 * 1000)) : null,
				classification: record.covid_classification || "",
			},

			allergy: {
				drug: record.Allergy_01 || "",
				food: record.Allergy_02 || "",
				insect: record.Allergy_03 || "",
				latex: record.Allergy_04 || "",
				mold: record.Allergy_05 || "",
				pet: record.Allergy_06 || "",
				pollen: record.Allergy_07 || "",
			},

			comorbidities: {
				with: record.W_comorbidities || "",
				hypertension: record.Comorbidity_01 || "",
				heartDisease: record.Comorbidity_02 || "",
				kidneyDisease: record.Comorbidity_03 || "",
				diabetesMellitus: record.Comorbidity_04 || "",
				bronchialAsthma: record.Comorbidity_05 || "",
				immunodeficiencyStatus: record.Comorbidity_06 || "",
				cancer: record.Comorbidity_07 || "",
				others: record.Comorbidity_08 || "",
			},

			pregStatus: record.Preg_status || "",
			consent: record.Consent || "",

		}
	})


	return new Promise(async (resolve, reject) => {

		for (let x = 0, len = toUpload.length; x < len; x++) {
		// for (let x = 0, len = 1; x < len; x++) {
			if (toUpload[x].name.first != "" && toUpload[x].name.last != "") {
				await axios({
					url: `${SERVER_API}/hf-personnel/delete`,
					method: 'POST',
					headers: {
						'content-type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem(JWT)}`
					},
					data: {
						hfPersonnel: {
							...toUpload[x],
							province: uploadDetails.province,
							facility: uploadDetails.facility,
						},
						index: x,
					}
				})
					.then(res => {
						console.log(res.data.index + " ************************************");
						console.log(res);
	
						toUpload2[res.data.index] = {
							...toUpload2[res.data.index],
							_id: res.data.hfPersonnel._id,
							uploadStatus: (res.data.status) ? "success" : "error",
						}
	
						if (res.data.hasOwnProperty("duplicate")) {
							console.log("^&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
							toUpload2[res.data.index] = {
								...toUpload2[res.data.index],
								uploadStatus: "duplicate",
							}
						}
						console.log(toUpload2);
	
						// toUpload2 = toUpload2.map((record, i) => {
						//   return {
						//     ...record,
						//     uploadStatus: res.data.result[i].success?"success":"error"
						//   }
						// })
	
						// console.log("||||||||||||||||||||==============");
						// console.log([...toUpload2]);
						dispatch({
							type: SET_HF_PERSONNEL_TO_UPLOAD,
							toUpload: [...toUpload2]
						})
	
						// dispatch({
						//   type: CHANGE_ALERT,
						//   resType: 'success',
						//   msg: 'HF Personnel Records Successfully Uploaded'
						// })
	
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

				for (let y = 0; y < 100000; y++) {
					
				}

				toUpload2[x] = {
					...toUpload2[x],
					uploadStatus: "error",
				}				
				dispatch({
					type: SET_HF_PERSONNEL_TO_UPLOAD,
					toUpload: [...toUpload2]
				})

			}


		}

		resolve(true);
	})
}

export const ArrangeFHPersonnelMultiple = (records) => (dispatch, getState) => {

	console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	console.log();

	var recordsList = [...getState().hfPersonnel.toUpload]

	dispatch({
		type: SET_HF_PERSONNEL_TO_UPLOAD,
		toUpload: [...recordsList, ...records]
	})
}


export const EmptyFacilityData = () => async (dispatch, getState) => {

}