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
  }) // end delete koala
}); // end doc ready

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
    } // end success
  }); //end ajax

} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koala',
    type: 'POST',
    data: newKoala,
    success: function( data ){
      console.log( 'got some koalas: ', data );
      $('#nameIn').val('');
      $('#ageIn').val('');
      $('#genderIn').val('');
      $('#readyForTransferIn').val('');
      $('#notesIn').val('');
      getKoalas();
    } // end success
  }); //end ajax
}

function displayKoalas(koalas) {
  let $tableBody = $('#viewKoalas');
  $tableBody.empty();
  for(let row=0; row<koalas.length; row++) {
    let keys = Object.keys(koalas[row]);

    let $tr = $('<tr>');
    for(let col=0; col<keys.length; col++) {
        //$tr.append($('<td>').attr('id', keys[col]).text(koalas[row][keys[col]]), $('<button>').data('id', koalas[row].id).addClass('transfer-btn').text('Ready for Transfer')[0]);
        $tr.append($('<td>').addClass(keys[col]).text(koalas[row][keys[col]])[0]);
      
    } // end col loop
    $tr.append($('<button>').data('id', koalas[row].id).text('Delete').addClass('deleteBtn'));
    $tableBody.append($tr);
    if($('.ready_to_transfer:last').text() === 'N' ){
      $('.ready_to_transfer:last').append($('<button>').data('id', koalas[row].id).addClass('transfer-btn').text('Ready for Transfer')[0]);

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