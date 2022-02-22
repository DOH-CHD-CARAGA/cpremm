require('dotenv').config()
const CryptoJS = require("crypto-js")

class Crypto{

    encrypt(text){
        var ciphertext = CryptoJS.AES.encrypt(text, process.env.SECURITY_KEY ).toString();
        return ciphertext
    }
   
    decrypt(text){
        try {
            var bytes  = CryptoJS.AES.decrypt(text, process.env.SECURITY_KEY)
            var originalText = bytes.toString(CryptoJS.enc.Utf8)
            return originalText
        } catch (err) {
            console.log(err)
        }
    }
}


export default new Crypto()