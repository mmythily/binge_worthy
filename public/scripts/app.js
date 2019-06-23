/* Client-side logic */
$(document).ready(() => {

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
      success: () => {
        renderList(escapedInput);
        $('#formToDo').trigger('reset');
      }
    });
  });

});