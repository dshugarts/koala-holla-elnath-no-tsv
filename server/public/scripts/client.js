console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();
  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    var objectToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      ready_to_transfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val()
    };
    // call saveKoala with the new obejct
    saveKoala( objectToSend );
  }); //end addButton on click

  $('#viewKoalas').on('click', '.deleteBtn', function() {
    const koalaId = $(this).data('id');
    deleteKoala(koalaId);
  }) // END .deleteBtn click

  $('#viewKoalas').on('click', '.transfer-btn', function() {
    let id = $(this).data('id');
    updateTransfer(id);
  }) // END .transfer-btn click

  $('#viewKoalas').on('click', '.editBtn', function() {
    let id = $(this).data('id');
    $(this).hide();
    $(`.editButtons${id} `).append($('<button>').addClass('saveEdit').data('id', id).text('finish'));
    prepareForEdit(id); 
  }); // END .editBtn click

  $('#viewKoalas').on('click', '.saveEdit', function(){
    let id = $(this).data('id');
    console.log(id);
    
    newKoala = {
      id: $(this).data('id'),
      name: $(`#tr${id} .name #nameIn`).val(),
      gender: $(`#tr${id} .gender #genderIn`).val(),
      age: $(`#tr${id} .age #ageIn`).val(),
      ready_to_transfer: $(`#tr${id} .ready_to_transfer #readyForTransferIn`).val(),
      notes: $(`#tr${id} .notes #notesIn`).val(),
    }
    if(newKoala.ready_to_transfer === '-'){
      alert('be sure to mark whether or not this Koala is ready to transfer!');
    } else {
      updateKoala(newKoala);
    }
    
  }); // END .saveEdit onclick
}); // END document.ready

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koala',
    type: 'GET',
    success: function( data ){
      console.log( 'got some koalas: ', data );
        // display on DOM with buttons that allow edit of each
        displayKoalas(data);
    } // END success
  }); //END ajax
} // END getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koala',
    type: 'POST',
    data: newKoala,
    success: function( data ){
      console.log( 'got some koalas: ', data );
      getKoalas();
      $('#nameIn').val('');
      $('#ageIn').val('');
      $('#genderIn').val('');
      $('#readyForTransferIn').val('');
      $('#notesIn').val('');
      getKoalas();
    } // end success
  }); //end ajax
} // END saveKoala()

function displayKoalas(koalas) {
  let $tableBody = $('#viewKoalas');
  $tableBody.empty();
  for(let row=0; row<koalas.length; row++) {
    let keys = Object.keys(koalas[row]);
  
    let $tr = $('<tr>').attr('id', `tr${row + 1}`);
    for(let col=0; col<keys.length + 2; col++) {
        //$tr.append($('<td>').attr('id', keys[col]).text(koalas[row][keys[col]]), $('<button>').data('id', koalas[row].id).addClass('transfer-btn').text('Ready for Transfer')[0]);
        if(col === keys.length){
          $tr.append($('<td>').addClass(keys[col]).append($('<button>').data('id', koalas[row].id).text('Delete').addClass('deleteBtn')));
        } else if (col === keys.length +1) {
          $tr.append($('<td>').addClass(`editButtons${row+1}`).append($('<button>').data('id', koalas[row].id).text('Edit Koala').addClass('editBtn')));
        } else {
          $tr.append($('<td>').addClass(keys[col]).text(koalas[row][keys[col]])[0]);
        }
    } // end col loop
    $tableBody.append($tr);
    if($('.ready_to_transfer:last').text() === 'N' ){
      $('.ready_to_transfer:last').append($('<button>').data('id', koalas[row].id).addClass('transfer-btn ml-2').text('Ready for Transfer')[0]);
    }
  } // end row loop
} // end displayKoalas

function deleteKoala(id) {
  $.ajax({
    type: 'DELETE',
    url: `/koala/${id}`,
  }) // end AJAX
  .done((response) => {
    console.log('Koala deleted');
    getKoalas();
  }) // end done
  .fail((error) => {
    console.log('error', error);
  }) // end fail
} // end deleteKoala

function updateTransfer(id) {
  $.ajax({
    type: 'PUT',
    url: `/koala/${id}`,
    data: {id}
  }) // end AJAX
  .done(function (response) {
    console.log('Updated koala transfer status');
    getKoalas();
  }) // end done
  .fail(function (error){
    console.log(error);
  }) // end fail
} // end updateTransfer


function updateKoala(newKoala) {
  $.ajax({
    type: 'PUT',
    url: `koala/edit/${newKoala.id}`, // this is the ID of the koala we want to change in the database
    data: newKoala,
  }).done(function(response){
    console.log(response);
    getKoalas();
  }).fail(function(error){
    console.log(error); 
  }); // END ajax PUT
} // end updateTransfer


 // write a function that converts all of the table fields into input fields
    //  - each input will hold the current table cell data as a value that can be edited
function prepareForEdit(id){
  let name = $(`#tr${id} .name`).text();
  let gender = $(`#tr${id} .gender`).text();
  let age = $(`#tr${id} .age`).text()
  let readyForTransfer = $(`#tr${id} .ready_to_transfer`).text();
  let notes = $(`#tr${id} .notes`).text();

  $(`#tr${id} .name`).empty().append($('<input>').attr({ 'type':'text', 'id':'nameIn' }).val(name));
  $(`#tr${id} .gender`).empty().append($(`<select>`).attr({ 'id': 'genderIn' }).append($('<option>').val('Other').text('Other'), $('<option>').val('M').text('M'), $('<option>').val('F').text('F')));
  $(`#tr${id} .age`).empty().append($('<input>').attr({ 'type':'number', 'id':'ageIn' }).val(age));
  $(`#tr${id} .ready_to_transfer`).empty().append($(`<select>`).attr({ 'id': 'readyForTransferIn', 'value': readyForTransfer }).append($('<option>').val('-').text('-'), $('<option>').val('Y').text('Y'), $('<option>').val('N').text('N')));
  $(`#tr${id} .notes`).empty().append($('<input>').attr({ 'type':'text', 'id':'notesIn' }).val(notes));
} // END prepareForEdit()

