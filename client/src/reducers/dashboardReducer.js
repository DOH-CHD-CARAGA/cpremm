import {
  SET_DASHBOARD_GRAPHS_DATA,
  SET_OFFICES_DEVICES_RECORDS_DASHBOARD,
} from '../actions/types';

const initialState = {
  data: {
    2020: {
      ALL : 0,
      "UNSET": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      ARD: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      "BAC SEC": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      BUDGET: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      CAO: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      CASHIER: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      COA: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      ENGAS: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      FHC: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      FINANCE: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      HEMS: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      HEPO: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      HFDU: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      HFEP: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      HPR: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      HRDU: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      INFECTIOUS: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      "KM-ICT": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      "LHS-GOV": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      "LHS-SEC": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      LIBRARY: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      "NON-COMM": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      "PDOHO-AD N": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      "PDOHO-ADS": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      "PDOHO-PDI": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      "PDOHO-SDN": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      "PDOHO-SDS": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      PHARMA: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      PLANNING: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      "PLANNING SUPPORT STAFF": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      PROCUREMENT: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      RD: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      RECORDS: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      RESU: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      RLED: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      SDN: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      SERVERS: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      STATISTICS: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      SUPPLY: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      TB: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      WAREHOUSE: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
    },
    other: {
      ALL: 0,
      "UNSET": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      ARD: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      "BAC SEC": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      BUDGET: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      CAO: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      CASHIER: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      COA: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      ENGAS: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      FHC: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      FINANCE: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      HEMS: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      HEPO: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      HFDU: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      HFEP: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      HPR: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      HRDU: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      INFECTIOUS: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      "KM-ICT": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      "LHS-GOV": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      "LHS-SEC": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      LIBRARY: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      "NON-COMM": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      "PDOHO-AD N": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      "PDOHO-ADS": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      "PDOHO-PDI": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      "PDOHO-SDN": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      "PDOHO-SDS": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      PHARMA: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      PLANNING: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      "PLANNING SUPPORT STAFF": {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      PROCUREMENT: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      RD: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      RECORDS: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      RESU: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      RLED: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      SDN: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      SERVERS: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      STATISTICS: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      SUPPLY: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      TB: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
      WAREHOUSE: {
        desktop: 0,laptop: 0,printer: 0,all: 0,
        
      },
    },

  },
  offices: {},
  numbers: {
    current: {
      waste: {
        total: 0,
        desktop: 0, laptop: 0, printer: 0, scanner: 0, avr: 0, ups: 0, monitor: 0, projector: 0
      },
      inUse: {
        total: 0,
        desktop: 0, laptop: 0, printer: 0, scanner: 0, avr: 0, ups: 0, monitor: 0, projector: 0
      },    
    },
    previous: {
      waste: {
        total: 0,
        desktop: 0, laptop: 0, printer: 0, scanner: 0, avr: 0, ups: 0, monitor: 0, projector: 0
      },
      inUse: {
        total: 0,
        desktop: 0, laptop: 0, printer: 0, scanner: 0, avr: 0, ups: 0, monitor: 0, projector: 0
      },    
    },
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
// ============================================ TRICYCLE ============================================
    case SET_DASHBOARD_GRAPHS_DATA:
      return {
        ...state,
        data: action.data
      }

    case SET_OFFICES_DEVICES_RECORDS_DASHBOARD:
      return {
        ...state,
        offices: action.data,
        numbers: action.numbers,
      }
  
    default:
      return state
  }
}
