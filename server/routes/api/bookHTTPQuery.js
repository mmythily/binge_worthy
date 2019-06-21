'use strict';

const request = require('request');

module.exports = {

  bookQuery: (userListInput, callback) => {
  
    let userInput = userListInput;
    let url = 'https://www.googleapis.com/books/v1/volumes?q=' + userInput + '&printType=books&maxResults=10';

    let titles = [];


    function checkBookTitles(booksArray) {
      for (let bookObj of booksArray){
        titles.push(bookObj.volumeInfo.title);
      }
      console.log(titles);
      callback(titles);
    }

    request
      .get(url)
      .on('response', function(response, body) {
        console.log(response.statusCode) // 200
        console.log(response.body);
        //console.log(response.headers['content-type']) // 'image/png'
        checkBookTitles(body.items);
      })
      .pipe(request.put('http://mysite.com/img.png'));




    

  }


}