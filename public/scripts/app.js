
/* Client-side logic */

$(document).ready(() => {
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    console.log(ev);
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    
  }
 
  $("section").on('click', 'button', (event) => {
    //event.preventDefault();
    console.log(event.currentTarget);
    console.log(event.delegateTarget);

    //console.log($(elementItem).attr('id'));
    let elementItem =  event.currentTarget;
    let itemId = $(elementItem).attr('id');
    
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
     



    // knex('lists')
    //   .where('id', itemId)
    //   .del()
    //   .then ( () => {
    //     $(`#article${itemId}`).remove();
    //   })
      

    


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


