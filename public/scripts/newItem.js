function escape(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function renderList(userInput) {
  //let $newListItem = $('<li>').text(userInput);
  let $newListItem = 
      `<article class='card to-read-item'>
        ${userInput}
      </article>`

  //TODO - remove this temp list once new item adding to category
  let $temporaryList = $('<span>').append($newListItem);
  $('#to-read').append($temporaryList);
  
}