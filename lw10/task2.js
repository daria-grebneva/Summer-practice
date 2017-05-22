var uncleFedor = {
  girl: true,
  age: 6,
  name: 'Дядя Федор',
  dog: {
    name: 'Sharic', //'Ball' если нельзя транслит
    height: 20,
    weight: 15
  }
};

var catObject = {
  cat: {
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

extend(uncleFedor, catObject);
console.log(uncleFedor);

catObject.cate.name = 'Tom';  //Поменялось свойство в объекте cate, а этот объект лежит в дяде Федоре
console.log(uncleFedor);

