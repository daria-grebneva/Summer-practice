function takeTitleNames(titleName) {
  let titleElem = document.getElementsByTagName(titleName);
  for (let i = 0; i < titleElem.length; i++)
  {
    console.log(titleElem[i].innerHTML);
  }
}
takeTitleNames('h1');
takeTitleNames('h2');
takeTitleNames('h3');
takeTitleNames('h4');
