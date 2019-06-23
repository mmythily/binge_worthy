/* Client-side logic */
$(document).ready(() => {

  // $('#registerForm').submit(ev => {
  //   ev.preventDefault();
  //   console.log(ev);

  //   $(() => {
  //     $.ajax({
  //       method: "GET",
  //       url: "/api/registerUser"
  //     }).done(emails => {
  //       console.log(emails);
        
  //         // checkIfUserExists(users, (userData) => {
  //         //   console.log(userData);            
  //         // });
  //     });
  //   });
  // });


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