import liveDB from "./liveDB"

class API {
    
    getDevices(){ 
        return liveDB.get(`/device/get`)
    }
}

export default new API()