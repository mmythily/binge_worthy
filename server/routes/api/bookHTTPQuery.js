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
      console.log(booksArray);

      for (let bookObj of booksArray){
        titles.push(bookObj.volumeInfo.title);
      }
      console.log(titles);
      callback(titles);
    }


    const options = {
      hostname: url2,
      port: 443,
      path: '/',
      method: 'GET'
    };
    
    https.get(url, (res) => {
      //console.log('statusCode:', res.statusCode);
      //console.log('headers:', res.headers);
      //console.log(res.body);
      let rawData = "";
      
    res.on('data', (d) => {
      rawData += process.stdout.write(d);
      console.log("RAW: ", rawData);
      
      // let dataObject = JSON.parse(data);
      // console.log("OBJECT: ", dataObject.items)
      // //checkBookTitles(data.items);
    
    });
    res.on('end', () => {
      console.log(rawData);
    })
    }).on('error', (e) => {
      console.error(e);
    });


    // request
    //   .get(url2)
    //   .on('response', function(err, response, body) {
    //     console.log('ERROR: ', err)
    //     console.log(body);
    //     // console.log(response.statusCode) // 200
    //     // console.log(response.body);
    //     //console.log(response.headers['content-type']) // 'image/png'
    //     //checkBookTitles(response);
    //   });
    //   //.pipe(request.put('http://mysite.com/img.png'));




    

  }


}