const PLUS_OPERATOR = "+";
const MINUS_OPERATOR = "-";
const DIVISION_OPERATOR = "/";
const MULTIPLICATION_OPERATOR = "*";

function askDigit() {
  let value = prompt('Введите число', '');
  return +value;
}

function askOperatior() {
  let value = prompt('Введите знак операции', '');
  return value;
}

function calculate(operand1, operand2, operator) {
  let result = null;
  if (operator == PLUS_OPERATOR) {
    result = operand1 + operand2;
  }
  else if (operator == MINUS_OPERATOR) {
    result = operand1 - operand2;
  }
  else if (operator == DIVISION_OPERATOR) {
    if (operand2 != 0) {
      result = operand1 / operand2;
    }
    else {
      alert('Делить на ноль нельзя');
    }
  }
  else if (operator == MULTIPLICATION_OPERATOR) {
    result = operand1 * operand2;
  }
  else {
    alert("Unknown operator" + operator);
  }
  return result;
}


const operand1 = askDigit();
const operator = askOperatior();
const operand2 = askDigit();

let result = calculate(operand1, operand2, operator);
if (!result || result) {
  alert(operand1 + operator + operand2 + " = " + result);
}