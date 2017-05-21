var message = prompt('Ваше сообщение:', 'Утром деньги - Вечером СтуЛья или брИллИаНТы');
var banWord = ['утром', 'вечером', 'бриллианты'];

function checkMessage(inputString) {
  var lowerStr = inputString.toLowerCase();
  var arr = lowerStr.split(' ');
  var newArr = [];
  var ln1 = arr.length,
    ln2 = banWord.length;
  var j = 0;

  for (var i = 0; i < ln1; i++) {
    cache = arr[i];
    while (j < ln2) {
      if (cache === banWord[j]) {
        var starNumberArr = [];
        var lengthStar = cache.length;
        while (lengthStar != 0) {
          starNumberArr = starNumberArr + '*';
          lengthStar--;
        }
        var pushedStars = newArr.push(starNumberArr); //Добисать изменение на звездочки
        j++;
      } else {
        var pushed = newArr.push(cache);
      }
      break;
    }

  }
  console.log(newArr.join(' '));
}
checkMessage(message);

