
function escape(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function renderList(userInput, category, itemId) {
  
  //let $newListItem = $('<li>').text(userInput);
  let $newListItem = 
      `<article id='article${itemId}' class='card ${category}-item'>
        ${userInput}
          <button class="buttonDelete" id="${itemId}"><i class="fa fa-trash"></i></button>
          <label>Change List: </label>
          <select id="updateCat">
            <option selected="selected">--</option>
            <option value="to-watch">To Watch</option>
            <option value="to-eat">To Eat</option>
            <option value="to-read">To Read</option>
            <option value="to-buy">To Buy</option>
          </select>
        </article>`

  let $item = $('<span>').append($newListItem);
  $(`#${category}`).append($item);
}
