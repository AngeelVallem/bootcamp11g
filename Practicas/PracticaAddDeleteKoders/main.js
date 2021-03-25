let koders = [];

// Add Koders

console.log("Functions needs koders array");

function addKoders(koders) {
  let num = parseInt(prompt("¿Cuantos koders quieres agregar?"));

  for (let i = 0; i < num; i++) {
    let name = prompt(`Introduce el nombre del ${koders.length + 1}.- koder`);
    let lastName = prompt(`Introduce el apellido del ${koders.length + 1}.- koder`);

    koders.push(name + " " + lastName);
  }
  console.log(koders);
}

// delete random koders in koders array

function deleteRandomKoder(koders) {
  let randomItem = koders[Math.floor(Math.random() * koders.length - 1)];

  koders.splice(randomItem, 1);

  console.log(koders);
}
