'use strict';

let userInput = 'harry+potter';
let url = 'https://www.googleapis.com/books/v1/volumes?q=' + userInput + '&printType=books';

$.ajax({
  type: "GET",
  dataType: "json",
  url: url,
  success: function (data) {
    let jsonResult = $.parseJSON(data); 
    console.log(jsonResult)
  },
  error: function (data) {
    let jsonResult = $.parseJSON(data);
    console.log('error: ', jsonResult);
  }
});
