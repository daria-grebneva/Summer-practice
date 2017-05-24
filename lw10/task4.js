const calculator = {
  read: function () {
    calculator.one = +prompt('Введите первое значение', '');
    calculator.two = +prompt('Введите второе значение', '');
  },
  sum: function () {
    result = calculator.one + calculator.two;
  },

  mul: function () {
    result = calculator.one * calculator.two;
  },
  div: function () {
    if (calculator.two != 0) {
      result = calculator.one / calculator.two;
    }
    else {
      result = ('Делить на ноль нельзя');
    }
  },
  sub: function () {
    result = calculator.one - calculator.two;
  },
  getResult: function () {
    return result;
  }
}
calculator.read();
calculator.sum();
console.log(calculator.getResult());
calculator.mul();
console.log(calculator.getResult());
calculator.div();
console.log(calculator.getResult());
calculator.sub();
console.log(calculator.getResult());

