import {
  SET_RECORDS,
  SET_SEARCHED_RECORDS,
  ADD_NEW_RECORD,
  SET_RECORD_DETAIL,
  SET_RECORD_VALUE,
  SET_RECORD_DEFAULT,
  SET_USER_RECORD_ENTRY,
  SET_RECORD_SUBMITTED,
} from '../actions/types';
import { SetRegValueHelper, SpreadOps } from './reducer-helper';

const initialState = {

  records: [],
  searched: [],
  toDisplay: [],
  gCount: 0,
  sCount: 0,
  count: 0,
  page: 1,
  record: {},

  recordDefault: {
    propertyCode: "",
    dateAcquired: new Date(),
    userPAR: "",
    userCO: "",
    division: "",
    section: "",
    purchased: "",
    donated: "",
    unitType: "",
    serial: "",
    brand: "",
    mac: "",
    ip: "",
    specs: {
      hWare: {
        cpu: "",
        motherBoord: "",
        processor: "",
        memoryCard: "",
        hdd: "",
        monitor: {
          brand: "",
          size: "",
          serial: "",
          propertyCode: "",
          userPAR: {
            name: {first:""}
          }
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
          number: "",
          brand: "",
          serial: "",
          propertyCode: "", 
        },
        ups: {
          number: "",
          brand: "",
          serial: "",
          propertyCode: "" 
        },
        scanner: {
          number: "",
          brand: "",
          serial: "",
          propertyCode: "",
        },
        printer: {
          number: "",
          built: "",
          name: "",
          code: "",
          serial: "",
          user: {
            name: {first:""}
          }
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
          name: "",
          isLicensed: 1
        },
        msOffice: {
          name: "",
          isLicensed: 1
        },
        antiVirus: {
          name: "",
          isLicensed: 1
        },
        dateChecked: {
          os: "",
          office: "",
          antivirus: "",
        },
      }
    },
    office: "",
    endUser: {
      userCo: {
        _id: "",
        name: {first: "", mid: "", last: ""}
      },
      userPAR: {
        _id: "",
        name: {first: "", mid: "", last: ""}
      }
    },
    actions: [{
      propertyCode: "",
      item: "",
      findings: "",
      actionTaken: "",
      date: ""
    }],
    otherEquipments: [{
      type: "",
      serial: "",
      propertyNo: "",
  
      user: "",
      antiVirus: "",
      brand: "",
      status: 0,
      hdd: "",
      mac: "",
      office: "",
      os: "",
      processor: "",
      ram: "",
      remarks: "",
      yearAcquired: "",
    }],
  },
  submitted: false,

  // reactSelect: {
  //   par: {
  //     options: [],
  //     value: "",
  //     text: "",
  //   },
  //   co: {
  //     options: [],
  //     value: "",
  //     text: "",
  //   },
  //   division: {
  //     options: [],
  //     value: "",
  //     text: "",
  //   },
  //   section: {
  //     options: [],
  //     value: "",
  //     text: "",
  //   },

  //   current: "",
  // }

};

var temp = "";
initialState.record = SpreadOps({...initialState.recordDefault});

export default function(state = initialState, action) {
  switch (action.type) {

    case SET_USER_RECORD_ENTRY:
      temp = {...state.record};
      temp = SetRegValueHelper(temp, action.data, action.key, action.key.length, 0);

      return {
        ...state,
        record: {...temp}
      }


    case SET_SEARCHED_RECORDS:
      return {
        ...state,
        searched: action.data.records,
        toDisplay: action.data.records,
        sCount: action.data.count,
        count: action.data.count,
        page: (action.page)?action.page:1,
      }


    case SET_RECORDS:
      return {
        ...state,
        records: (action.data)?action.data.records:state.records,
        toDisplay: (action.data)?action.data.records:state.records,
        gCount: (action.data)?action.data.count:state.gCount,
        count: (action.data)?action.data.count:state.gCount,
        page: (action.page)?action.page:1,
        submitted: (action.submitted)?action.submitted:state.submitted
      }

    case SET_RECORD_SUBMITTED:
      return {
        ...state,
        submitted: action.submitted
      }

    case ADD_NEW_RECORD:
      return {
        ...state,
        records: [action.data, ...state.records],
        toDisplay: [action.data, ...state.records],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_RECORD_DETAIL:
      console.log(action);
      return {
        ...state,
        record: {
          ...state.recordDefault,
          ...action.detail.detail
        }
      }

    case SET_RECORD_VALUE:
      console.log(action);
      temp = {...state.record};
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);
      console.log(temp);

      return {
        ...state,
        record: {...temp},
        submitted: false
      }

    case SET_RECORD_DEFAULT:
      return {
        ...state,
        record: SpreadOps({...state.recordDefault}),
        submitted: false
      }

    default:
      return state

  }
}
