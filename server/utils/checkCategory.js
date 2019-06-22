const yelpQuery = require("../routes/api/yelpQuery");
const bookQuery = require("../routes/api/bookHTTPQuery");
const omdbQuery = require("../routes/api/omdbQuery");

module.exports = {

  createCategory: (userInput) => {

    let isMovie = false;
    let isBook = false;
    let isFood = false;
    
    resultArray = [];
    let yelpResult;

    // yelpQuery: () => 
    yelpQuery.yelpQuery(userInput, (data) => {
      console.log('RETURN YelpValue: ', data);
      isFood = data.checkValue;
      console.log(isFood);
    });

    omdbQuery.searchMovie(userInput, (data) => {
      console.log('RETURN omdbValue: ', data);
      isMovie = data.checkValue;
      console.log(isMovie);         
    })

    bookQuery.bookQuery(userInput, (data) => {
      console.log('RETURN bookValue: ', data);
      isBook = data.checkValue;
      console.log(isBook);
    })






    
    // Category Evaluation



    //return "finished";

  }
}