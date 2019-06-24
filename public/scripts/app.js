
/* Client-side logic */

$(document).ready(() => {
  
  $('#updateCat').change(() => {
    let newCat = $("#updateCat option").val().change(); //not working
  });

  $("section").on('click', 'button', (event) => {
    //event.preventDefault();
    let elementItem =  event.currentTarget;
    let itemId = $(elementItem).attr('id');
    if ($(elementItem).hasClass('buttonDelete')) {
      $.ajax({
        method: 'POST',
        url: '/my-list/item/delete',
        data: {
          entryId: itemId
        },
        success: (response) => {
          $(`#article${itemId}`).remove();
        }
      });
    }      
  });

  $.ajax({
    method: 'GET',
    url: '/my-list/entries',
    success: (data) => {
      for (let item of data){
        let todo = item.item;
        let cat = item.category;
        let entryId = item.id;
        // Catch original input seeds
        if (cat === 'Restaurant') {
          cat = 'to-eat';
        } else if (cat === 'Movie') {
          cat = 'to-watch';
        } else if (cat === 'Book') {
          cat = 'to-read';
        }
      renderList(todo, cat, item.id);           
      }
    }
  });

  $('#formToDo').submit(ev => {
    ev.preventDefault();
    let newItem = $('#addToDo-text').val();
    // see newItem.js for escape fn
    let escapedInput = escape(newItem);
    $.ajax({
      method: 'POST',
      url: '/my-list',
      data: {
        userInput: escapedInput
      },
      success: (result) => {
        renderList(escapedInput, result.category, result.entryID);
        $('#formToDo').trigger('reset');
      }
    });
  });

});


