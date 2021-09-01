import { 
  CHANGE_ALERT,
  SET_SHEETS,
  SET_SHEET_DATA,
  UPLOAD_STATUS_UPDATE,
  UPDATE_SHEET_STATUS,
  SET_SHEETS2,
  SET_SHEET_DATA2,
  UPLOAD_STATUS_UPDATE2,
  UPDATE_SHEET_STATUS2,
} from '../actions/types';

const initialState = {
  sheetStatus:   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /// 0 = NONE, 1 = PREPARED, 2 = SAVING, 3 = SAVED, 4 ERROR
  allowedSheets: ["Admn","But","San","Tun","Cbr","Mad","Car","Pros","Bar","Lia","Tal","Hin","Tan","San Mig","San Ag","Aras","Clav","Mag","Bad"],
  sheets: {
    "Admn":    {name: "Admin",data: []},
    "But":     {name: "Butuan",data: []},
    "San":     {name: "Santiago",data: []},
    "Tun":     {name: "Tungao",data: []},
    "Cbr":     {name: "Cabadbaran",data: []},
    "Mad":     {name: "Madrid",data: []},
    "Car":     {name: "Carrascal",data: []},
    "Pros":    {name: "Prosperidad",data: []},
    "Bar":     {name: "Barobo",data: []},
    "Lia":     {name: "Liangga",data: []},
    "Tal":     {name: "Talacogon",data: []},
    "Hin":     {name: "Hinatuan",data: []},
    "Tan":     {name: "Tandag",data: []},
    "San Mig": {name: "San Miguel",data: []},
    "San Ag":  {name: "San Agustin",data: []},
    "Aras":    {name: "Aras-Asan",data: []},
    "Clav":    {name: "Claveria",data: []},
    "Mag":     {name: "Magpayang",data: []},
    "Bad":     {name: "Bad-as",data: []},
  },
  msg: "",

  sheetStatus2:   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], /// 0 = NONE, 1 = PREPARED, 2 = SAVING, 3 = SAVED, 4 ERROR
  allowedSheets2: ["ADMIN","TALACOGON","PROSPERIDAD","BAROBO","HINATUAN","LIANGA","SAN AGUSTIN","ARAS ASAN","SAN MIGUEL","TANDAG","MADRID",
                   "CARRASCAL","CLAVER","BAD-AS","MAGPAYANG","SANTIAGO","CABADBARAN","TUNGAO","BAYUGAN","BUTUAN"],
  sheets2: {
    "ADMIN":    {name: "ADMIN",data: []},
    "TALACOGON":    {name: "TALACOGON",data: []},
    "PROSPERIDAD":     {name: "PROSPERIDAD",data: []},
    "BAROBO":     {name: "BAROBO",data: []},
    "HINATUAN":     {name: "HINATUAN",data: []},
    "LIANGA":     {name: "LIANGA",data: []},
    "SAN AGUSTIN":     {name: "SAN AGUSTIN",data: []},
    "ARAS ASAN":     {name: "ARAS ASAN",data: []},
    "SAN MIGUEL":    {name: "SAN MIGUEL",data: []},
    "TANDAG":     {name: "TANDAG",data: []},
    "MADRID":     {name: "MADRID",data: []},
    "CARRASCAL":     {name: "CARRASCAL",data: []},
    "CLAVER":     {name: "CLAVER",data: []},
    "BAD-AS":     {name: "BAD-AS",data: []},
    "MAGPAYANG":     {name: "MAGPAYANG",data: []},
    "SANTIAGO": {name: "SANTIAGO",data: []},
    "CABADBARAN":  {name: "CABADBARAN",data: []},
    "TUNGAO":    {name: "TUNGAO",data: []},
    "BAYUGAN":    {name: "BAYUGAN",data: []},
    "BUTUAN":     {name: "BUTUAN",data: []},
  },
};


var temp, temp2;

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SHEET_STATUS:
      return {
        ...state,
        sheetStatus: action.sheetStatus
      }    
      
    case UPLOAD_STATUS_UPDATE:
      return {
        ...state,
        msg: action.msg
      }      

    case SET_SHEET_DATA:
      temp = {...state.sheets};
      temp[action.sheetName].data = [...action.data];
      temp2 = [...state.sheetStatus];
      temp2[action.ind] = 1;

      return {
        ...state,
        sheets: {...temp},
        sheetStatus: [...temp2],
      }      

    case UPDATE_SHEET_STATUS2:
      return {
        ...state,
        sheetStatus2: action.sheetStatus
      }    
      
    case UPLOAD_STATUS_UPDATE2:
      return {
        ...state,
        msg: action.msg
      }      

    case SET_SHEET_DATA2:
      temp = {...state.sheets2};
      temp[action.sheetName].data = [...action.data];
      temp2 = [...state.sheetStatus2];
      temp2[action.ind] = 1;

      return {
        ...state,
        sheets2: {...temp},
        sheetStatus2: [...temp2],
      }     

    default:
      return state

  }
}
