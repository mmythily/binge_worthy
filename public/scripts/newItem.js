
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
        


       
        <button class="buttonDelete" id="${itemId}">Delete</button>
       
          
          
          
        
        </article>`
        
        //<i class="fa fa-trash"></i>
  //TODO - remove this temp list once new item adding to category
  let $item = $('<span>').append($newListItem);
  $(`#${category}`).append($item);
}
