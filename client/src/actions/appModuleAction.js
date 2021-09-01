import {
  TOGGLE_ALERT,
  CHANGE_ALERT,
  SET_APP_MODULE_DETAIL,
  SET_APP_MODULE_DEFAULT,
  SET_APP_MODULES,
} from './types';
import { SERVER_API, JWT } from '../config';
import axios from 'axios';

export const SetAppModuleDetail = (id) => (dispatch, getState) => {

  const { toDisplay } = getState().appModule;

  const appModule = toDisplay.filter((appModule) => appModule._id == id);

  dispatch({
    type: SET_APP_MODULE_DETAIL,
    detail: {
      appModule: [...appModule]
    }
  })
}

export const SetAppModuleDefault = () => (dispatch) => {
  dispatch({
    type: SET_APP_MODULE_DEFAULT,
  })
}


export const UpdateSchemaCount = (type = "+", ind) => (dispatch, getState) => {

  var { appModule } = getState().appModule;

  if (type == "+") {
    appModule.schemas.push({
      name: "",
      fieldName: "",
      description: "",
      type: "String",
      defaultValue: "",
    });
  } else if (type == "-") {
    appModule = {
      ...appModule,
      schemas: appModule.schemas.filter((appModule, i) => i != ind)
    }
  
  }
  
  dispatch({
    type: SET_APP_MODULE_DETAIL,
    detail: {
      appModule: [{...appModule}]
    }
  })
}

export const arrangeFieldName = (name) => (dispatch, getState) => {
  var split = name.split(" ");
  var fieldName = split[0];
  for (let x = 0; x < split.length; x++) {
    if (x > 0 && split[x] != "") {
      fieldName += "" + split[x][0].toUpperCase() + split[x].toLowerCase().slice(1, split[x].length)
    }
  }
  return fieldName;
}

export const addAppModule = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: "loading",
    msg: "Adding App Module"
  })

  const { appModule, appModules, gCount } = getState().appModule;

  var schemas = [];
  appModule.schemas.map((schema, i) => {
    schemas.push({
      name: schema.name,
      type: schema.type,
      fieldName: schema.fieldName||arrangeFieldName(schema.name)(),
      description: schema.description,
      defaultValue: schema.defaultValue,
    })
  });

  return new Promise((resolve, reject) => {
    axios({
      url: `${SERVER_API}/admin/appModule/new`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        appModule: {
          name: appModule.name,
          moduleType: appModule.moduleType,
          description: appModule.description,
          schemas: schemas,
        }
      }
    })
    .then((res) =>{

      if (res.data.status){

        appModules.unshift({...res.data.appModule});
        if (gCount > 10){
          appModules.pop();
        }
        
        dispatch({
          type: SET_APP_MODULES,
          data: {
            appModules: [...appModules],
            count: gCount + 1,
          }
        })
        

        dispatch({
          type: CHANGE_ALERT,
          resType: "success",
          msg: "App Module Successfully Added"
        })
      }else {
        dispatch({
          type: CHANGE_ALERT,
          resType: 'failed',
          msg: 'Failed to Add App Module'
        })
      }
      
      
    })
    .catch(err => {
      reject(err);
    })
  })
}

export const updateAppModule = () => (dispatch, getState) => {

  dispatch({
    type: TOGGLE_ALERT,
    resType: "loading",
    msg: "Updating AppModule"
  })

  const { appModule, gCount } = getState().appModule;
  const appModules = [...getState().appModule.appModules];

  return new Promise((resolve, reject) => {
    axios({
      url: `${SERVER_API}/admin/appModule/update`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        appModule: {...appModule}
      }
    })
    .then((res) =>{
      if (res.data.status){

        appModules.map((r) => {
          if (appModule._id == r._id) {
            r.name = appModule.name;
            r.routes = appModule.routes;
          }
          return r;
        });
      
        dispatch({
          type: SET_APP_MODULES,
          data: {
            appModules: [...appModules],
            count: gCount,
          }
        })
      
        dispatch({
          type: CHANGE_ALERT,
          resType: "success",
          msg: "AppModule Successfully Updated"
        })
        
      }else {

        dispatch({
          type: CHANGE_ALERT,
          resType: "failed",
          msg: "Failed to Updated AppModule"
        })
        
      }


      
    })
    .catch(err => {
      reject(err);
    })
  })
  
}

export const generateAppModule = () => (dispatch, getState) => {

  const { appModule } = getState().appModule;


  axios({
    url: `${SERVER_API}/admin/appModule/generate`,
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(JWT)}`
    },
    data: {
      id: appModule._id
    }
  })
    .then(res => {
      console.log(":::::::::}}}}||||||");
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
}



