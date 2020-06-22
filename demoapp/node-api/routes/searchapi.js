const axios = require('axios');
const express = require('express');
const router = express.Router();
const { getOptions } = require('../db/db');
const { searchText } = require('../db/search');
const marklogic = require('marklogic');
const qb = marklogic.queryBuilder;


const passport = require('passport');


router.get('/',  async function (req, res, next) {
  await axios.get('https://127.0.0.1:8060/v1/search?q=emtn')
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
});

module.exports = router;
