/* Client-side logic */
$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
});

$(document).ready(() => {
  $('#formToDo').submit(ev => {
    ev.preventDefault();
    let newItem = $('#addToDo-text').val();
    $.ajax({
      method: 'POST',
      url: '/my-list',
      data: {
        userInput: newItem
      },
      success: () => {
        renderList(newItem);
        $('#formToDo').trigger('reset');
      }
    });
  });
});



