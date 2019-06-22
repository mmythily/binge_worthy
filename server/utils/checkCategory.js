const yelpQuery = require("../routes/api/yelpQuery");
const bookQuery = require("../routes/api/bookHTTPQuery");
const omdbQuery = require("../routes/api/omdbQuery");

// module.exports = {

  const createCategory = (userInput, ) => {

    let isMovie = false;
    let isBook = false;
    let isFood = false;
    
    //resultArray = [];
    // let yelpResult;

    yelpQuery.yelpQuery(userInput, (data) => {
      // console.log('RETURN YelpValue: ', data);
      // isFood = data.checkValue;
      // console.log(isFood);
    });
    is

    omdbQuery.searchMovie(userInput, (data) => {
      //console.log(isMovie);
    })
    isMovie = true;

    bookQuery.bookQuery(userInput, (data) => {
      console.log('Return Book: ', data[0]);
      // isBook = data.checkValue;
      // console.log(isBook);
    })
    isBook = true;
  }

console.log(createCategory('harry potter'));