import axios from "axios"
import env from "react-dotenv"

export default axios.create({
  baseURL: env.LIVE_DB_API,
  headers: {
    "Content-type": "application/json"||"multipart/form-data"||"image/png"
  }
})