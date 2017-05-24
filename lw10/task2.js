const uncleFedor = {
  girl: true,
  age: 6,
  name: 'Дядя Федор',
  dog: {
    name: 'Sharic', //'Ball' если нельзя транслит
    height: 20,
    weight: 15
  }
};

const catObject = {
    name: 'Matroskyn',
    food: 'fish',
    drink: 'milk'
};

uncleFedor.cat = catObject;
console.log(uncleFedor);

catObject.name = 'Tom';  //Поменялось свойство в объекте cate, а этот объект лежит в дяде Федоре
console.log(uncleFedor);

