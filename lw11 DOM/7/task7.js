const poem = ["Ах, как много на свете кошек,", "Нам с тобой их не счесть никогда.", "Сердцу снится душистый горошек,",
  "И звенит голубая звезда.", "Наяву ли, в бреду иль спросонок,", "Только помню с далекого дня -",
  "На лежанке мурлыкал котенок,", "Безразлично смотря на меня.", "Я еще тогда был ребенок,", "Но под бабкину песню вскок",
  "Он бросался, как юный тигренок,", "На оброненный ею клубок."];
function makeListPoem() {
  let ul = document.createElement('ul');
  document.body.appendChild(ul);

  for (let i = 1; i < poem.length; i++) {
    if (!poem) {
      break;
    }
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(poem[i]));
    ul.appendChild(li);
    if (i % 5 == 0)  ul.appendChild(li).style.marginBottom = '50px';
  }

}

makeListPoem();
