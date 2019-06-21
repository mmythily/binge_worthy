//const yelpCall = require("./yelpQuery");
const bookQueryApi = require("./bookHTTPQuery");
const yelpCall = require("./yelpQuery")

yelpCall.yelpQuery('north of brooklyn', (data) => {
  console.log('RETURN Value: ', data);
  console.log(data.checkValue);
});




// bookQueryApi.bookQuery('harry+potter', (data) => {
//   console.log('RETURN Value: ', data);
// });
