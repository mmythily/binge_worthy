
/* Client-side logic */

$(document).ready(() => {
  
  $('#updateCat').change(() => {

    let newCat = $("#updateCat option").val().change();
      console.log(newCat);
  });

  $("section").on('click', 'button', (event) => {
    //event.preventDefault();
    // console.log(event.currentTarget);

    //console.log($(elementItem).attr('id'));
    let elementItem =  event.currentTarget;
    console.log(elementItem);
    
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

  //console.log($.cookie('user_id'));
      $.ajax({
        method: 'GET',
        url: '/my-list/entries',
        success: (data) => {
          console.log(data);
          
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
              // userInput, Category, item_id
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
        // userInput, Category, item_id
        renderList(escapedInput, result.category, result.entryID);
        $('#formToDo').trigger('reset');
      }
    });
  });

});


