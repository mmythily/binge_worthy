
/* Client-side logic */

$(document).ready(() => {

      $.ajax({
        method: 'GET',
        url: '/my-list/2',
        success: (data) => {
          console.log(data);
          
          for (let item of data){
            let todo = item.item;
            let cat = item.category;
              if (cat === 'Restaurant') {
                cat = 'to-eat';
              } else if (cat === 'Movie') {
                cat = 'to-watch';
              } else if (cat === 'Book') {
                cat = 'to-read';
              }
              renderList(todo, cat);           
            
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
        renderList(escapedInput, result.category);
        $('#formToDo').trigger('reset');
      }
    });
  });
});


