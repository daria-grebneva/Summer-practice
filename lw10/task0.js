function checkMessage(inputString) {
  var lowerStr = inputString.toLowerCase();
  if (!!(~lowerStr.indexOf('чёрт побери'))) {
    console.log("Подскользнулся, упал. Очнулся - гипс");
  } else {
    console.log("Я вас не понимаю")
  }
}

console.log(checkMessage('Да ЧЁРТ ПоБеРи еГо'));
console.log(checkMessage('Ла ла ла') );