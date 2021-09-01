import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import userReducer from './userReducer';
import logReducer from './logReducer';
import socketReducer from './socketReducer';
import roleReducer from './roleReducer';
import fileUploadReducer from './fileUploadReducer';
import officeReducer from './officeReducer';
import recordReducer from './recordReducer';
import recordNewReducer from './recordNewReducer';
import searchReducer from './searchReducer';
import dashboardReducer from './dashboardReducer';
import deviceReducer from './deviceReducer';
import userCommentReducer from './userCommentReducer';
import jobOrderRequestReducer from './jobOrderRequestReducer';
import appModuleReducer from './appModuleReducer';
import hfPersonnelReducer from './hfPersonnelReducer';
import DOHCHDPersonnelReducer from './DOHCHDPersonnelReducer';
import duplicateReducer from './duplicateReducer';
import annex_aReducer from './annex_aReducer';
import healthFacilityReducer from './healthFacilityReducer';
import vaccinationSitesReducer from './vaccinationSitesReducer';
import prePostMonitoringReducer from './prePostMonitoringReducer';
import confirmReducer from './confirmReducer';
import vasReportReducer from './vasReportReducer';
import sampleReducer from './sampleReducer';
//=================~import reducer file~=================

export default combineReducers({
  alert: alertReducer,
  socket: socketReducer,
  log: logReducer,
  user: userReducer,
  role: roleReducer,
  fileUpload: fileUploadReducer,
  office: officeReducer,
  record: recordReducer,
  recordNew: recordNewReducer,
  search: searchReducer,
  dashboard: dashboardReducer,
  device: deviceReducer,
  userComment: userCommentReducer,
  jobOrderRequest: jobOrderRequestReducer,
  appModule: appModuleReducer,
  hfPersonnel: hfPersonnelReducer,
  DOHCHDPersonnel: DOHCHDPersonnelReducer,
  duplicate: duplicateReducer,
  annex_a: annex_aReducer,
  healthFacility: healthFacilityReducer,
  vaccinationSites: vaccinationSitesReducer,
  prePostMonitoring: prePostMonitoringReducer,
  confirm: confirmReducer,
  vasReport: vasReportReducer,
  sample: sampleReducer,
  //=================~combine reducer file~=================
});

