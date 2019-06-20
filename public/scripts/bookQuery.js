'use strict';
// query param will only return results of printType - BOOK
//! DELETE THIS HARD WIRE WHEN USING ACTUAL INPUT
let userInput = 'harry+potter';
let url = 'https://www.googleapis.com/books/v1/volumes?q=' + userInput + '&printType=books&maxResults=10';

let titles = [];

function checkBookTitles(booksArray) {
  for (let bookObj of booksArray){
    titles.push(bookObj.volumeInfo.title);
  }
  console.log(titles);
}

$.ajax({
  type: "GET",
  dataType: "json",
  url: url,
  success: function (data) {
    checkBookTitles(data.items);
    console.log(data);
  },
  error: function (data) {
    console.log('error: ', data);
  }
});

module.exports = titles;