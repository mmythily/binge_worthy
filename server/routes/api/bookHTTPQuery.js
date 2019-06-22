'use strict';

const request = require('request');
const https = require('https');

module.exports = {

  bookQuery: (userListInput, callback) => {
  
    let userInput = userListInput;
    let url = `https://www.googleapis.com/books/v1/volumes?q=${userInput}&printType=books&maxResults=10`;
    let url2 = `https://www.googleapis.com/books/v1/volumes?q=harry+potter`;

    let titles = [];


    function checkBookTitles(booksArray) {


      for (let bookObj of booksArray){
        titles.push(bookObj.volumeInfo.title);
      }
      //console.log(titles);
      callback(titles);
    }

    let chunks = [];
    let returnString;

    https.get(url, (res) => {
      
      res.setEncoding('utf8');

      res.on('data', (chunk) => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        returnString = chunks.join("");
        //callback(returnString);
        let returnObject = JSON.parse(returnString);
        //console.log(returnObject.items);
        checkBookTitles(returnObject.items);
      })


    })

  }
}