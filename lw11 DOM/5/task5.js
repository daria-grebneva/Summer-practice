function changeColor(elementName) {
  let element = document.getElementsByTagName(elementName);
  for (let i = 1; i < element.length; i++) {
    if ((i % 4) === 0) {
      element[i].style.opacity = 0;
    }
  }
}
changeColor('p');
