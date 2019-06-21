function escape(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function renderList(userInput) {
  let $newListItem = $('<li>').text(userInput);

  //TODO - remove this temp list once new item adding to category
  let $temporaryList = $('<ul>').append($newListItem);
  $('body').append($temporaryList);
  
}