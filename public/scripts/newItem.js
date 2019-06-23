
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
        <i class="fa fa-trash"></i>
      </article>`

  //TODO - remove this temp list once new item adding to category
  let $item = $('<span>').append($newListItem);
  $(`#${category}`).append($item);
}
s