import env from "react-dotenv"

const CryptoJS = require("crypto-js")

class Crypto{

    encrypt(text){
        try {
            const hashed = CryptoJS.AES.encrypt(text, env.SECURITY_KEY).toString();
            return hashed
        } catch (err) {
            console.log(err.message)
        }
    }
   
    decrypt(text){
        try {
            var bytes  = CryptoJS.AES.decrypt(text, env.SECURITY_KEY)
            var originalText = bytes.toString(CryptoJS.enc.Utf8)
            return originalText
        } catch (err) {
            console.log(err)
        }
    }
}


export default new Crypto()