var conn = require('../../../utils/dao');
var objectID = require('mongodb').ObjectId;
const bcrypt = require("bcryptjs");
var _db;

class Sec{
    secColl = null;
    
    constructor(){
        this.initModel();
    }

    async initModel(){
        try {
            _db = await conn.getDB();
            this.secColl = await _db.collection("users");
        } catch (ex) {
            console.log(ex);
            process.exit(1);
        }
    }

    //Peticion para obtener usuarios filtrando por el email
    async getByEmail(email){
        const filter = {"email": email};
        return await this.secColl.findOne(filter);
    }

    //Peticion para crear un nuevo usuario
    async createNewUser( email, password, name) {
        try {
          let user = {
            email: email,
            name: name,
            password: await bcrypt.hash(password, 10),
            lastlogin: null,
            lastpasswordchange: null,
            passwordexpires: new Date().getTime() + (90 * 24 * 60 * 60 * 1000), 
            oldpasswords: [],
            roles:["public"]
          }
          let result = await this.secColl.insertOne(user);
          //console.log(result);
          return result;
        } catch(ex) {
          console.log(ex);
          throw(ex);
        }
    }

    //Peticion para comparar las contraseñas
    async comparePassword (rawPassword, dbPassword){
        return await bcrypt.compare(rawPassword, dbPassword);
      }

}

module.exports = Sec;