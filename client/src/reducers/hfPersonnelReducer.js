import {
  SET_HF_PERSONNELS,
  SET_SEARCHED_HF_PERSONNELS,
  ADD_NEW_HF_PERSONNEL,
  SET_HF_PERSONNEL_DETAIL,
  SET_HF_PERSONNEL_VALUE,
  SET_HF_PERSONNEL_DEFAULT,
  SET_HF_PERSONNEL_TO_UPLOAD,
  RESET_HF_PERSONNEL_UPLOAD,
  RESET_HF_PERSONNEL_UPLOAD_BOOL,
  SET_CEIR_DASHBOARD_NUMBERS,
  SET_UPLOAD_DETAILS_VALUE,
	SET_PROFESSION_CLASSIFICATION,
	SET_CATEGORY_CLASSIFICATION,
  SET_HF_PERSONNEL_HEALTH_FACILITIES,
} from '../actions/types';
import { SetRegValueHelper, SpreadOps } from './reducer-helper';

const initialState = {

  facilities: {
    adn: ["AMPAYON MAIN HEALTH CENTER", "ARSENIA CENTENO MUNICIPAL HEALTH CENTER (Santiago)", "Agusan Del Norte Provincial Hospital", "BUENAVISTA RHU", "BUTUAN DOCTORS' HOSPITAL", "BUTUAN MEDICAL CENTER", "Butuan City Health Office", "Butuan Puericulture Center No. 394, Inc. E.R.Ochoa Memorial and Maternity General Hospital", "CABADBARAN CITY HEALTH OFFICE", "CARAGA HOSPITAL INFANT CARE AND LYING IN CENTER", "CARMEN RHU", "CLINICA JESUS NAZARENO", "Cabadbaran District Hospital", "DOH-CHD Caraga", "DUAY HOSPITAL", "HOLY CHILD COLLEGES OF BUTUAN HOSPITAL", "JABONGA COMMUNITY INFIRMARY", "JABONGA MHO", "JABONGA MUNICIPAL HOSPITAL", "KITCHARAO RHU", "Kitcharao District Hospital", "LAS NIEVES RHU", "LIBERTAD MAIN HEALTH CENTER", "Las Nieves Municipal Hospital", "MAGALLANES RHU AND FAMILY PLANNING CENTER", "MANUEL J. SANTOS HOSPITAL", "NASIPIT RHU AND FAMILY PLANNING CENTER", "Nasipit District Hospital", "OBRERO POB. (BGY. ) MAIN HEALTH CENTER", "PDOHO", "PNP HOSPITAL REGION 13", "Provincial Health Office", "RTR RHU AND FAMILY PLANNING CENTER", "ST. ANNE CLINIC", "ST. JOSEPH INFIRMARY", "TUBAY RHU"],
    ads: ["BAYUGAN CITY DOCTOR'S HOSPITAL", "Bayugan Community Hospital", "Bayugan JM Yap Sto. Niño Hosp.", "Bayugan RHU", "Bunawan District Hospital", "Bunawan MHO", "D.O. Plaza Memorial Hospital", "Esperanza MHO", "Esperanza Medicare Community Hospital", "Franco Clinic and Hospital", "La Paz MHO", "La Paz Municipal Hospital", "Loreto District Hospital", "Loreto RHU", "PDOHO", "Philsaga Mining Hospital", "Prosperidad RHU", "Provincial Health Office", "Rosario MHO", "San Francisco Doctor’s Hospital", "San Francisco RHU", "San Luis RHU", "Sibagat RHU", "Sta. Josefa MHO", "Talacogon District Hospital", "Talacogon RHU", "Trento RHU", "Veruela RHU"],
    sdn: ["Surigao Doctors Hospital", "ALEGRIA RHU", "BACUAG RHU", "BURGOS RHU", "CLAVER RHU", "Caraga Regional Hospital", "DAPA RHU", "DEL CARMENT DISTRICT HOSPITAL", "DTRC - ANOMAR, SURIGAO CITY", "GENERAL LUNA RHU", "GIGAQUIT RHU", "Gigaquit Municipal Hospital", "LUNA DISTRICT BIRTHING HOME AND TB DOTS CENTER", "MAINIT RHU", "MALIMONO RHU AND BIRTHING FACILITY", "Mainit Medicare Community Hospital", "Malimono District Hospital", "Miranda Family Hospital", "PDOHO", "PHO Surigao del Norte", "PILAR RHU", "PLACER RHU", "RHU DEL CARMEN", "SAN BENITO RHU", "SAN FRANCISCO RHU", "SAN ISIDRO RHU", "SAN JUAN DISTRICT HEALTH CENTER", "SANTA MONICA RHU", "SISON RHU", "SOCORRO RHU", "Siargao District Hospital", "Socorro District Hospital", "St. Paul Surigao University Hospital", "Surigao CHO", "Surigao Del Norte Provincial Hospital", "Surigao Medical Center, Inc.", "TAFT DISTRICT HEALTH CENTER", "TAGANA-AN RHU", "TUBOD RHU", "WASHINGTON DISTRICT HEALTH CENTER"],
    sds: ["ANDRES SORIANO MEMORIAL HOSPITAL - COOPERATIVE", "Adela Serra Ty Memorial Medical Center", "BAROBO MHO", "BAYABAS MUNICIPAL HEALTH AND SANITATION OFFICE", "BISLIG CITY HEALTH OFFICE", "Bislig District Hospital", "CAGWAIT MHO", "CARMEN RHU", "CARRASCAL RHU", "Cantilan MHO AND FAMILY PLANNING CENTER", "Carrascal Primary Health Care", "Cortes Municipal Hospital", "Cortes RHU", "F.P. URBIZTONDO MEDICAL HOSPITAL, INC.", "FAMILY MEDICAL CLINIC", "Hinatuan District Hospital", "Hinatuan RHU", "ISIDRO M. OLAN SR. MEDICAL CLINIC AND HOSPITAL", "LANUZA RHU", "LIANGA MHO", "LINGIG MHO AND BIRTHING FACILITY", "Lianga District Hospital", "Lingig Community Hospital", "MADRID RHU AND FAMILY PLANNING CENTER", "MANGAGOY CITY HEALTH OFFICE", "MARIHATAG MHO", "Madrid District Hospital", "Marihatag District Hospital", "PDOHO", "POBLACION BISLIG HEALTH CENTER", "Provincial Health Office", "SAN AGUSTIN MHO", "SAN MIGUEL COMMUNITY HOSPITAL", "SAN MIGUEL MHO AND REPRODUCTIVE HEALTH CENTER", "TABON MAIN HEALTH CENTER", "TAGBINA RHU AND FAMILY PLANNING CENTER", "TAGO RHU", "TANDAG CHO"],
    pdi: ["Albor District Hospital", "BASILISA RHU AND REPRODUCTIVE HEALTH CENTER AND BIRTHING FACILITY", "CAGDIANAO MUNICIPAL HEALTH CENTER", "DINAGAT RHU", "Dinagat District Hospital", "LIBJO RURAL HEALTH AND FAMILY PLANNING CENTER", "LORETO MUNICIPAL HEALTH OFFICE", "Loreto District Hospital", "PDOHO", "Provincial Health Office", "SAN JOSE RHU", "TUBAJON RURAL HEALTH AND FAMILY PLANNING CENTER"],
  },
  facilities2: {

  },

  hfPersonnels: [],
  searched: [],
  toDisplay: [],
  gCount: 0,
  sCount: 0,
  count: 0,
  page: 1,
  hfPersonnel: {},

  uploadDetails: {
    province: "adn",
    facility: "",
  },
  toUpload: [],
  resetUpload: false,
  
  allCount: {
    adn: { hf: 0, hw: 0 },
    ads: { hf: 0, hw: 0 },
    sdn: { hf: 0, hw: 0 },
    sds: { hf: 0, hw: 0 },
    pdi: { hf: 0, hw: 0 },
    total: { hf: 0, hw: 0 },
  },

  professions: {
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
  },

  categories: {
    "01_Health_Care_Worker": 0,
    "02_Senior_Citizen": 0,
    "03_Indigent": 0,
    "04_Uniformed_Personnel": 0,
    "05_Essential_Worker": 0,
    "06_Other": 0,
    "Unset": 0,
  },

  hfPersonnelDefault: {

    hfPersonnelID : "",
    category : "",
    categoryID : "",
    categoryIDNumber : "",
    philHealthID : "",
    pwdID : "",
    name : {
      first: "",
      mid: "",
      last: "",
      suffix: "",
    },
    contactNo : "",
    address : {
      fullAddress: "",
      region: "",
      province: "",
      munCity: "",    
      barangay: "",    
    },
    sex : "",
    birthdate : new Date(),
    status : "",
    employment : {
      employed: "",
      profession: "",
      employerName: "",
      employerLGU: "",
      employerAddress: "",
      contactNo: "",
    },
    covidDetails: {
      directCovid: "",
      covidHistory: "",
      covidDate: new Date(),
      classification: "",
    },
  
    allergy: {
      drug: "",
      food: "",
      insect: "",
      latex: "",
      mold: "",
      pet: "",
      pollen: "",
    },
  
    comorbidities: {
      with: "",
      hypertension: "",
      heartDisease: "",
      kidneyDisease: "",
      diabetesMellitus: "",
      bronchialAsthma: "",
      immunodeficiencyStatus: "",
      cancer: "",
      others: "",
    },
    
    pregStatus: "",
    consent: "",
  
  },

};

var temp = '';
initialState.hfPersonnel = SpreadOps({...initialState.hfPersonnelDefault});

export default function(state = initialState, action) {
  switch (action.type) {

    case SET_HF_PERSONNEL_HEALTH_FACILITIES:
      console.log("____________________AAA__________________");
      console.log(action);
      var facilities = {
        adn: [],
        ads: [],
        sdn: [],
        sds: [],
        pdi: [],
      };
      var data = [...action.data.healthFacilitys];
      for (let x = 0, len = data.length; x < len; x++) {
        if (data[x].province == "Agusan Del Norte") {
          facilities.adn.push({
            _id: data[x]._id,
            name: data[x].name,
          })
        } else if (data[x].province == "Agusan Del Sur") {
          facilities.ads.push({
            _id: data[x]._id,
            name: data[x].name,
          })
        } else if (data[x].province == "Province of Dinagat Islands") {
          facilities.pdi.push({
            _id: data[x]._id,
            name: data[x].name,
          })
        } else if (data[x].province == "Surigao Del Norte") {
          facilities.sdn.push({
            _id: data[x]._id,
            name: data[x].name,
          })
        } else if (data[x].province == "Surigao Del Sur") {
          facilities.sds.push({
            _id: data[x]._id,
            name: data[x].name,
          })
        }
      }

      return {
        ...state,
        facilities2: {...facilities}
      }

    case SET_PROFESSION_CLASSIFICATION:
      return {
        ...state,
        professions: action.professions,
      }

    case SET_CATEGORY_CLASSIFICATION:
      return {
        ...state,
        categories: action.categories,
      }
      
    case SET_HF_PERSONNEL_TO_UPLOAD:
      return {
        ...state,
        toUpload: action.toUpload,
      }

    case SET_CEIR_DASHBOARD_NUMBERS:
      return {
        ...state,
        allCount: action.numbers,
      }
  
    case SET_SEARCHED_HF_PERSONNELS:
      return {
        ...state,
        searched: action.data.hfPersonnels,
        toDisplay: action.data.hfPersonnels,
        sCount: action.data.count,
        count: action.data.count,
        page: action.page
      }

    case SET_HF_PERSONNELS:
      return {
        ...state,
        hfPersonnels: (action.data)?action.data.hfPersonnels:state.hfPersonnels,
        toDisplay: (action.data)?action.data.hfPersonnels:state.hfPersonnels,
        gCount: (action.data)?action.data.count:state.gCount,
        count: (action.data)?action.data.count:state.gCount,
        page: (action.page)?action.page:1
      }

    case ADD_NEW_HF_PERSONNEL:
      return {
        ...state,
        hfPersonnels: [action.data, ...state.hfPersonnels],
        toDisplay: [action.data, ...state.hfPersonnels],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_HF_PERSONNEL_DETAIL:
      return {
        ...state,
        hfPersonnel: {...action.detail.hfPersonnel[0]}
      }

    case SET_HF_PERSONNEL_VALUE:
      temp = {...state.hfPersonnel};
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);
      return {
        ...state,
        hfPersonnel: {...temp}
      }

    case SET_HF_PERSONNEL_DEFAULT:
      return {
        ...state,
        hfPersonnel: SpreadOps({...state.hfPersonnelDefault}),
      }

    case RESET_HF_PERSONNEL_UPLOAD:
      return {
        ...state,
        toUpload: [],
        uploadDetails: {
          province: "adn",
          facility: "",
        },
      }    

    case RESET_HF_PERSONNEL_UPLOAD_BOOL:
      return {
        ...state,
        resetUpload: action.bool
      }    

    case SET_UPLOAD_DETAILS_VALUE:
      temp = {...state.uploadDetails};
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);
      return {
        ...state,
        uploadDetails: {...temp}
      }
  

    default:
      return state

  }
}
