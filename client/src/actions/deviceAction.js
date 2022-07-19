import {
  TOGGLE_ALERT,
  CHANGE_ALERT,
  SET_DEVICE_DETAIL,
  SET_DEVICE_DEFAULT,
  SET_DEVICES,
  SET_OFFICES_DEVICES_RECORDS_DASHBOARD,
  SET_SELECTED_DEVICE,
  SET_DEVICE_TO_DISPLAY,
  SET_DEVICE_TO_PRINT_QR,
} from './types';
import { SERVER_API, JWT } from '../config';
import axios from 'axios';

import {
  GetDate
} from './helpers/dateAction';

export const SetDeviceDetail = (id) => (dispatch, getState) => {

  const { toDisplay } = getState().device;

  const device = toDisplay.filter((device) => device._id == id);

  dispatch({
    type: SET_DEVICE_DETAIL,
    detail: {
      device: [...device]
    }
  })
}

export const SetDeviceToPrintQR = (list) => (dispatch, getState) => {

  dispatch({
    type: SET_DEVICE_TO_PRINT_QR,
    toPrintQR: [...list]
  })  
}

export const UpdateSelected = (device, type="+") => (dispatch, getState) => {

  var selected = [...getState().device.selected];
  const { toDisplay } = getState().device;

  const deviceFound   = selected.filter((d) => d._id == device._id);
  const toDisplayList = toDisplay.filter((d) => d._id != device._id);
  const remaining     = selected.filter((d) => d._id != device._id);

  if (type=="+") {
    dispatch({
      type: SET_DEVICE_TO_DISPLAY,
      toDisplay: [...toDisplayList]
    })  
  
    if (deviceFound.length == 0) {
      dispatch({
        type: SET_SELECTED_DEVICE,
        selected: [...selected, {...device}]
      })
    }
  } else if (type=="-") {
    dispatch({
      type: SET_SELECTED_DEVICE,
      selected: [...remaining]
    })

    dispatch({
      type: SET_DEVICE_TO_DISPLAY,
      toDisplay: [...toDisplay, {...device}]
    })  
  }




}

export const SetUserDeviceEntry = (data, type) => (dispatch, getState) => {

  const { device } = getState().device;
  dispatch({
    type: SET_DEVICE_DETAIL,
    detail: {
      device: [{
        ...device,
        [type]: { ...data }
      }]
    }
  })
}

export const SetDeviceDefault = () => (dispatch) => {
  dispatch({
    type: SET_DEVICE_DEFAULT,
  })
}
export const SubmitDevice = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: "loading",
    msg: "Adding Device"
  })
  const { device, gCount, toDisplay } = getState().device;
  var devices = [...getState().device.devices];
  var toSend = {
    ...device,
    office: (device.hasOwnProperty("office") && device.office.hasOwnProperty("_id")) ? device.office._id : null,
    userCO: (device.hasOwnProperty("userCO") && device.userCO.hasOwnProperty("_id")) ? device.userCO._id : null,
    userPAR: (device.hasOwnProperty("userPAR") && device.userPAR.hasOwnProperty("_id")) ? device.userPAR._id : null,
    text: {
      division: (device.hasOwnProperty("office") && device.office.hasOwnProperty("division")) ? device.office.division : device.text.division,
      section: (device.hasOwnProperty("office") && device.office.hasOwnProperty("section")) ? device.office.section : device.text.section,
      userCO: (device.hasOwnProperty("userCO") && device.userCO.hasOwnProperty("name")) ? (device.userCO.name.first + " " + device.userCO.name.mid + " " + device.userCO.name.last) : device.text.userCO,
      userPAR: (device.hasOwnProperty("userPAR") && device.userPAR.hasOwnProperty("name")) ? (device.userPAR.name.first + " " + device.userPAR.name.mid + " " + device.userPAR.name.last) : device.text.userPAR,
    }
  };

  if (device.type != "laptop" && device.type != "desktop") {
    delete toSend.specs;
  }


  return new Promise((resolve, reject) => {
    axios({
      url: `${SERVER_API}/device/submit`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        device: { ...toSend }
      }
    })
      .then((res) => {

        if (device._id == null) {
          if (gCount > 10) {
            devices.pop();
            devices.unshift({
              ...device,
              _id: res.data.device._id
            });
          }
        } else {
          devices = toDisplay.map((dev, i) => {
            if (device._id == dev._id) {
              return { ...device }
            } else {
              return dev;
            }
          })
        }

        dispatch({
          type: SET_DEVICES,
          data: {
            devices: [...devices],
            count: gCount + 1,
          }
        })


        dispatch({
          type: CHANGE_ALERT,
          resType: "success",
          msg: "Device Detail Saved Successfully"
        })


      })
      .catch(err => {
        reject(err);
      })
  })
}

export const updateDevice = () => (dispatch, getState) => {

  dispatch({
    type: TOGGLE_ALERT,
    resType: "loading",
    msg: "Updating Device"
  })

  // const { device, gCount } = getState().device;
  // const devices = [...getState().device.devices];


  // return new Promise((resolve, reject) => {
  //   axios({
  //     url: `${SERVER_API}/device/update`,
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //       Authorization: `Bearer ${localStorage.getItem(JWT)}`
  //     },
  //     data: {
  //       device: {...device}
  //     }
  //   })
  //   .then((res) =>{
  //     if (res.status){

  //       devices.map((r) => {
  //         if (device._id == r._id) {
  //           r.name = device.name;
  //           r.routes = device.routes;
  //         }
  //         return r;
  //       });

  //       dispatch({
  //         type: SET_DEVICES,
  //         data: {
  //           devices: [...devices],
  //           count: gCount,
  //         }
  //       })

  //       dispatch({
  //         type: CHANGE_ALERT,
  //         resType: "success",
  //         msg: "Device Successfully Updated"
  //       })

  //     }else {

  //       dispatch({
  //         type: CHANGE_ALERT,
  //         resType: "failed",
  //         msg: "Failed to Updated Device"
  //       })

  //     }



  //   })
  //   .catch(err => {
  //     reject(err);
  //   })
  // })
}


export const ArrangeDevices = (data) => (dispatch, getState) => {

  var arrange = [];

  for (let x = 0; x < data.length; x++) {
    if (data[x].type == "desktop") {

      // ADD System Unit
      arrange.push({
        type: "desktop",
        status: 1, //1 ACTIVE, 0 INACTIVE
        propertyCode: data[x].Property_No,
        serial: data[x].Serial_No.split(",")[1],
        dateAcquired: data[x].Received_Date,
        brand: "",
        model: "",
        remarks: data[x].Remarks,
        donated: "",
        cost: "",
        size: "",

        userPAR: null,
        userCO: null,
        office: null,
        text: {
          userPAR: data[x].Received_By,
          userCO: "",
          division: "",
          section: "",
        },

        specs: {
          mac: "",
          ip: "",

          hWare: {
            cpu: "",
            motherBoard: "",
            processor: "",
            memoryCard: "",
            hdd: "",
          },
          sWare: {
            os: {
              name: "",
              isLicensed: false,
            },
            msOffice: {
              name: "",
              isLicensed: false,
            },
            antiVirus: {
              name: "",
              isLicensed: false,
            },
            dateChecked: {
              os: "",
              office: "",
              antivirus: "",
            },
          }
        },
      });

      // ADD Monitor
      arrange.push({
        type: "monitor",
        status: 1, //1 ACTIVE, 0 INACTIVE
        propertyCode: data[x].Property_No,
        serial: data[x].Serial_No.split(",")[0],
        dateAcquired: data[x].Received_Date,
        brand: "",
        model: "",
        remarks: data[x].Remarks,
        donated: "",
        cost: "",
        size: "",

        userPAR: null,
        userCO: null,
        office: null,
        text: {
          userPAR: data[x].Received_By,
          userCO: "",
          division: "",
          section: "",
        },

        specs: {
          mac: "",
          ip: "",

          hWare: {
            cpu: "",
            motherBoard: "",
            processor: "",
            memoryCard: "",
            hdd: "",
          },
          sWare: {
            os: {
              name: "",
              isLicensed: false,
            },
            msOffice: {
              name: "",
              isLicensed: false,
            },
            antiVirus: {
              name: "",
              isLicensed: false,
            },
            dateChecked: {
              os: "",
              office: "",
              antivirus: "",
            },
          }
        },
      });

    } else {
      // ADD Other Devices
      arrange.push({
        type: data[x].type,
        status: 1, //1 ACTIVE, 0 INACTIVE
        propertyCode: data[x].Property_No,
        serial: data[x].Serial_No,
        dateAcquired: data[x].Received_Date,
        brand: "",
        model: "",
        remarks: data[x].Remarks,
        donated: "",
        cost: "",
        size: "",

        userPAR: null,
        userCO: null,
        office: null,
        text: {
          userPAR: data[x].Received_By,
          userCO: "",
          division: "",
          section: "",
        },

      });
    }
  }

  for (let x = 0; x < arrange.length; x++) {
    axios({
      url: `${SERVER_API}/device/submit`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        device: { ...arrange[x] }
      }
    })
      .then((res) => {
        // if (device._id == null) {
        //   if (gCount > 10){
        //     devices.pop();
        //     devices.unshift({
        //       ...device,
        //       _id: res.data.device._id
        //     });
        //   }  
        // } else {
        //   devices = devices.map((dev, i) => {
        //     if (device._id == dev._id) {
        //       return {...device}
        //     }else {
        //       return dev;
        //     }
        //   })
        // }

        // dispatch({
        //   type: SET_DEVICES,
        //   data: {
        //     devices: [...devices],
        //     count: gCount + 1,
        //   }
        // })


        // dispatch({
        //   type: CHANGE_ALERT,
        //   resType: "success",
        //   msg: "Device Successfully Added"
        // })


      })
      .catch(err => {
        dispatch({
          type: CHANGE_ALERT,
          resType: "failed",
          msg: "Failed to Add Device"
        })

        // reject(err);
      })
  }

  dispatch({
    type: CHANGE_ALERT,
    resType: "success",
    msg: "Device Successfully Added"
  })

}


export const GetDevicesDashboardNumbers = (id) => (dispatch, getState) => {
  axios({
    url: `${SERVER_API}/device/getdashboardnumbers`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(JWT)}`
    },
    data: {
    }
  })
    .then(res => {
      // console.log("===================4444===================");
      // console.log(res);

      var offices = {};
      var devices = [...res.data.device];
      var counts = { desktop: 0, laptop: 0, printer: 0, scanner: 0, avr: 0, ups: 0, 
                    monitor: 0, projector: 0 , router: 0 , camera: 0 , speaker: 0 , tablet: 0 }

      var numbers = {
        current: {
          waste: {
            total: 0,
            desktop: 0, laptop: 0, printer: 0, scanner: 0, avr: 0, ups: 0, 
            monitor: 0, projector: 0 , router: 0 , camera: 0 , speaker: 0 , tablet: 0 
          },
          inUse: {
            total: 0,
            desktop: 0, laptop: 0, printer: 0, scanner: 0, avr: 0, ups: 0, 
            monitor: 0, projector: 0 , router: 0 , camera: 0 , speaker: 0 , tablet: 0 
          },
        },
        previous: {
          waste: {
            total: 0,
            desktop: 0, laptop: 0, printer: 0, scanner: 0, avr: 0, ups: 0, 
            monitor: 0, projector: 0 , router: 0 , camera: 0 , speaker: 0 , tablet: 0 
          },
          inUse: {
            total: 0,
            desktop: 0, laptop: 0, printer: 0, scanner: 0, avr: 0, ups: 0, 
            monitor: 0, projector: 0 , router: 0 , camera: 0 , speaker: 0 , tablet: 0 
          },
        },
      }, status, tempYear, type;

      for (let x = 0, len = devices.length; x < len; x++) {

        if (devices[x]._id.status == 1) {
          if (!offices.hasOwnProperty(devices[x]._id.section)) {

            offices = {
              ...offices,
              [devices[x]._id.section]: {
                desktop: 0,
                monitor: 0,
                laptop: 0,
                printer: 0,
                ups: 0,
                avr: 0,
                scanner: 0, 
                projector: 0 , 
                router: 0 , 
                camera: 0 , 
                speaker: 0 , 
                tablet: 0 
              }
            }
          }

          offices = {
            ...offices,
            [devices[x]._id.section]: {
              ...offices[devices[x]._id.section],
              [devices[x]._id.type]: devices[x].count
            }
          }


          counts[devices[x]._id.type] += devices[x].count;



        }
        //// NUMBERS PROCESSED HERE
        // devices[x]._id.year;
        // devices[x]._id.status;
        // devices[x]._id.type;

        status = (devices[x]._id.status == 1) ? "inUse" : "waste";
        tempYear = (devices[x]._id.year == 2021) ? "current" : "previous";
        type = devices[x]._id.type;

        // numbers = {
        //   ...numbers,
        //   [tempYear]: {
        //     ...numbers[tempYear],
        //     [status]: {
        //       [type]: 
        //     }

        //   }
        // }

        numbers[tempYear][status][type] += devices[x].count;
        numbers[tempYear][status].total += devices[x].count;

      }

      console.log(offices);
      // console.log(numbers);


      var finalRecord = {
        "RLED": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "BAC": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "RECORDS": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "KM-ICT": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "LEGAL": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "LIBRARY": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "HEPO": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "HRDU": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "FINANCE": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "CASHIER": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "PROCUREMENT": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "CAO": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "SUPPLY": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "WAREHOUSE": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "ARD": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "PLANNING": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "HPR": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "LHS-SEC": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "GOVERNANCE": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "PHARMA": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "HEMS": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "RESU": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "STAT": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "SDN": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "INFECTIOUS": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "HFDU": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "NON-COM": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "HFEP": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "FHC": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "RD": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "COA": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "TB/MALARIA": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "PDOHO-ADS": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "PDOHO-SDS": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "PDOHO-PDI": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "PDOHO-SDN": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        },
        "PDOHO-ADN": {
          avr: 0,
          desktop: 0,
          laptop: 0,
          monitor: 0,
          printer: 0,
          projector: 0,
          scanner: 0,
          ups: 0,
          router: 0 , 
          camera: 0 , 
          speaker: 0 , 
          tablet: 0 
        }
      };

      var assign = {
        "ACCOUNTING":"MSD",
        "SERVICE DELIVERY NETWORK": "SDN",
        "RLED": "RLED",
        "PLANNING SUPPORT STAFF": "PLANNING",
        "PROCUREMENT": "PROCUREMENT",
        "AGUSAN DEL NORTE": "PDOHO-ADN",
        "SURIGAO DEL NORTE": "PDOHO-SDN",
        "HRDU": "HRDU",
        "PDOHO-ADN": "PDOHO-ADN",
        "INFECTIOUS": "INFECTIOUS",
        "PHARMA": "PHARMA",
        "PLANNING": "PLANNING",
        "TB": "TB/MALARIA",
        "CAO": "CAO",
        "SURIGAO DEL SUR": "PDOHO-SDS",
        "RECORDS": "RECORDS",
        "NON-COMM": "NON-COM",
        "ARD": "ARD",
        "BAC": "BAC",
        "PDOHO-SDN": "PDOHO-SDN",
        "CASHIER": "CASHIER",
        "FINANCE": "FINANCE",
        "LHS-SEC": "LHS-SEC",
        "NON COM": "NON-COM",
        "BUDGET": "FINANCE",
        "PDOHO-SDS": "PDOHO-SDS",
        "KMICT": "KM-ICT",
        "HEMS": "HEMS",
        "RESU": "RESU",
        "LIBRARY": "LIBRARY",
        "KM-ICT": "KM-ICT",
        "STATISTICS": "STAT",
        "RD": "RD",
        "FHC": "FHC",
        "GOVERNANCE": "GOVERNANCE",
        "PDOHO-PDI": "PDOHO-PDI",
        "HPR": "HPR",
        "HEMS/RESU": "RESU",
        "COA": "COA",
        "ENGAS": "FINANCE",
        "LEGAL": "LEGAL",
        "FHC/MNCHN": "FHC",
        "WAREHOUSE": "WAREHOUSE",
        "AGUSAN DEL SUR": "PDOHO-ADS",
        "PHARMACEUTICAL": "PHARMA",
        "SUPPLY": "SUPPLY",
        "PDOHO-ADS": "PDOHO-ADS",
        "HFEP": "HFEP",
        "HEPO": "HEPO",
        "LHS-GOV": "GOVERNANCE",
        "HFDU": "HFDU",
      };

      var assignKeys = Object.keys(assign);
      console.log(assignKeys);
      // for (let x = 0; x < assignKeys.length; x++) {
      //   finalRecord[assign[assignKeys[x]]] = {
      //     avr: finalRecord[assign[assignKeys[x]]].avr + offices[assignKeys[x]].avr,
      //     desktop: finalRecord[assign[assignKeys[x]]].desktop + offices[assignKeys[x]].desktop,
      //     laptop: finalRecord[assign[assignKeys[x]]].laptop + offices[assignKeys[x]].laptop,
      //     monitor: finalRecord[assign[assignKeys[x]]].monitor + offices[assignKeys[x]].monitor,
      //     printer: finalRecord[assign[assignKeys[x]]].printer + offices[assignKeys[x]].printer,
      //     projector: finalRecord[assign[assignKeys[x]]].projector + offices[assignKeys[x]].projector,
      //     scanner: finalRecord[assign[assignKeys[x]]].scanner + offices[assignKeys[x]].scanner,
      //     ups: finalRecord[assign[assignKeys[x]]].ups + offices[assignKeys[x]].ups,
      //     router: finalRecord[assign[assignKeys[x]]].router + offices[assignKeys[x]].router,
      //     camera: finalRecord[assign[assignKeys[x]]].camera + offices[assignKeys[x]].camera,
      //     speaker: finalRecord[assign[assignKeys[x]]].speaker + offices[assignKeys[x]].speaker,
      //     tablet: finalRecord[assign[assignKeys[x]]].tablet + offices[assignKeys[x]].tablet,
      //   }
      // }


      dispatch({
        type: SET_OFFICES_DEVICES_RECORDS_DASHBOARD,
        data: finalRecord,
        numbers: numbers,
      })

    })
    .catch(err => {
      console.log(err);
    })
}

export const deleteDevice = (id) => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: "loading",
    msg: "Deleting Device"
  })

  const { toDisplay, device, gCount } = getState().device;

  console.log(device);

  return new Promise((resolve, reject) => {
    axios({
      url: `${SERVER_API}/device/delete`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        deviceID: device._id
      }
    })
      .then((res) => {
        console.log(":::::::::::!!!!!@@@@@");
        console.log(res);
        if (res.data.success) {
          dispatch({
            type: SET_DEVICES,
            data: {
              devices: [...toDisplay.filter((r, i) => r._id != device._id)],
              count: gCount - 1,
            },
          })

          dispatch({
            type: CHANGE_ALERT,
            resType: "success",
            msg: "Device Deleted Successfully"
          })

          resolve(true);

        } else {
          dispatch({
            type: CHANGE_ALERT,
            resType: "failed",
            msg: "Deleting Device Failed"
          })

          resolve(false);
        }

      })
      .catch(err => {
        reject(err);
      })
  })
}