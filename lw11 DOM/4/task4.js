function changeColor(elementName) {
  let element = document.getElementsByTagName(elementName);
  for (let i = 1; i < element.length; i++) {
    if ((i % 3) === 0) {
      element[i].style.background = ('green');
    }
  }
}
changeColor('p');


