const vasya = { name: "Вася", age: 23 };
const masha = { name: "Маша", age: 18 };
const vovochka = { name: "Вовочка", age: 6 };
const people = [ vasya , masha , vovochka ];

people.sort(sortAge);
function sortAge(first, second) {
  return first.age - second.age;
}

for(let i = 0; i < people.length; i++) {
  console.log(people[i].name);
}