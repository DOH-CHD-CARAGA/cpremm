import {
  TOGGLE_ALERT,
  CHANGE_ALERT,
  SET_RECORD_DETAIL_NEW,
  SET_RECORD_DEFAULT_NEW,
  SET_RECORDS_NEW,
  SET_USER_RECORD_ENTRY_NEW,
  SET_DASHBOARD_GRAPHS_DATA,
  SET_RECORD_SUBMITTED_NEW,

  SET_SELECTED_RECORD_NEW,
  SET_RECORD_NEW_TO_DISPLAY,
  SET_RECORD_NEW_TO_PRINT_QR,
} from './types';
import { SERVER_API, JWT } from '../config';
import axios from 'axios';
import { ArrangeDate, GetSafe } from './helpers/displayAction';

export const SetRecordNewToPrintQR = (list) => (dispatch, getState) => {

  dispatch({
    type: SET_RECORD_NEW_TO_PRINT_QR,
    toPrintQR: [...list]
  })
}

export const UpdateSelected = (record, type = "+") => (dispatch, getState) => {

  var selected = [...getState().recordNew.selected];
  const { toDisplay } = getState().recordNew;

  const recordFound = selected.filter((d) => d._id == record._id);
  const toDisplayList = toDisplay.filter((d) => d._id != record._id);
  const remaining = selected.filter((d) => d._id != record._id);

  if (type == "+") {
    dispatch({
      type: SET_RECORD_NEW_TO_DISPLAY,
      toDisplay: [...toDisplayList]
    })

    if (recordFound.length == 0) {
      dispatch({
        type: SET_SELECTED_RECORD_NEW,
        selected: [...selected, { ...record }]
      })
    }
  } else if (type == "-") {
    dispatch({
      type: SET_SELECTED_RECORD_NEW,
      selected: [...remaining]
    })

    dispatch({
      type: SET_RECORD_NEW_TO_DISPLAY,
      toDisplay: [...toDisplay, { ...record }]
    })
  }
}

export const SetSelectedDevice = (data, type) => (dispatch, getState) => {

  const { record } = getState().recordNew;
  // const record = toDisplay.filter((record, i) => i == id);

  console.log({
    ...record,
    devices: {
      ...record.devices,
      [type]: record,
    }
  });

  dispatch({
    type: SET_RECORD_DETAIL_NEW,
    detail: {
      detail: {
        ...record,
        devices: {
          ...record.devices,
          [type]: data,
        }
      }
    }
  })
}

export const UpdateOtherDevices = (action, data, ind) => (dispatch, getState) => {

  const { record } = getState().recordNew;


  var newOtherDevices = [];

  if (action == "+") {
    newOtherDevices = [
      ...record.otherDevices,
      { ...data },
    ]
  } else if (action == "-") {
    console.log("::::::::::::::::>>><<");
    console.log(ind);
    newOtherDevices = record.otherDevices.filter((otherDevice, i) => i != ind);
    console.log(newOtherDevices);
  }

  dispatch({
    type: SET_RECORD_DETAIL_NEW,
    detail: {
      detail: {
        ...record,
        otherDevices: [...newOtherDevices]
      }
    }
  })
}

export const SetRecordDetail = (id) => (dispatch, getState) => {

  const { toDisplay } = getState().recordNew;
  console.log(toDisplay);
  const record = toDisplay.filter((record, i) => record._id == id);
  // const record = toDisplay.filter((record, i) => i == id);


  dispatch({
    type: SET_RECORD_DETAIL_NEW,
    detail: {
      detail: { ...record[0] }
    }
  })
}

export const SetRecordDefault = () => (dispatch) => {
  dispatch({
    type: SET_RECORD_DEFAULT_NEW,
  })
}
export const addRecord = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: "loading",
    msg: "Adding Record"
  })
  // const { record, gCount } = getState().recordNew;
  // const records = [...getState().recordNew.records];

  // return new Promise((resolve, reject) => {
  //   axios({
  //     url: `${SERVER_API}/record/new`,
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //       Authorization: `Bearer ${localStorage.getItem(JWT)}`
  //     },
  //     data: {
  //       record: {...record}
  //     }
  //   })
  //   .then((res) =>{

  //     if (gCount > 10){
  //       records.pop();
  //       records.unshift({...res.data.record});
  //     }

  //     dispatch({
  //       type: SET_RECORDS_NEW,
  //       data: {
  //         records: [...records],
  //         count: gCount + 1,
  //       }
  //     })


  //     dispatch({
  //       type: CHANGE_ALERT,
  //       resType: "success",
  //       msg: "Record Successfully Added"
  //     })


  //   })
  //   .catch(err => {
  //     reject(err);
  //   })
  // })
}

export const updateRecord = () => (dispatch, getState) => {

  dispatch({
    type: TOGGLE_ALERT,
    resType: "loading",
    msg: "Updating Record"
  })

  // const { record, gCount } = getState().recordNew;
  // const records = [...getState().recordNew.records];


  // return new Promise((resolve, reject) => {
  //   axios({
  //     url: `${SERVER_API}/record/update`,
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //       Authorization: `Bearer ${localStorage.getItem(JWT)}`
  //     },
  //     data: {
  //       record: {...record}
  //     }
  //   })
  //   .then((res) =>{
  //     if (res.status){

  //       records.map((r) => {
  //         if (record._id == r._id) {
  //           r.name = record.name;
  //           r.routes = record.routes;
  //         }
  //         return r;
  //       });

  //       dispatch({
  //         type: SET_RECORDS_NEW,
  //         data: {
  //           records: [...records],
  //           count: gCount,
  //         }
  //       })

  //       dispatch({
  //         type: CHANGE_ALERT,
  //         resType: "success",
  //         msg: "Record Successfully Updated"
  //       })

  //     }else {

  //       dispatch({
  //         type: CHANGE_ALERT,
  //         resType: "failed",
  //         msg: "Failed to Updated Record"
  //       })

  //     }



  //   })
  //   .catch(err => {
  //     reject(err);
  //   })
  // })
}


export const SetUserRecordEntry = (data, key) => (dispatch) => {
  dispatch({
    type: SET_USER_RECORD_ENTRY_NEW,
    data: data,
    key: key.split("."),
  })
}

export const toggleSubmitted = () => (dispatch) => {
  dispatch({
    type: SET_RECORD_SUBMITTED_NEW,
    submitted: false,
  })
}

export const UpdateRecordActions = (type = "+", ind) => (dispatch, getState) => {

  const { recordNew } = getState();
  const { recordDefault } = recordNew;
  console.log("++++++++++++++++++:::");
  console.log(recordDefault);
  console.log(recordNew);
  const currRecord = recordNew.record;
  var temp = {};

  if (type == "+") {
    temp = {
      ...currRecord,
      actions: [
        ...currRecord.actions,
        { ...recordDefault.actions[0] }
      ]
    }
  } else if (type == "-") {

    temp = {
      ...currRecord,
      actions: [
        ...currRecord.actions.filter((action, i) => i != ind)
      ]
    }
  }

  dispatch({
    type: SET_RECORD_DETAIL_NEW,
    detail: {
      detail: temp
    },
  })

}


export const SubmitRecord = (data, key) => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: "loading",
    msg: "Submitting Record"
  })

  const { recordNew } = getState();
  var { records, record, gCount, toDisplay } = recordNew;

  var tempText = {
    division: record.office.division,
    section: record.office.section,
    userCO: (record.endUser.hasOwnProperty("userCO")) ? (record.endUser.userCO.name.first + " " + record.endUser.userCO.name.last) : record.text.userCO,
    userPAR: (record.endUser.hasOwnProperty("userPAR")) ? (record.endUser.userPAR.name.first + " " + record.endUser.userPAR.name.last) : record.text.userPAR,
  }

  var newRecord = {
    _id: record._id || null,
    recordID: record.recordID,
    prevRecordId: record.prevRecordId,
    userPAR: GetSafe(() => { return record.endUser.userPAR._id })(),
    userCO: GetSafe(() => { return record.endUser.userCO._id })(),
    office: GetSafe(() => { return record.office._id })(),
    text: { ...tempText },

    devices: {
      desktop: record.devices.desktop,
      printer: record.devices.printer,
      scanner: record.devices.scanner,
      monitor: record.devices.monitor,
      avr: record.devices.avr,
      ups: record.devices.ups,
    },

    otherDevices: [...record.otherDevices.map((device, i) => { return { device: device._id } })],

    actions: [...record.actions],
  }

  console.log("()()()()()()()()()()()()()()()()()()()()()");
  console.log(newRecord);

  return new Promise((resolve, reject) => {
    axios({
      url: `${SERVER_API}/record2/submit`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        record: { ...newRecord }
      }
    })
      .then((res) => {
        console.log("____________________________________SUBMIT RETURN");
        console.log(res);
        if (record._id == null) {
          // if (gCount > 10){
          // records.pop();
          records.unshift({
            ...recordNew.record,
            _id: res.data.record._id,
          });
          // }  
        } else {
          records = toDisplay.map((rec, i) => {
            if (record._id == rec._id) {
              return { ...record }
            } else {
              return rec;
            }
          })
        }

        dispatch({
          type: SET_RECORDS_NEW,
          data: {
            records: [...records],
            count: gCount + 1,
          },
          submitted: true,
        });


        dispatch({
          type: CHANGE_ALERT,
          resType: "success",
          msg: "Record Successfully Added"
        });


      })
      .catch(err => {
        reject(err);
      })
  })

}

export const deleteRecord = (data, key) => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: "loading",
    msg: "Deleting Record"
  })

  const { recordNew } = getState();
  var { records, record, gCount } = recordNew;

  return new Promise((resolve, reject) => {
    axios({
      url: `${SERVER_API}/record2/delete`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        recordID: record._id
      }
    })
      .then((res) => {

        if (res.data.success) {
          dispatch({
            type: SET_RECORDS_NEW,
            data: {
              records: [...records.filter((r, i) => r._id != record._id)],
              count: gCount - 1,
            },
          })

          dispatch({
            type: CHANGE_ALERT,
            resType: "success",
            msg: "Record Deleted Successfully"
          })

          resolve(true);

        } else {
          dispatch({
            type: CHANGE_ALERT,
            resType: "failed",
            msg: "Deleting Record Failed"
          })

          resolve(false);
        }

      })
      .catch(err => {
        reject(err);
      })
  })

  // ...currRecord.actions.filter((action, i) => i != ind)
}

