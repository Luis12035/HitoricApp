var express = require('express');
var router = express.Router();
var HistoricDao = require('./historic.dao');
var Historic = new HistoricDao();

router.get('/all', async(req, res, next)=>{
    try {
        const allHistoricEntries = await Historic.getAll();
        return res.status(200).json(allHistoricEntries);
    } catch (ex) {
        console.log(ex);
        return res.status(500).json({msg:"Error al procesar petición"});
    }
});


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

        const nombre = "Luis";
        const result = await Historic.addNew(nombre, HistoryMeta)
        console.log(result);
        res.status(200).json({msg:"Agregado Satisfactoriamente"});
    } catch (ex) {
        console.log(ex);
        return res.status(500).json({ msg: "Error al procesar petición" });
    }
});

router.get('/getbyname/:name',async (req, res, next)=>{
    try {
        const {name} = req.params;
        const onehistoric = await Historic.getByName(name);
        return res.status(200).json(onehistoric);
    } catch (ex) {
        console.log(ex);
        return res.status(500).json({ msg: "Error al procesar petición" });
    }
})

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

module.exports = router;