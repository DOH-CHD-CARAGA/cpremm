import axios from "axios"
// eslint-disable-next-line
import env from "react-dotenv"

const JWT = localStorage.getItem("CPreMM_JWT")

const CPreMM_API =  axios.create({
  baseURL: "https://dohcaraga.org/server/api",//env.PORTAL_DB_API,
  headers: {
    "Content-type": "application/json",
    "Authorization": "Bearer "+ JWT
  }
})

class CPreMMAPI {
    
    getUser(name){
        return CPreMM_API.post('/portal/get/users', { name: name.toLowerCase().replace(" ", ".") })
    }

    getDevices(useSerial, serial, propertyCode){
      return CPreMM_API.post(`/portal/get/devices/${useSerial}`, { serial: serial, propertyCode: propertyCode })
    }
    
    getUsersDevice(userID){
      return CPreMM_API.get(`/portal/get/devices/${userID}` )
    }

    getTempJobOrderRequest(status){
      return CPreMM_API.get(`/portal/get/temp/jobRequest/${status}`)
    }

    createTempJobOrderRequest(dataToCreate){
      return CPreMM_API.post(`/portal/create/temp/jobRequest`, dataToCreate)
    }

    updateTempJobOrderRequest(_id, status){
      return CPreMM_API.post(`/portal/update/temp/jobRequest/${_id}/${status}`)
    }

    login(values){
      return CPreMM_API.post(`/user/login`, values)
    }

    checkAuth(){
      return CPreMM_API.post(`/portal/checkAuth`)
    }

    addToJobOrderRequestLiveData(dataToAdd){
      return CPreMM_API.post(`/portal/add/liveData/jobRequest`, dataToAdd)
    }

    //Dashboard
    getDashboardChart(){
      return CPreMM_API.get(`/portal/dashboard/chart`)
    }

    getWastedDevices(){
      return CPreMM_API.get(`/portal/dashboard/wasted`)
    }
}

export default new CPreMMAPI()