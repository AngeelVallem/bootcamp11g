
    /*Descomentar los consoles.log para ver los resultados*/

let mentorsArray = [
  {
    name: "Israel Salinas Martinez",
    scores: [
      {
        signature: "HTML",
        score: 8,
      },
      {
        signature: "CSS",
        score: 10,
      },
      {
        signature: "JS",
        score: 8,
      },
      {
        signature: "ReactJS",
        score: 8,
      },
    ],
  },
  {
    name: "David Cermeño Moranchel",
    scores: [
      {
        signature: "HTML",
        score: 8,
      },
      {
        signature: "CSS",
        score: 7,
      },
      {
        signature: "JS",
        score: 10,
      },
      {
        signature: "ReactJS",
        score: 10,
      },
    ],
  },
  {
    name: "Charles Silva",
    scores: [
      {
        signature: "HTML",
        score: 9,
      },
      {
        signature: "CSS",
        score: 9,
      },
      {
        signature: "JS",
        score: 10,
      },
      {
        signature: "ReactJS",
        score: 9,
      },
    ],
  },
  {
    name: "Michael Villalba Sotelo",
    scores: [
      {
        signature: "HTML",
        score: 8,
      },
      {
        signature: "CSS",
        score: 10,
      },
      {
        signature: "JS",
        score: 9,
      },
      {
        signature: "ReactJS",
        score: 10,
      },
    ],
  },
];

/*
  usando mentorsArray, realizar lo siguiente:
  -Obtener el score promedio de cada materia( HTML, CSS, JS, ReactJS )
  -Obtener el promedio individual de cada mentor
  -Obtener un array de strings con la siguiente forma:
       "Mi nombre es {nombre} y mi promedio es de {promedio}"
  -Obtener la lista de mentores cuyo promedio sea mayor a 9.5 */

// 1.- score promedio por cada materia
const avegrageScore = (signature) => {
  let scores = [];
  mentorsArray.map((el) =>
    el.scores
      .filter((el) => el.signature === signature)
      .map((el) => el.score)
      .forEach((el) => {
        scores.push(el);
      })
  );
  let sum = scores.reduce((acc, curr) => {
    return acc + curr;
  });

  return `El promedio de ${signature} es de: ${sum / scores.length}`;
};

/*
console.log(avegrageScore("HTML"));
console.log(avegrageScore("CSS"));
console.log(avegrageScore("JS"));
console.log(avegrageScore("ReactJS"));
*/


// ################################################################################################################

// 2.- score promedio de cada mentor
const mentorAverageScore = (mentorName) => {
  let scores = [];
  mentorsArray
    .filter((el) => el.name === mentorName)
    .map((el) =>
      el.scores.map((el) => el.score).forEach((el) => scores.push(el))
    );

  let sumScores = scores.reduce((acc, curr) => {
    return acc + curr;
  });

  return `El promedio del mentor ${mentorName} es de: ${
    sumScores / scores.length
  }`;
};

/*
console.log(mentorAverageScore("Israel Salinas Martinez"));
console.log(mentorAverageScore("David Cermeño Moranchel"));
console.log(mentorAverageScore("Charles Silva"));
console.log(mentorAverageScore("Michael Villalba Sotelo"));
*/
// ################################################################################################################

// 3.- Array con la forma "Mi nombre es {nombre} y mi promedio es de {promedio}"

const  mArrayAverage = () =>{
    let mentorsArrayAverage = mentorsArray.map(
      (el) =>
        `Mi nombre es ${el.name} y mi promedio es de ${
          el.scores.map((el) => el.score).reduce((acc, cur) => acc + cur) /
          el.scores.length
        }`
    );
        return mentorsArrayAverage
}

// console.log(mArrayAverage());

// ################################################################################################################

// 4.- Lista de mentores cuyo promedio sea mayor a 9.5

let mentorsAverageGreaterThanNine = mentorsArray
  .filter(
    (el) =>
      el.scores.map((el) => el.score).reduce((acc, cur) => acc + cur) /
        el.scores.length >
      9.5
  )
  .map((el) => el.name).length  === 0 ? "No hay ningun mentor con el promedio mayor a 9.5" : mentorsArray
  .filter(
    (el) =>
      el.scores.map((el) => el.score).reduce((acc, cur) => acc + cur) /
        el.scores.length >
      9.5
  )
  .map((el) => el.name).forEach(el => console.log(el));

//console.log(mentorsAverageGreaterThanNine);
