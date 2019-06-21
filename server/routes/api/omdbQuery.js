'use strict'; //can't use undeclared variables 

const omdb = new (require('omdbapi'))('9d1e34f3');

module.exports = {
    returnName: omdb.search({
                search: name
            }).then(res => {
                console.log(res[0].title);
            }).catch(console.error),
    returnValue: true
}