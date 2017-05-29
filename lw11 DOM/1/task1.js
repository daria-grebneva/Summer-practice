function showChilds() {
  for (let i = 0; i < document.body.children.length; i++)
  {
    console.log(document.body.children[i]);
  }
}

function showChildsWithId() {
  let productsList = document.getElementById("my_Products");
  console.log(productsList);
}

showChilds();
showChildsWithId();
