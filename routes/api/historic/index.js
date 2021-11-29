var express = require('express');
var router = express.Router();
var HistoricDao = require('./historic.dao');
var Historic = new HistoricDao();

// Obtiene todos los Historicos ingresados
router.get('/all', async(req, res, next)=>{
    try {
        const allHistoricEntries = await Historic.getAll(req.user._id);
        return res.status(200).json(allHistoricEntries);
    } catch (ex) {
        console.log(ex);
        return res.status(500).json({msg:"Error al procesar petición"});
    }
});

// Agrega un Historico nuevo
router.post('/new', async(req, res, next)=>{
    try {

        const{
            Codigo,
            Clase,
            Año,
            Periodo,
            Nota
        } = req.body;
        
        let HistoryMeta = {
            Codigo: Codigo,
            Clase: Clase,
            Año: Año,
            Periodo: Periodo,
            Nota: Nota
        }
        
        const nombre = req.user.name;
        const result = await Historic.addNew(nombre, HistoryMeta, req.user._id)
        console.log(result);
        res.status(200).json({msg:"Agregado Satisfactoriamente"});
    } catch (ex) {
        console.log(ex);
        return res.status(500).json({ msg: "Error al procesar petición" });
    }
});

// Obtener datos de un Historico ingresado por el id
router.get('/getbyid/:id',async (req, res, next)=>{
    try {
        const {id} = req.params;
        const onehistoric = await Historic.getById(id);
        return res.status(200).json(onehistoric);
    } catch (ex) {
        console.log(ex);
        return res.status(500).json({ msg: "Error al procesar petición" });
    }
})

// Agrega un nuevo elemento a Historico 
router.put('/update/:id', async(req, res, next)=>{
    try {
        const{id} = req.params;
        const{
            Codigo,
            Clase,
            Año,
            Periodo,
            Nota
        } = req.body;

        var historicMetaKey = {
            Codigo: Codigo,
            Clase: Clase,
            Año: Año,
            Periodo: Periodo,
            Nota: Nota
        }
    
        const result = await Historic.addMetaTohistori(historicMetaKey, id);
        console.log(result);
        res.status(200).json({"msg":"Modificado OK"});
    } catch (ex) {
        console.log(ex);
        return res.status(500).json({ msg: "Error al procesar petición" });
    }
})

// Eliminar todo el historial ingresado 
router.delete('/delete/:id', async (req, res, next)=>{
    try {
      const {id} = req.params;
      const result = await Historic.deleteById(id);
      console.log(result);
      return res.status(200).json({"msg":"Eliminado OK"});
    } catch (ex) {
      console.log(ex);
      return res.status(500).json({ msg: "Error al procesar petición" });
    }
}); // delete

// Eliminar un elemento de historial 
  router.put('/deleteHistorialbyid/:id',async (req, res, next)=>{
    try {
        const {id} = req.params;
        const {objectId} = req.body;        
        const deleteHistoric = await Historic.deleteHistoric(id, objectId);
        //console.log(deleteHistoric);
        return res.status(200).json({msg: "Elemento eliminado correctamente"});
    } catch (ex) {
        console.log(ex);
        return res.status(500).json({ msg: "Error al procesar petición" });
    }
    })


module.exports = router;