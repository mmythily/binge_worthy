const yelpQuery = require("../routes/api/yelpQuery");
const bookQuery = require("../routes/api/bookHTTPQuery");
// const imdbQuery = require();

module.exports = {

  createCategory: (userInput) => {
    

    resultArray = [];
    let yelpResult;


    yelpCall.yelpQuery(userInput, (data) => {
        console.log('RETURN Value: ', data);
        yelpResult = data;
        console.log(yelpResult);
    });

    
    // 




    return category;

  }
}