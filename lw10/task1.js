let inputMessage = "Привет Даша Пока Привет";
const badWords = ["Привет", "Пока"];
let wordsNumbers = inputMessage.length;
function findBad() {
  while (wordsNumbers !== 0) {
    for (const badWord of badWords) {
      inputMessage = inputMessage.replace(badWord, "*".repeat(badWord.length));
    }
    wordsNumbers--;
  }
}
findBad();