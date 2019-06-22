const yelpCall = require("./yelpQuery");
const bookQueryApi = require("./bookHTTPQuery");
const omdbQuery = require("./omdbQuery");


// yelpCall.yelpQuery('north of brooklyn', (data) => {
//   console.log('RETURN Value: ', data);
// });

omdbQuery.searchMovie('godfather', (data) => {
  console.log('RETURN Value: ', data);
}); 


// bookQueryApi.bookQuery('harry+potter', (data) => {
//   console.log('RETURN Value: ', data);
// }); 