import {
	TOGGLE_ALERT,
	CHANGE_ALERT,
	SET_DOH_CHD_PERSONNELS,
	SET_SEARCHED_DOH_CHD_PERSONNELS,
	SET_DOH_CHD_PERSONNEL_DEFAULT,
	SET_DOH_CHD_PERSONNEL_DETAIL,
	SET_DOH_CHD_SEARCHED_PERSONNELS,
	ADD_NEW_DOH_CHD_PERSONNEL,
	SET_DOH_CHD_PERSONNEL_VALUE,
} from './types';


import { SERVER_API, JWT } from '../config';
import axios from 'axios';

export const SetDOHCHDPersonnelDetail = (id) => (dispatch, getState) => {
	const { toDisplay } = getState().hfPersonnel;
	const hfPersonnel = toDisplay.filter((hfPersonnel) => hfPersonnel._id == id);

	dispatch({
		type: SET_DOH_CHD_PERSONNEL_DETAIL,
		detail: {
			hfPersonnel: [...hfPersonnel]
		}
	})

}

export const SetDOHCHDPersonnelDefault = () => (dispatch) => {
	dispatch({
		type: SET_DOH_CHD_PERSONNEL_DEFAULT,
	})
}

export const addDOHCHDPersonnel = () => (dispatch, getState) => {
	// dispatch({
	// 	type: TOGGLE_ALERT,
	// 	resType: 'loading',
	// 	msg: 'Adding HF Personnel'
	// })

	// const { hfPersonnel, hfPersonnels, gCount } = getState().hfPersonnel;

	// return new Promise((resolve, reject) => {

	// 	axios({
	// 		url: `${SERVER_API}/hf-personnel/new`,
	// 		method: 'POST',
	// 		headers: {
	// 			'content-type': 'application/json',
	// 			Authorization: `Bearer ${localStorage.getItem(JWT)}`
	// 		},
	// 		data: {
	// 			hfPersonnel: { ...hfPersonnel }
	// 		}
	// 	})
	// 		.then((res) => {
	// 			if (res.data.status) {
	// 				hfPersonnels.unshift({ ...res.data.hfPersonnel });
	// 				if (gCount > 10) {
	// 					hfPersonnels.pop();
	// 				}
	// 				dispatch({
	// 					type: SET_HF_PERSONNELS,
	// 					data: {
	// 						hfPersonnels: [...hfPersonnels],
	// 						count: gCount + 1,
	// 					}
	// 				})
	// 				dispatch({
	// 					type: CHANGE_ALERT,
	// 					resType: 'success',
	// 					msg: 'HF Personnel Successfully Added'
	// 				})
	// 			} else {
	// 				dispatch({
	// 					type: CHANGE_ALERT,
	// 					resType: 'failed',
	// 					msg: 'Failed to Updated HF Personnel'
	// 				})
	// 			}
	// 		})
	// 		.catch(err => {
	// 			reject(err);
	// 		})

	// })
}

export const updateDOHCHDPersonnel = () => (dispatch, getState) => {
	// dispatch({
	// 	type: TOGGLE_ALERT,
	// 	resType: 'loading',
	// 	msg: 'Updating HF Personnel'
	// })

	// const { hfPersonnel, gCount } = getState().hfPersonnel;
	// const toDisplay = [...getState().hfPersonnel.toDisplay];

	// return new Promise((resolve, reject) => {

	// 	axios({
	// 		url: `${SERVER_API}/hf-personnel/update`,
	// 		method: 'POST',
	// 		headers: {
	// 			'content-type': 'application/json',
	// 			Authorization: `Bearer ${localStorage.getItem(JWT)}`
	// 		},
	// 		data: {
	// 			hfPersonnel: { ...hfPersonnel }
	// 		}
	// 	})
	// 		.then((res) => {

	// 			if (res.data.status) {
	// 				toDisplay.map((r) => {
	// 					if (hfPersonnel._id == r._id) {
	// 						r = { ...hfPersonnel };
	// 					}
	// 					return r;
	// 				});

	// 				dispatch({
	// 					type: SET_HF_PERSONNELS,
	// 					data: {
	// 						hfPersonnels: [...toDisplay],
	// 						count: gCount,
	// 					}
	// 				})
	// 				dispatch({
	// 					type: CHANGE_ALERT,
	// 					resType: 'success',
	// 					msg: 'HF Personnel Successfully Updated'
	// 				})
	// 			} else {
	// 				dispatch({
	// 					type: CHANGE_ALERT,
	// 					resType: 'failed',
	// 					msg: 'Failed to Updated HF Personnel'
	// 				})
	// 			}
	// 		})
	// 		.catch(err => {
	// 			reject(err);
	// 		})
	// })
}