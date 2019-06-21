/* Client-side logic */
'use strict';
$(document).ready(() => {

  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });


  $('#addToDo').submit(ev => {
    ev.preventDefault();
    let newItem = $('#addToDo-text').val();
    $.ajax({
      method: 'POST',
      url: '/my-list',
      data: {
        userInput: newItem
      },
      success: (event) => {
        console.log(event);
        
        renderList(event);
        $('#addToDo').trigger('reset');
      }
    });
  });


});
