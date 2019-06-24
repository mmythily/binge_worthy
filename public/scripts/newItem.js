
function escape(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function renderList(userInput, category, itemId) {
  
  //let $newListItem = $('<li>').text(userInput);
  let $newListItem = 
      `<article id='article${itemId}' class='card ${category}-item'>
        <span> ${userInput}</span>
        <div class='btn-toolbar' role='toolbar'>
        <div class="btn-group mr-2" role="group">
          <button class="buttonDelete btn bt-sm btn-secondary" id="${itemId}"><i class="fa fa-trash"></i></button>
          <select class='btn btn-sm btn-secondary' id="updateCat">
            <option selected="selected">move</option>
            <option value="to-watch" >----</option>
            <option value="to-watch">Watch</option>
            <option value="to-eat">Eat</option>
            <option value="to-read">Read</option>
            <option value="to-buy">Buy</option>
          </select>
        </div>
        </div>
      </article>`

  let $item = $('<span>').append($newListItem);
  $(`#${category}`).append($item);
}
