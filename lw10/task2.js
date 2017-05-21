var uncleFedor = {
  bool: false,
  int: 4,
  string: 20,
  dog: {
    name: 'Sharic', //'Ball' если нельзя транслит
    height: 20,
    weight: 15
  }
};

var cateObject = {
  cate: {
    name: 'Matroskyn',
    food: 'fish',
    drink: 'milk'
  }
};

function extend(obj1, obj2) {
  for (var key in obj2) {
    obj1[key] = obj2[key];
  }
  return obj1;
}

extend(uncleFedor, cateObject);
console.log(uncleFedor);

cateObject.cate.name = 'Tom';  //Поменялось свойство в объекте cate, а этот объект лежит в дяде Федоре
console.log(uncleFedor);

