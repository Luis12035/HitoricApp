const express = require("express");
let router = express.Router();
const jwt = require("jsonwebtoken");

let SecModelClass = require('./sec.model.js');
let SecModel = new SecModelClass();

//const {v4: uuidv4, v4} = require('uuid');

router.post('/signin', async (req, res, next) => {
    try {
      const {email, pswd, name} = req.body;
      let userAdded = await SecModel.createNewUser(email, pswd, name);
      delete userAdded.password;
      console.log(userAdded);
      res.status(200).json({"msg":"Usuario Creado Satisfactoriamente"});
    } catch (ex) {
      res.status(500).json({ "msg": "Error" });
    }
});

module.exports = router;