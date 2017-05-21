const PLUS_OPERATOR = "+";
const MINUS_OPERATOR = "-";
const DIVISION_OPERATOR = "/";
const MULTIPLICATION_OPERATOR = "*";

function askDigit() {
  var value = prompt('Введите число', '');
  return +value;
}

function askOperatior() {
  var value = prompt('Введите знак операции', '');
  return value;
}

function calculate(operand1, operand2, operator) {
  var result = null;
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


var operand1 = askDigit();
var operator = askOperatior();
var operand2 = askDigit();

var result = calculate(operand1, operand2, operator);
if (result || (result == 0) && (operator == DIVISION_OPERATOR && operand1 == 0) || (result == 0) && (operator != DIVISION_OPERATOR)) {
  alert(operand1 + operator + operand2 + " = " + result);
}