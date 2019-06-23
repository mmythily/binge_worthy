
/* Client-side logic */

$(document).ready(() => {
  
  $("button").click( (event) => {
    //event.preventDefault();
    console.log("button clicked");
  });

  $("#buttonSubmit").submit( (event) => {
    //event.preventDefault();
    console.log("submit clicked");
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


