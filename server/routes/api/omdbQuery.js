'use strict'; //can't use undeclared variables 

const omdb = new (require('omdbapi'))('9d1e34f3');


let title = "the blues brothers";

returnMovie = (title) => {
    omdb.search({
        search: title, 
    }).then(res => {
        return res[0].title;
    }).catch(console.error);
}

console.log(returnMovie(title));