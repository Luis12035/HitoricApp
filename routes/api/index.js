var express = require('express');
var router = express.Router();

var historicRouter = require('./historic/index');
var secRouter = require('./sec/index');

const passport = require('passport');
const passportJWT = require('passport-jwt');
const extractJWT = passportJWT.ExtractJwt;
const strategyJWT = passportJWT.Strategy;

passport.use(
    new strategyJWT(
      {
        jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
      },
      (payload, next) => {
        // tienen la oportunidad de validaciones extras
        return next(null, payload);
      }
    )
  );

const jwtMiddleware = passport.authenticate('jwt', {session:false});

router.use(passport.initialize());
/* GET home page. */
router.get('/', (req, res, next)=>{
    res.status(200).json({"msg":"Api V1 JSON"});
});

router.use('/historic', jwtMiddleware,historicRouter);
router.use('/sec', secRouter);

module.exports = router;