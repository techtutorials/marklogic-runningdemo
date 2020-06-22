const express = require('express');
const router = express.Router();
const signToken = require('../helper/signToken');
//const userADGroups = require('../helper/userADGroups');
const assignRoles = require('../helper/assignRoles');
const bodyParser = require('body-parser')
const passport = require('passport');
const { dbConnect } = require('../db/db');
require("dotenv").config();
const redis = require("redis");
//Redis client
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const redisClient = redis.createClient(REDIS_PORT);
var moment = require('moment');


router.get('/',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL);
  }
);

router.post('/callback',
  bodyParser.urlencoded({ extended: false }),
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  async (req, res) => {
    try {
      const samlToken = req.body.SAMLResponse;
      if (samlToken === null || samlToken === "") {
        res.status(401).send('Not a valid SAML Token. Please contact admin.');
      }
      var user = req.user;
      //Store values in Redis
      var iat = moment(new Date()).format('YYYY MM DD hh:mm:ss.SSS');
      redisClient.hmset(user.email, "email", user.email, "role", user.role, "name", user.name, "samlToken", samlToken, "iat", iat);
      var signedToken = signToken(user);
      console.log(signedToken);
      res.cookie('jwtToken', signedToken, { maxAge: 900000, httpOnly: false });
      // res.redirect('/app');
      //create DB Connection. User is looged in
      await dbConnect(samlToken);
      res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      console.log(error)
    }
  }
);

module.exports = router;
