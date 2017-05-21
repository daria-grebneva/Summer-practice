function Calculator() {
  this.read = function () {
    this.one = +prompt('Введите первое значение', '');
    this.two = +prompt('Введите второе значение', '');
  };
  this.sum = function () {
    result = this.one + this.two;
  };
  this.mul = function () {
    result = this.one * this.two;
  };
  this.div = function () {
    if (this.two != 0) {
      result = this.one / this.two;
    }
    else {
      result = ('Делить на ноль нельзя');
    }
  };
  this.sub = function () {
    result = this.one - this.two;
  };
  this.getResult = function () {
    return result;
  }
}

var calculateNumbers = new Calculator();
calculateNumbers.read();
calculateNumbers.sum();
console.log(calculateNumbers.getResult());
calculateNumbers.mul();
console.log(calculateNumbers.getResult());
calculateNumbers.div();
console.log(calculateNumbers.getResult());
calculateNumbers.sub();
console.log(calculateNumbers.getResult());

