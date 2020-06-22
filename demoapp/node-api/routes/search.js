const express = require('express');
const router = express.Router();
const { getOptions } = require('../db/db');
const { searchText } = require('../db/search');
// const {checkJWTAuthentication} = require ('./../middleware/auth');
const passport = require('passport');


router.get('/', passport.authenticate('jwt', { session: false }), async function (req, res, next) {
  try {
    //console.log(await getOptions());
    //await is required before getOptions so that it could get SAML token from Redis
    console.log("1111111111111");
    // const db = marklogic.createDatabaseClient(await getOptions());
    //await is required here so that we could get response. It appears that Marklogic query APIs are returning promise
    const searchTerm = req.query.searchTerm
    if (searchTerm) {
      const response = await searchText(searchTerm);
      return res.send({ searchResult: response });
    }
    res.send({ searchResult: [] })
  } catch (error) {
    console.log(error)
  }
});

// });
module.exports = router;
