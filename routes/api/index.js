var express = require('express');
var router = express.Router();

var historicRouter = require('./historic/index');
var secRouter = require('./sec/index');

/* GET home page. */
router.get('/', (req, res, next)=>{
    res.status(200).json({"msg":"Api V1 JSON"});
});

router.use('/historic',historicRouter);
router.use('/sec', secRouter);

module.exports = router;