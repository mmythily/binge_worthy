
function escape(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function renderList(userInput, category) {
 
  
  //let $newListItem = $('<li>').text(userInput);
  let $newListItem = 
      `<article class='card ${category}-item'>
        ${userInput}
      </article>`

  //TODO - remove this temp list once new item adding to category
  let $temporaryList = $('<span>').append($newListItem);
  $(`#${category}`).append($temporaryList);
}



// // category

// function escape(str) {
//   let div = document.createElement('div');
//   div.appendChild(document.createTextNode(str));
//   return div.innerHTML;
// }

// function renderList(userInput) {
//   //let $newListItem = $('<li>').text(userInput);
//   let $newListItem = 
//       `<article class='card to-read-item'>
//         ${userInput}
//       </article>`;

//   checkCat.createCategory(userInput, (data) => {
//     console.log(data);
  
//     let $temporaryList = $('<span>').append($newListItem);
//     $(`#${data}`).append($temporaryList);
//   });

//   //TODO - remove this temp list once new item adding to category
//   // let $temporaryList = $('<span>').append($newListItem);
//   // $('#to-read').append($temporaryList);
  
// }

// let userInput = 'Starbucks'

// const category = checkCat.createCategory(userInput, (data) => {
//   console.log(data);
//   return data;
// });

// console.log(userInput)
// category

