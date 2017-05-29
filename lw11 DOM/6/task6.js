function takeAttribute(elementName) {
  let element = document.getElementsByTagName(elementName);
  for (let i = 0; i < element.length; i++) {
      let attribute = element[i].getAttribute('src');
      console.log(attribute)
  }
}
takeAttribute('img');