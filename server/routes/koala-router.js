const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');
const bodyParser = require('body-parser');

router.get('/', function(request, response){
    const sqlText = 'SELECT * FROM koala ORDER BY id';
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

  router.delete('/:id', (request, response) => {
    const sqlText = `DELETE FROM koala WHERE id=$1`;
    const id =  request.params.id;
    pool.query(sqlText, [id]).then((result) => {
        console.log('Deleted Koala', id);
        response.sendStatus(200);
    }) // end success
    .catch((error) => {
        console.log('error in router.delete', error);
        response.sendStatus(500);
    })
  }) // end delete

  router.put('/:id', (request, response) => {
    const id = request.params.id;
    const sqlText = `UPDATE koala SET ready_to_transfer=$1 WHERE id=$2`;
    pool.query(sqlText, ['Y', id])
      .then((result) => {
        console.log(`Updated koala ${id} with status Y`);
        response.sendStatus(200);
      })
      .catch( (error) => {
        console.log('Error on update song');
        response.sendStatus(500);
      })
  }) // END router.PUT for /:id

  router.get('/:id', (request, response) => {
    const id = request.params.id;
    const sqlText = 'Select * FROM koala WHERE id=$1';
    pool.query(sqlText, [id])
    .then((result) => {
        console.log('found koala by id');
        response.send(result.rows);
    })
    .catch((error) => {
        console.log('error on get by id');
        response.sendStatus(500);
    })
  }) // end get by id


  router.put('/edit/:id', function(req, res) {
    const id = req.params.id;
    const newKoala = req.body;
    console.log(newKoala);
    
    const sqlText = `UPDATE koala SET name=$1, gender=$2, age=$3, ready_to_transfer=$4, notes=$5 WHERE id=$6`;
    pool.query(sqlText, [newKoala.name, newKoala.gender, newKoala.age, newKoala.ready_to_transfer, newKoala.notes, newKoala.id])
    .then(function(result) {
      res.sendStatus(200);
    }).catch(function(error){
      res.sendStatus(500);
    });
  }); // END router.PUT for /edit/:id















module.exports = router;