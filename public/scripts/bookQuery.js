

let userInput = 'harry+potter';
let url = 'https://www.googleapis.com/books/v1/volumes?q=' + userInput + '&printType=books';

request({
  url: url
}, function (error, response, body) {
  console.log(body)
});