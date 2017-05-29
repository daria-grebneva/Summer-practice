const myPoem = ["Ах, как много на свете кошек, ", "Нам с тобой их не счесть никогда."];

function changeTitle(titleName) {
  let j = 0;
  let titleElem = document.getElementsByTagName(titleName);
  for (let i = 0; i < titleElem.length; i++) {
    titleElem[i].innerHTML = myPoem[j];
    j++;
  }
}

changeTitle('h2');
changeTitle('h1');
changeTitle('h3');