$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();
  
    $email = $('#email-input').val();
    $password = $('#password-input').val();

    console.log("button pressed");
    console.log($('#email-input').val());
    if ($email === "" || $password === "") {
      return $('#login-error').html( "<p>*Submit a valid username and password</p>" ).addClass("red");
    }
  
    $.ajax({
      type: 'POST',
      url: "/login",
      data: {
        email: $email,
        password: $password
      },
      success: (response) => {
        console.log("Success");
        //console.log(response);
        window.location.href = response.redirect;
      },
      error: () => {
        $('#login-error').html( "<p>*Incorrect username or password</p>" ).addClass("red");
      }
    })


  });
});
