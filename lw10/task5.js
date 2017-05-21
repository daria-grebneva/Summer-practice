var calculator = {
  read: function () {
    this.one = +prompt('Введите первое значение', '');
    this.two = +prompt('Введите второе значение', '');
  },
  sum: function () {
    result = this.one + this.two;
  },
  mul: function () {
    result = this.one * this.two;
  },
  div: function () {
    if (this.two != 0) {
      result = this.one / this.two;
    }
    else {
      result = ('Делить на ноль нельзя');
    }
  },
  sub: function () {
    result = this.one - this.two;
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

