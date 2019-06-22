const yelpQuery = require("../routes/api/yelpQuery");
const bookQuery = require("../routes/api/bookHTTPQuery");
const omdbQuery = require("../routes/api/omdbQuery");

module.exports = {

  createCategory: (userInput, callback) => {

    let isMovie = false;
    let isBook = false;
    let isFood = false;
    
    resultArray = [];
    let yelpResult;

    // yelpQuery: () => 

    let yelpApiPull = new Promise(function(resolve, reject) {
      yelpQuery.yelpQuery(userInput, (data) => {
        //console.log('RETURN YelpValue: ', data);
        isFood = data.checkValue;
        resolve(isFood);
      });
    }); 

    
    let omdbQueryApiPull = new Promise(function(resolve, reject) {
      omdbQuery.searchMovie(userInput, (data) => {
        //console.log('RETURN omdbValue: ', data);
        isMovie = data.checkValue;
        resolve(isMovie);         
      })
    });  

    let bookQueryApiPull = new Promise(function(resolve, reject) {
      bookQuery.bookQuery(userInput, (data) => {
        //console.log('RETURN bookValue: ', data);
        isBook = data.checkValue;
        resolve(isBook);
      })
    });



    yelpApiPull.then(function(valueYelp) {
      console.log('Yelp: ', valueYelp);
      isFood = valueYelp;
    }).then( () => {
      omdbQueryApiPull.then(function(valueOMDB) {
        console.log('OMDB: ', valueOMDB);
        isMovie = valueOMDB;
      })
    }).then ( () => {
      bookQueryApiPull.then(function(valueBook) {
        console.log('Book Value: ', valueBook);
        isBook = valueBook;
      })
    }).then ( () => {
      if (isFood === true) {
        return callback("Restaurant");
      } else if (isMovie === true) {
        return callback("Movie");
      } else if (isBook === true) {
        return callback("Book");
      } else {
        return callback("Buy?");
      }
    });

  }
}