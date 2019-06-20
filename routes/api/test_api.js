const yelpCall = require("./yelpQuery");

console.log(yelpCall);
let returnValue = yelpCall.yelpQuery(searchValue);
console.log(returnValue);


// function yelpQueryPromise(searchValue) {
//   return new Promise((resolve, reject) => {
//     let returnValue = yelpCall.yelpQuery(searchValue);
//     setTimeout(function() { 
//       console.log("waiting"); 
//       resolve(returnValue);
//     }, 4000);
//   })
// }

// let yelpDataPull1 = yelpQueryPromise('north of brooklyn');

// yelpDataPull1.then((data) => {
//   console.log('promised value: ', data);

// })