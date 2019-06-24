function updateCategory(article, target, callback) {
  console.log("update: ", article.id);
  console.log(article);
  
  let id = article.id
  let itemId = id.replace("article", "");

  console.log(itemId, target);

  $.ajax({
    method: 'POST',
    url: '/update', 
    data: {
      entryId: itemId,
      targetCategory: target
    },
    success: () => {
      callback("Update Complete");
    } 
  });

  
}







