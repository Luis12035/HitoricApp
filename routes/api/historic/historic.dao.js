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
    async getAll(){
        let historics = await this.historicColl.find({});
        return historics.toArray();
    }

    //peticion asincrona para agregar un nuevo documento
    async addNew(nombre, historyMetaobjet){
        var historial = [];
        historial.push(historyMetaobjet)
        let newHistory = {
            nombre: nombre,
            historial
        }
        let result = await this.historicColl.insertOne(newHistory);
        return result;
    }

    async addMetaTohistori(historicMetaKey, id){
        let filter = {"_id": new ObjectID(id)};
        console.log(id, " ", historicMetaKey)
        
        let updateJson = {
           "$push" : {"historial": historicMetaKey}
        };
        let result = await this.historicColl.updateOne(filter,updateJson);
        return result;
    }

    async getByName(nombre){
        const filter = {"_id": new ObjectID(nombre)};
        let historicDocument = await this.historicColl.findOne(filter);
        return historicDocument;
    }
}

module.exports = Historic;