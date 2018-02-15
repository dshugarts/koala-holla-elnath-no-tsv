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


  router.post('/', (request, response) => {
    const koala = request.body;
    console.log('Add koala:', koala);
  
    const sqlText = `INSERT INTO koala 
        (name, gender, age, ready_to_transfer, notes)
        VALUES ($1, $2, $3, $4, $5)`;
    pool.query(sqlText, 
        [koala.name, koala.gender, koala.age, koala.ready_to_transfer, koala.notes])
      .then( (result) => {
        console.log('Added koala:', result);
        response.sendStatus(201);
        response.send(result.rows);
      })
      .catch( (error) => {
        console.log('Error adding joke:', error);
        response.sendStatus(500);
      })
  })








module.exports = router;