var conn = require('../../../utils/dao');
var ObjectID = require('mongodb').ObjectId;
var _db;

class Historic{
    historicColl = null;
    constructor(){
        this.initModel();
    }

    //Iniciador del modelo
    async initModel(){
        try{
            _db = await conn.getDB();
            this.historicColl = await _db.collection("historial");
        }catch(ex){
            console.log(ex);
            process.exit(1);
        }
    }

    //Peticion asincrona para obtener todos los datos de la coleccion
    async getAll(id){
        const filter = {"user_id": new ObjectID(id)}
        console.log(filter)
        let historics = await this.historicColl.find(filter);
        return historics.toArray();
    }

    //peticion asincrona para agregar un nuevo documento
    async addNew(nombre, historyMetaobjet,id){
        var historial = [];
        historial.push(historyMetaobjet)
        let newHistory = {
            nombre: nombre,
            historial,
            user_id: new ObjectID(id)
        }
        let result = await this.historicColl.insertOne(newHistory);
        return result;
    }

    async addMetaTohistori(historicMetaKey, id){
        let filter = {"_id": new ObjectID(id)};
        let updateJson = {
           "$push" : {"historial": historicMetaKey}
        };
        let result = await this.historicColl.updateOne(filter,updateJson);
        return result;
    }

    async getById(id){
        const filter = {"_id": new ObjectID(id)};
        let historicDocument = await this.historicColl.findOne(filter);
        return historicDocument;
    }

    async deleteById(id) {
        // elimina los datos agregados por id de usuario
        let filter = { "_id": new ObjectID(id) };
        let result = await this.historicColl.deleteOne(filter);
        return result;
      }

      async deleteHistoric(id, objectId) {
        // elimina un elemento de historial
        let filter = { "_id": new ObjectID(id) };
        let updateJson = {
            "$pop" : {"historial": -objectId}
         };
        let result = await this.historicColl.updateOne(filter, updateJson);
        return result;
      }


}

module.exports = Historic;