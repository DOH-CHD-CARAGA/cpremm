import {
  SET_DEVICES,
  SET_SEARCHED_DEVICES,
  ADD_NEW_DEVICE,
  SET_DEVICE_DETAIL,
  SET_DEVICE_VALUE,
  SET_DEVICE_DEFAULT,
  SET_DEVICE_QR_FETCH_DATE,
  SET_SELECTED_DEVICE,
  SET_DEVICE_TO_DISPLAY,
  SET_DEVICE_TO_PRINT_QR,
} from '../actions/types';
import { SetRegValueHelper, SpreadOps } from './reducer-helper';

const initialState = {

  devices: [],
  searched: [],
  toDisplay: [],
  selected: [],
  toPrintQR: [],
  gCount: 0,
  sCount: 0,
  count: 0,
  page: 1,
  device: {},

  deviceDefault: {
    type: "desktop",
    status: 1, //1 ACTIVE, 0 INACTIVE
    propertyCode: "",
    serial: "",
    dateAcquired: new Date(),
    brand: "",
    model: "",
    remarks: "",
    donated: "",
    cost: "",
    size: "",

    userPAR: {},
    userCO: {},
    office: {},
    text: {
      userPAR: "",
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
          isLicensed: true,
        },
        msOffice: {
          name: "",
          isLicensed: true,
        },
        antiVirus: {
          name: "",
          isLicensed: true,
        },
        dateChecked: {
          os: "",
          office: "",
          antivirus: "",
        },
      }
    },

    checkups: [{
      date: new Date(),
      actions: "",
      category: "",
      ITIncharge: {},
    }],

  },

};

var temp = "";
initialState.device = SpreadOps({ ...initialState.deviceDefault });

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_SEARCHED_DEVICES:
      return {
        ...state,
        searched: action.data.devices,
        toDisplay: action.data.devices,
        sCount: action.data.count,
        count: action.data.count,
        page: (action.page) ? action.page : 1
      }


    case SET_DEVICES:
      return {
        ...state,
        devices: (action.data) ? action.data.devices : state.devices,
        toDisplay: (action.data) ? action.data.devices : state.devices,
        gCount: (action.data) ? action.data.count : state.gCount,
        count: (action.data) ? action.data.count : state.gCount,
        page: (action.page) ? action.page : 1
      }

    case ADD_NEW_DEVICE:
      return {
        ...state,
        devices: [action.data, ...state.devices],
        toDisplay: [action.data, ...state.devices],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_DEVICE_DETAIL:
      return {
        ...state,
        device: { ...action.detail.device[0] }
      }

    case SET_DEVICE_QR_FETCH_DATE:
      console.log("A:::::::::::::::::;");
      console.log(action);
      return {
        ...state,
        device: { ...action.data.devices[0] }
      }

    case SET_DEVICE_VALUE:
      temp = { ...state.device };
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);

      return {
        ...state,
        device: { ...temp }
      }


    case SET_DEVICE_DEFAULT:
      return {
        ...state,
        device: SpreadOps({ ...state.deviceDefault }),
      }

    case SET_SELECTED_DEVICE:
      return {
        ...state,
        selected: [...action.selected],
      }

    case SET_DEVICE_TO_DISPLAY:
      return {
        ...state,
        toDisplay: [...action.toDisplay],
      }

    case SET_DEVICE_TO_PRINT_QR:
      return {
        ...state,
        toPrintQR: [...action.toPrintQR],
      }

    default:
      return state

  }
}
