const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');
const bodyParser = require('body-parser');

router.get('/', function(request, response){
    const sqlText = 'SELECT * FROM koala';
    pool.query(sqlText)
      // query was successful
      .then(function(result) {
        console.log('Get result:', result);
        response.send(result.rows);
      })
      // bad things could happen...
      .catch(function(error){
        console.log('Error on Get:', error);
        response.sendStatus(500);
      })
  })









module.exports = router;