//const yelpCall = require("./yelpQuery");
const bookQueryApi = require("./bookHTTPQuery");
const yelpCall = require("./yelpQuery")

yelpCall.yelpQuery('north of brooklyn', (res,data) => {
  console.log('RETURN Value: ', res.name);
  //console.log(data.checkValue);
});




// bookQueryApi.bookQuery('harry+potter', (data) => {
//   console.log('RETURN Value: ', data);
// });
