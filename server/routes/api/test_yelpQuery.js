const yelpCall = require("./yelpQuery");
const bookQueryApi = require("./bookHTTPQuery");

// yelpCall.yelpQuery('north of brooklyn', (data) => {
//   console.log('RETURN Value: ', data);
// });


bookQueryApi.bookQuery('harry+potter', (data) => {
  console.log('RETURN Value: ', data);
});