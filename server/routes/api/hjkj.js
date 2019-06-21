'use strict'; //can't use undeclared variables 

const omdb = new (require('omdbapi'))('9d1e34f3');
//let name = "godfather";

module.exports = {

  searchMovie: (userListInput, callback) => {
    omdb.search({
      search: userListInput
    }).then(res => {
      console.log(res[0].title);
    }).catch(console.error),

  }





}