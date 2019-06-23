
/* Client-side logic */
$(document).ready(() => {

  $.ajax({
    method: "GET",
    url: "/user/list"
  }).done((data) => {
    console.log(data);

    // for (let item of data) {
    //   console.log(item);
    // }
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


