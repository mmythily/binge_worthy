'use strict'; //can't use undeclared variables 

const omdb = new (require('omdbapi'))('9d1e34f3');

module.exports = {

    searchMovie: (userListInput, callback) => {
        omdb.search({
            search: userListInput
        }).then(res => {
            console.log(res[0].title) ;
            callback(true);
        }).catch((err) => {
            console.log(err);
            callback(false);
        })
        //returnValue: true

    }
}