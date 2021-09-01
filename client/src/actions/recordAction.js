import {
  TOGGLE_ALERT,
  CHANGE_ALERT,
  SET_RECORD_DETAIL,
  SET_RECORD_DEFAULT,
  SET_RECORDS,
  SET_USER_RECORD_ENTRY,
  SET_DASHBOARD_GRAPHS_DATA,
  SET_RECORD_SUBMITTED,
} from './types';
import { SERVER_API, JWT } from '../config';
import axios from 'axios';
import { ArrangeDate } from './helpers/displayAction';

export const SetRecordDetail = (id) => (dispatch, getState) => {

  const { toDisplay } = getState().record;
  console.log(toDisplay);

  // const record = toDisplay.filter((record, i) => record._id == id);
  const record = toDisplay.filter((record, i) => i == id);

  dispatch({
    type: SET_RECORD_DETAIL,
    detail: {
      detail: {...record[0]}
    }
  })
}

export const SetRecordDefault = () => (dispatch) => {
  dispatch({
    type: SET_RECORD_DEFAULT,
  })
}
export const addRecord = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: "loading",
    msg: "Adding Record"
  })
  // const { record, gCount } = getState().record;
  // const records = [...getState().record.records];

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
  //     console.log(res);

  //     if (gCount > 10){
  //       records.pop();
  //       records.unshift({...res.data.record});
  //     }
      
  //     dispatch({
  //       type: SET_RECORDS,
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

  // const { record, gCount } = getState().record;
  // const records = [...getState().record.records];

  // console.log(localStorage.getItem(JWT));
  
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
  //     console.log(res);
  //     if (res.status){

  //       records.map((r) => {
  //         if (record._id == r._id) {
  //           r.name = record.name;
  //           r.routes = record.routes;
  //         }
  //         return r;
  //       });
      
  //       dispatch({
  //         type: SET_RECORDS,
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
    type: SET_USER_RECORD_ENTRY,
    data: data,
    key: key.split("."),
  })
}

export const toggleSubmitted = (data, key) => (dispatch) => {
  dispatch({
    type: SET_RECORD_SUBMITTED,
    submiitted: false,
  })
}

export const UpdateRecordActions = (type="+", ind) => (dispatch, getState) => {

  const { record } = getState();
  const { recordDefault } = record;
  const currRecord = record.record;
  var temp = {};

  if (type == "+") {
    temp = {
      ...currRecord,
      actions: [
        ...currRecord.actions,
        {...recordDefault.actions[0]}
      ]
    }
  }else if (type == "-") {
    
    temp = {
      ...currRecord,
      actions: [
        ...currRecord.actions.filter((action, i) => i != ind)
      ]
    }
  }

  dispatch({
    type: SET_RECORD_DETAIL,
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

  const { record } = getState();
  const { records, gCount } = record;

  console.log(record.record);

  var newRecord = {
    _id: record.record._id || "",
    propertyCode: record.record.propertyCode,
    dateAcquired: record.record.dateAcquired,
    userPAR: record.record.userPAR,
    userCO: record.record.userCO,
    division: (record.record.office.hasOwnProperty("division") && record.record.office.division != "")?record.record.office.division:record.record.division,
    section: (record.record.office.hasOwnProperty("section") && record.record.office.section != "")?record.record.office.section:record.record.section,
    unitType: record.record.unitType,
    serial: record.record.serial,
    brand: record.record.brand,
    mac: record.record.mac,
    ip: record.record.ip,
    donated: record.record.donated,
    purchased: record.record.purchased,
    specs: {
      hWare: {
        cpu: record.record.specs.hWare.cpu,
        motherBoord: record.record.specs.hWare.motherBoord,
        processor: record.record.specs.hWare.processor,
        memoryCard: record.record.specs.hWare.memoryCard,
        hdd: record.record.specs.hWare.hdd,
        ram: record.record.specs.hWare.ram,
        monitor: {
          ...record.record.specs.hWare.monitor,
          userPAR: (record.record.specs.hWare.monitor.hasOwnProperty("userPAR"))
            ?record.record.specs.hWare.monitor.userPAR._id
            :""
        },
        keyboard: {
          ...record.record.specs.hWare.keyboard
        },
        mouse: {
          ...record.record.specs.hWare.mouse
        },
        avr: {
          ...record.record.specs.hWare.avr,
        },
        ups: {
          ...record.record.specs.hWare.ups
        },
        scanner: {
          ...record.record.specs.hWare.scanner
        },
        printer: {
          ...record.record.specs.hWare.printer,
          user: (record.record.specs.hWare.printer.hasOwnProperty("user"))
            ?record.record.specs.hWare.printer.user._id
            :""
        },
        dateChecked: {
          ...record.record.specs.hWare.dateChecked
        }
      },
      sWare: {
        ...record.record.specs.sWare,
        os: {
          ...record.record.specs.sWare.os,
          isLicensed: (1 * record.record.specs.sWare.os.isLicensed)
        },
        msOffice: {
          ...record.record.specs.sWare.msOffice,
          isLicensed: (1 * record.record.specs.sWare.msOffice.isLicensed)
        },
        antiVirus: {
          ...record.record.specs.sWare.antiVirus,
          isLicensed: (1 * record.record.specs.sWare.antiVirus.isLicensed)
        }
      }
    },
    office: (record.record.office.hasOwnProperty("_id"))?record.record.office._id:null,
    endUser: {
      userCo: (record.record.endUser.hasOwnProperty("userCo"))?record.record.endUser.userCo._id:null,
      userPAR: (record.record.endUser.hasOwnProperty("userPAR"))?record.record.endUser.userPAR._id:null
    },
    actions: [...record.record.actions],
    otherEquipments: [...record.record.otherEquipments],
    under: record.record.under,
    no: record.record.no,
    
  };

  console.log(newRecord);


  return new Promise((resolve, reject) => {
    axios({
      url: `${SERVER_API}/record/submit`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        record: {...newRecord}
      }
    })
    .then((res) => {
      console.log(res);
      console.log(records);

      if (gCount > 10){
        records.pop();
        records.unshift({
          ...record.record,
          _id: res.data.record._id,
        });
      }
      console.log(records);
      
      dispatch({
        type: SET_RECORDS,
        data: {
          records: [...records],
          count: gCount + 1,
        },
        submitted: true,
      })
      

      dispatch({
        type: CHANGE_ALERT,
        resType: "success",
        msg: "Record Successfully Added"
      })
      
      
    })
    .catch(err => {
      reject(err);
    })
  })
  
}


export const ArrangeRecord = (data) => (dispatch) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: "loading",
    msg: "Submitting Record"
  })

  var keys = Object.keys(data[0]), key = [];
  var template = {};
  console.log(keys);
  for (let x = 0; x < keys.length; x++) {
    key = keys[x].split("~");

    if (key.length == 1) {
      template[key[0]] = "";
    }
    if (key.length == 2) {
      template[key[0]] = {
        ...template[key[0]],
        [key[1]]: ""        
      }
    }
  }


  data.shift();
  console.log(template);
  console.log(data);

  var arranged = [], template2 = {};

  for (let x = 0; x < data.length; x++) {
    template2 = {
      ...template
    };

    keys = Object.keys(data[x]);    

    for (let y = 0; y < keys.length; y++) {
      key = keys[y].split("~");

      if (!keys[y].includes("EMPTY")) {
        if (key.length == 1) {
          template2[key[0]] = data[x][keys[y]];
        } else if (key.length == 2) {
          template2[key[0]] = {
            ...template2[key[0]],
            [key[1]]: data[x][keys[y]]
          }
        }
      }

    }
    arranged.push(template2);
  }

  var fixed = [];
  var devices = [];

  for (let x = 0; x < arranged.length; x++) {
    template = {
      no: arranged[x].DSKTP.no,
      propertyCode: arranged[x].DSKTP.propertyNo,
      dateAcquired: arranged[x].DSKTP.yearAcquired,
      userPAR: arranged[x].OWNER.userPAR,
      userCO: arranged[x].OWNER.userCo,
      division: arranged[x].OFFICE,
      section: arranged[x].OFFICE,
      unitType: "DESKTOP",
      serial: arranged[x].DSKTP.serial,
      brand: arranged[x].DSKTP.brand,
      model: arranged[x].DSKTP.model,
      mac: arranged[x].DSKTP.mac,
      ip: arranged[x].DSKTP.ip,
      remarks: arranged[x].DSKTP.remarks,
      donated: "",
      purchased: "",
      specs: {
        hWare: {
          cpu: arranged[x].DSKTP.processor,
          motherBoord: "",
          processor: arranged[x].DSKTP.processor,
          memoryCard: arranged[x].DSKTP.processor,
          ram: arranged[x].DSKTP.ram,
          hdd: arranged[x].DSKTP.hdd,
          monitor: {
            status: arranged[x].MON.no,
            brand: arranged[x].MON.brand,
            size: arranged[x].MON.size,
            serial: arranged[x].MON.serial,
            remarks: arranged[x].MON.remarks,
            propertyCode: arranged[x].MON.propertyNo,
          },
          keyboard: {
            brand: "",
            serial: "",
          },
          mouse: {
            brand: "",
            serial: "",
          },
          avr: {
            status: arranged[x].AVR.count,
            brand: arranged[x].AVR.brand,
            serial: arranged[x].AVR.serial,
            propertyCode: arranged[x].AVR.propertyCode, 
            remarks: arranged[x].AVR.remarks, 
          },
          ups: {
            status: arranged[x].UPS.count,
            brand: arranged[x].UPS.brand,
            serial: arranged[x].UPS.serial,
            propertyCode: arranged[x].UPS.propertyNo,
            remarks: arranged[x].UPS.remarks, 
          },
          scanner: {
            status: arranged[x].SCANNER.count,
            brand: arranged[x].SCANNER.brand,
            serial: arranged[x].SCANNER.serial,
            propertyCode: arranged[x].SCANNER.propertyNo,
            remarks: arranged[x].SCANNER.remarks,
          },
          printer: {
            status: arranged[x].PRINT.no,
            name: arranged[x].PRINT.brand,
            code: arranged[x].PRINT.propertyNo,
            serial: arranged[x].PRINT.serial,
            dateAcquired: arranged[x].PRINT.dateAcquired,
            remarks: arranged[x].PRINT.remarks,
          },
          dateChecked: {
            motherBoard: "",
            processors: "",
            memCards: "",
            hardDisk: "",
            monitor: "",
            ups: "",
            avr: "",
            keyboardMouse: "",
            printers: "",
            scanners: "",
          }
        },
        sWare: {
          os: {
            name: arranged[x].DSKTP.os,
            isLicensed: 1
          },
          msOffice: {
            name: arranged[x].DSKTP.office,
            isLicensed: 1
          },
          antiVirus: {
            name: arranged[x].DSKTP.antiVirus,
            isLicensed: 1
          },
          dateChecked: {
            os: "",
            office: "",
            antivirus: "",
          },
        }
      },
      // office: "",
      // endUser: {
      //   userCo: "",
      //   userPAR: ""
      // },

      actions: [],
      otherEquipments: [],

      under: 0,
    }
    if (!(arranged[x].DSKTP.no == 0 && arranged[x].DSKTP.yearAcquired != 2020)) {
      devices.push({
        type: "desktop",
        // year: ((arranged[x].DSKTP.yearAcquired) !== "" && (arranged[x].DSKTP.yearAcquired) !== "UNSEEN")?arranged[x].DSKTP.yearAcquired:(arranged[x].DSKTP.propertyNo.split("-")[0]*1),
        year: ((typeof(arranged[x].DSKTP.yearAcquired) == "number"))?arranged[x].DSKTP.yearAcquired:(arranged[x].DSKTP.propertyNo.split("-")[0]*1),
        office: arranged[x].OFFICE,
        propertyNo: arranged[x].DSKTP.propertyNo,
      })
    }
    if (!(arranged[x].PRINT.no == 0 && arranged[x].PRINT.yearAcquired != 2020)) {
      devices.push({
        type: "printer",
        // year: ((arranged[x].PRINT.yearAcquired) !== "" && (arranged[x].PRINT.yearAcquired) !== "UNSEEN")?arranged[x].PRINT.yearAcquired:(arranged[x].PRINT.propertyNo.split("-")[0]*1),
        year: (typeof(arranged[x].PRINT.yearAcquired) == "number")?arranged[x].PRINT.yearAcquired:((arranged[x].PRINT.propertyNo+"").split("-")[0]*1),
        office: template.division,
        propertyNo: arranged[x].PRINT.propertyNo,
      })
    }     

    if (arranged[x].LAPTOP.brand != "" || arranged[x].LAPTOP.serial != "") {
      template.otherEquipments.push({
        type: "laptop",
        serial: arranged[x].LAPTOP.serial,
        propertyNo: arranged[x].LAPTOP.parNumber,

        user: "",
        antiVirus: arranged[x].LAPTOP.antiVirus,
        brand: arranged[x].LAPTOP.brand,
        status: arranged[x].LAPTOP.count,
        hdd: arranged[x].LAPTOP.hdd,
        mac: arranged[x].LAPTOP.mac,
        office: arranged[x].LAPTOP.office,
        os: arranged[x].LAPTOP.os,
        processor: arranged[x].LAPTOP.processor,
        ram: arranged[x].LAPTOP.ram,
        remarks: arranged[x].LAPTOP.remarks,
        yearAcquired: arranged[x].LAPTOP.yearAcquired  
      })

      if (!(arranged[x].LAPTOP.no == 0 && arranged[x].LAPTOP.yearAcquired != 2020)) {
        devices.push({
          type: "laptop",
          // year: ((arranged[x].LAPTOP.yearAcquired) !== "" && (arranged[x].LAPTOP.yearAcquired) !== "UNSEEN")?arranged[x].LAPTOP.yearAcquired:((arranged[x].LAPTOP.parNumber+"").split("-")[0]*1),
          year: (typeof(arranged[x].LAPTOP.yearAcquired) == "number")?arranged[x].LAPTOP.yearAcquired:((arranged[x].LAPTOP.parNumber+"").split("-")[0]*1),
          office: arranged[x].OFFICE,
          propertyNo: arranged[x].LAPTOP.parNumber,
        })
      }
    }
    if (arranged[x].PROJECTOR.brand != "" || arranged[x].PROJECTOR.serial != "") {
      template.otherEquipments.push({
        type: "projector",
        serial: arranged[x].PROJECTOR.serial,
        propertyNo: arranged[x].PROJECTOR.propertyNo,

        status: arranged[x].PROJECTOR.count,
        brand: arranged[x].PROJECTOR.brand,
        remarks: arranged[x].PROJECTOR.remarks,
      })  

      if (!(arranged[x].PROJECTOR.count == 0 && arranged[x].PROJECTOR.yearAcquired != 2020)) {
        devices.push({
          type: "projector",
          year: (arranged[x].PROJECTOR.propertyNo != "")?(arranged[x].PROJECTOR.propertyNo+"").split("-")[0]*1:"",
          office: arranged[x].OFFICE,
          propertyNo: arranged[x].PROJECTOR.propertyNo,
        })
      }
    }

    if (arranged[x].MON.brand != "" || arranged[x].MON.serial != "") {
      if (!(arranged[x].MON.no == 0)) {
        devices.push({
          type: "monitor",
          year: (arranged[x].MON.propertyNo != "")?(arranged[x].MON.propertyNo+"").split("-")[0]*1:"",
          office: template.division,
          propertyNo: arranged[x].MON.propertyNo,
        })
      }
    }

    if (arranged[x].AVR.brand != "" || arranged[x].AVR.serial != "") {
      if (!(arranged[x].AVR.count == 0 && ((arranged[x].AVR.propertyCode+"").split("-")[0]*1) != 2020)) {
        devices.push({
          type: "avr",
          year: (arranged[x].AVR.propertyCode != "")?(arranged[x].AVR.propertyCode+"").split("-")[0]*1:"",
          office: template.division,
          propertyNo: arranged[x].AVR.propertyCode,
        })
      }
    }
    if (arranged[x].UPS.brand != "" || arranged[x].UPS.serial != "") {
      if (!(arranged[x].UPS.count == 0 && ((arranged[x].UPS.propertyNo+"").split("-")[0]*1) != 2020)) {
        devices.push({
          type: "ups",
          year: (arranged[x].UPS.propertyNo != "")?(arranged[x].UPS.propertyNo+"").split("-")[0]*1:"",
          office: template.division,
          propertyNo: arranged[x].UPS.propertyNo,
        })
      }
    }
    if (arranged[x].SCANNER.brand != "" || arranged[x].SCANNER.serial != "") {
      if (!(arranged[x].SCANNER.count == 0 && ((arranged[x].SCANNER.propertyNo+"").split("-")[0]*1) != 2020)) {
        devices.push({
          type: "scanner",
          year: (arranged[x].SCANNER.propertyNo != "")?(arranged[x].SCANNER.propertyNo+"").split("-")[0]*1:"",
          office: template.division,
          propertyNo: arranged[x].SCANNER.propertyNo,
        })
      }
    } 
    // ===============================================================
    if ((arranged[x].DSKTP.remarks + "").trim("") != "") {
      template.actions.push({
        propertyCode: arranged[x].DSKTP.propertyNo,
        actionTaken:  "",
        findings:     arranged[x].DSKTP.remarks,
        item:         "DESKTOP",
        date:         "",
      })

    }

    if (arranged[x].DSKTP.no == 0) {
      template.actions.push({
        propertyCode: arranged[x].DSKTP.propertyNo,
        actionTaken:  "",
        findings:     "WASTED",
        item:         "DESKTOP1",
        date:         "",
      })
    }

    for (let y = 0, z = 1; y < z; y++) {
      if ((x+1) < arranged.length) {
        if ((arranged[x].OWNER.userPAR == arranged[x+1].OWNER.userPAR && arranged[x].OWNER.userCo == arranged[x+1].OWNER.userCo) && ((arranged[x].DSKTP.propertyNo == arranged[x+1].DSKTP.propertyNo) || (arranged[x+1].DSKTP.propertyNo+"").trim("") == "")) {
          z++;
          x++;
          template.under++;

          if (arranged[x].PRINT.brand != "" || arranged[x].PRINT.serial != "") {
            template.otherEquipments.push({
              type: "printer",
              serial: arranged[x].PRINT.serial,
              propertyNo: arranged[x].PRINT.propertyNo,
              status: arranged[x].PRINT.no,
              brand: arranged[x].PRINT.brand,
              dateAcquired: arranged[x].PRINT.dateAcquired,
              remarks: arranged[x].PRINT.remarks,
            })     
            if (!(arranged[x].PRINT.no == 0 && arranged[x].PRINT.yearAcquired != 2020)) {
              devices.push({
                type: "printer",
                // year: ((arranged[x].PRINT.yearAcquired) !== "" && (arranged[x].PRINT.yearAcquired) !== "UNSEEN")?arranged[x].PRINT.yearAcquired:(arranged[x].PRINT.propertyNo.split("-")[0]*1),
                year: (typeof(arranged[x].PRINT.yearAcquired) == "number")?arranged[x].PRINT.yearAcquired:((arranged[x].PRINT.propertyNo+"").split("-")[0]*1),
                office: template.division,
                propertyNo: arranged[x].PRINT.propertyNo,
              })
            }     
          }
          if (arranged[x].LAPTOP.brand != "" || arranged[x].LAPTOP.serial != "") {
            template.otherEquipments.push({
              type: "laptop",
              serial: arranged[x].LAPTOP.serial,
              propertyNo: arranged[x].LAPTOP.parNumber,

              status: arranged[x].LAPTOP.count,
              user: "",
              antiVirus: arranged[x].LAPTOP.antiVirus,
              brand: arranged[x].LAPTOP.brand,
              count: arranged[x].LAPTOP.count,
              hdd: arranged[x].LAPTOP.hdd,
              mac: arranged[x].LAPTOP.mac,
              office: arranged[x].LAPTOP.office,
              os: arranged[x].LAPTOP.os,
              processor: arranged[x].LAPTOP.processor,
              ram: arranged[x].LAPTOP.ram,
              remarks: arranged[x].LAPTOP.remarks,
              yearAcquired: arranged[x].LAPTOP.yearAcquired,
            })          
            if (!(arranged[x].LAPTOP.no == 0 && arranged[x].LAPTOP.yearAcquired != 2020)) {
              devices.push({
                type: "laptop",
                // year: ((arranged[x].LAPTOP.yearAcquired) !== "" && (arranged[x].LAPTOP.yearAcquired) !== "UNSEEN")?arranged[x].LAPTOP.yearAcquired:(arranged[x].LAPTOP.parNumber.split("-")[0]*1),
                year: (typeof(arranged[x].LAPTOP.yearAcquired) == "number")?arranged[x].LAPTOP.yearAcquired:((arranged[x].LAPTOP.parNumber+"").split("-")[0]*1),
                office: template.division,
                propertyNo: arranged[x].LAPTOP.parNumber,
              })
            }
          }
          if (arranged[x].MON.brand != "" || arranged[x].MON.serial != "") {
            template.otherEquipments.push({
              type: "monitor",
              serial: arranged[x].MON.serial,
              propertyNo: arranged[x].MON.propertyNo,

              status: arranged[x].MON.no,
              brand: arranged[x].MON.brand,
              size: arranged[x].MON.size,
              remarks: arranged[x].MON.remarks,
            });
            if (!(arranged[x].MON.no == 0)) {
              devices.push({
                type: "monitor",
                year: (arranged[x].MON.propertyNo != "")?(arranged[x].MON.propertyNo+"").split("-")[0]*1:"",
                office: template.division,
                propertyNo: arranged[x].MON.propertyNo,
              })
            }
          }
          if (arranged[x].AVR.brand != "" || arranged[x].AVR.serial != "") {
            template.otherEquipments.push({
              type: "avr",
              serial: arranged[x].AVR.serial,
              propertyNo: arranged[x].AVR.propertyCode, 

              status: arranged[x].AVR.count,
              brand: arranged[x].AVR.brand,
              remarks: arranged[x].AVR.remarks, 
            }) 
            if (!(arranged[x].AVR.count == 0 && ((arranged[x].AVR.propertyCode+"").split("-")[0]*1) != 2020)) {
              devices.push({
                type: "avr",
                year: (arranged[x].AVR.propertyCode != "")?(arranged[x].AVR.propertyCode+"").split("-")[0]*1:"",
                office: template.division,
                propertyNo: arranged[x].AVR.propertyCode,
              })
            }
          }
          if (arranged[x].UPS.brand != "" || arranged[x].UPS.serial != "") {
            template.otherEquipments.push({
              type: "ups",
              serial: arranged[x].UPS.serial,
              propertyNo: arranged[x].UPS.propertyNo,

              status: arranged[x].UPS.count,
              brand: arranged[x].UPS.brand,
              remarks: arranged[x].UPS.remarks, 
            })         
            if (!(arranged[x].UPS.count == 0 && ((arranged[x].UPS.propertyNo+"").split("-")[0]*1) != 2020)) {
              devices.push({
                type: "ups",
                year: (arranged[x].UPS.propertyNo != "")?(arranged[x].UPS.propertyNo+"").split("-")[0]*1:"",
                office: template.division,
                propertyNo: arranged[x].UPS.propertyNo,
              })
            }
          }
          if (arranged[x].PROJECTOR.brand != "" || arranged[x].PROJECTOR.serial != "") {
            template.otherEquipments.push({
              type: "projector",
              serial: arranged[x].PROJECTOR.serial,
              propertyNo: arranged[x].PROJECTOR.propertyNo,

              status: arranged[x].PROJECTOR.count,
              brand: arranged[x].PROJECTOR.brand,
              remarks: arranged[x].PROJECTOR.remarks,
            })  
            if (!(arranged[x].PROJECTOR.count == 0 && ((arranged[x].PROJECTOR.propertyNo+"").split("-")[0]*1) != 2020)) {
              devices.push({
                type: "projector",
                year: (arranged[x].PROJECTOR.propertyNo != "")?(arranged[x].PROJECTOR.propertyNo+"").split("-")[0]*1:"",
                office: template.division,
                propertyNo: arranged[x].PROJECTOR.propertyNo,
              })
            }
          }
          if (arranged[x].SCANNER.brand != "" || arranged[x].SCANNER.serial != "") {
            template.otherEquipments.push({
              type: "scanner",
              serial: arranged[x].SCANNER.serial,
              propertyNo: arranged[x].SCANNER.propertyNo,

              status: arranged[x].SCANNER.count,
              brand: arranged[x].SCANNER.brand,
              remarks: arranged[x].SCANNER.remarks,
            })     
            
            if (!(arranged[x].SCANNER.count == 0 && ((arranged[x].SCANNER.propertyNo+"").split("-")[0]*1) != 2020)) {
              devices.push({
                type: "scanner",
                year: (arranged[x].SCANNER.propertyNo != "")?(arranged[x].SCANNER.propertyNo+"").split("-")[0]*1:"",
                office: template.division,
                propertyNo: arranged[x].SCANNER.propertyNo,
              })
            }
          }


        }
      }
    }

    fixed.push({...template});

    // {
    //   _id: false,
    //   propertyCode: {type: String},
    //   actionTaken:  {type: String},
    //   findings:     {type: String},
    //   item:         {type: String},
    //   date:         "",
    // }

    // {
    //   _id: false,
    //   itemDescription: {type: String},
    //   specification:  {type: String},
    //   serial:     {type: String},
    // }

    if (arranged.length == x+1) {
      dispatch({
        type: CHANGE_ALERT,
        resType: "success",
        msg: "Record Successfully Added"
      })
    }
  }

  console.log(arranged);
  console.log(fixed);
  console.log(devices);


  var deviceCount = {
    2020: {
      ALL : 0,
      "UNSET": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      ARD: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      "BAC SEC": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      BUDGET: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      CAO: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      CASHIER: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      COA: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      ENGAS: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      FHC: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      FINANCE: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      HEMS: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      HEPO: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      HFDU: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      HFEP: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      HPR: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      HRDU: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      INFECTIOUS: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      "KM-ICT": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      "LHS-GOV": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      "LHS-SEC": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      LIBRARY: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      "NON-COMM": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      "PDOHO-AD N": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      "PDOHO-ADS": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      "PDOHO-PDI": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      "PDOHO-SDN": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      "PDOHO-SDS": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      PHARMA: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      PLANNING: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      "PLANNING SUPPORT STAFF": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      PROCUREMENT: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      RD: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      RECORDS: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      RESU: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      RLED: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      SDN: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      SERVERS: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      STATISTICS: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      SUPPLY: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      TB: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      WAREHOUSE: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
    },
    other: {
      ALL: 0,
      "UNSET": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      ARD: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      "BAC SEC": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      BUDGET: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      CAO: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      CASHIER: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      COA: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      ENGAS: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      FHC: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      FINANCE: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      HEMS: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      HEPO: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      HFDU: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      HFEP: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      HPR: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      HRDU: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      INFECTIOUS: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      "KM-ICT": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      "LHS-GOV": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      "LHS-SEC": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      LIBRARY: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      "NON-COMM": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      "PDOHO-AD N": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      "PDOHO-ADS": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      "PDOHO-PDI": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      "PDOHO-SDN": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      "PDOHO-SDS": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      PHARMA: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      PLANNING: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      "PLANNING SUPPORT STAFF": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      PROCUREMENT: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      RD: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      RECORDS: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      RESU: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      RLED: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      SDN: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      SERVERS: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      STATISTICS: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      SUPPLY: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      TB: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
      WAREHOUSE: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        scanner: 0,ups: 0, avr: 0, projector: 0, monitor: 0,        
      },
    },
  };

  for (let x = 0; x < devices.length; x++) {
    var office = devices[x].office;
      office = (office !== "")?office:"UNSET"; 

    if (devices[x].year == 2020) {
      deviceCount["2020"][office][devices[x].type] = deviceCount["2020"][office][devices[x].type]+1;
      deviceCount["2020"][office].all = deviceCount["2020"][office].all+1;
      deviceCount["2020"].ALL = deviceCount["2020"].ALL + 1;
    }else {
      deviceCount["other"][office][devices[x].type] = deviceCount["other"][office][devices[x].type]+1;
      deviceCount["other"][office].all = deviceCount["other"][office].all+1;
      deviceCount["other"].ALL = deviceCount["other"].ALL + 1;
    }
  }

  dispatch({
    type: SET_DASHBOARD_GRAPHS_DATA,
    data: deviceCount,
  })


  dispatch({
    type: SET_RECORDS,
    data: {
      records: [...fixed],
      count: fixed.length,
    },
    page: 1
  })

  dispatch({
    type: CHANGE_ALERT,
    resType: "loading",
    msg: "Saving New Records"
  })

  for (let x = 0; x < fixed.length; x++) {
  // for (let x = 0; x < 1; x++) {
    axios({
      url: `${SERVER_API}/record/update`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        record: {
          ...fixed[x]
        },
        index: x,
      }
    })
    .then(res => {
      console.log("===============>>>>>>>>>>>>>>>>>>>>>> " + res.data.index);
      console.log(res.data.status);
    })
    .catch(err => {
      console.log(err);
    })
  }

  // for (let x = 0; x < 1; x++) {
  //   console.log("=---------------------------------->>");
  //   console.log({...fixed[x]});
  //   axios({
  //     url: `${SERVER_API}/record2/submit`,
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //       Authorization: `Bearer ${localStorage.getItem(JWT)}`
  //     },
  //     data: {
  //       record: {...fixed[x]},
  //       index: x,
  //     }
  //   })
  //   .then(res => {
  //     console.log("===============>>>>>>>>>>>>>>>>>>>>>>");
  //     console.log(res.data.status);
  //     console.log(res.data.index);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }

  // axios({
  //   url: `${SERVER_API}/record/submitAll`,
  //   method: 'POST',
  //   headers: {
  //     'content-type': 'application/json',
  //     Authorization: `Bearer ${localStorage.getItem(JWT)}`
  //   },
  //   data: {
  //     records: [...fixed]
  //   }
  // })
  // .then(data => {
  //   console.log(data);
  // })
  // .catch(err => {
  //   console.log(err);
  // })



}
