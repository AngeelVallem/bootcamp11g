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

let arrayTitles = ["Mentors", "HTML", "CSS", "JS", "ReactJS", "PROMEDIO", ""];

let table = document.createElement("table");
const printMentorsTable = () => {

  table.className = "table-bordered";

  let titlesRow = document.createElement("tr");

  arrayTitles.forEach((titles) => {
    let tableHeader = document.createElement("th");

    let tableText = document.createTextNode(titles);

    tableHeader.appendChild(tableText);

    titlesRow.appendChild(tableHeader);
  });
  table.appendChild(titlesRow);
  mentorsArray.forEach((el) => {
    let mentorRow = document.createElement("tr");

    let nameMentorTd = document.createElement("td");
    let mentorNameText = document.createTextNode(el.name);

    mentorRow.appendChild(nameMentorTd);
    nameMentorTd.appendChild(mentorNameText);

    table.appendChild(mentorRow);

    let avg = 0;

    el.scores.reduce((acc, cur) => {
      let scoreTd = document.createElement("td");
      let scoreText = document.createTextNode(cur.score);

      mentorRow.appendChild(scoreTd);
      scoreTd.appendChild(scoreText);

      cur.score < 9
        ? (scoreTd.className = "bg-warning")
        : (scoreTd.className = "bg-success");

      avg = acc + cur.score / el.scores.length;

      return avg;
    }, 0);

    let td = document.createElement("td");
    let txt = document.createTextNode(avg);

    mentorRow.appendChild(td);
    td.appendChild(txt);

    let button = document.createElement("button");
    let buttonTd = document.createElement("td");
    let buttonTxt = document.createTextNode("X");

    button.classList = "btn btn-danger";

    button.appendChild(buttonTxt);
    buttonTd.appendChild(button);
    mentorRow.appendChild(buttonTd);
  });

  document.body.appendChild(table);
  document.querySelectorAll("td button").forEach((button, i) => {
    button.addEventListener("click", () => {
      mentorsArray.splice(i, 1);

       
    while (table.lastElementChild) {
      table.removeChild( table.lastElementChild );
  }

      printMentorsTable();
    });
  });
};

printMentorsTable();



document.getElementById("save").addEventListener("click", () => {
  let name = document.getElementById("name")
let nameTxt = name.value

let html = document.getElementById("html")
let htmlTxt = html.value

let css = document.getElementById("css")
let cssTxt = css.value

let js = document.getElementById("js")
let jsTxt = js.value

let react = document.getElementById("react")
let reactTxt = react.value


let o = {
  name : nameTxt,
  scores :  [
    {
      signature: "HTML",
      score: htmlTxt,
    },
    {
      signature: "CSS",
      score: cssTxt,
    },
    {
      signature: "JS",
      score: jsTxt,
    },
    {
      signature: "ReactJS",
      score: reactTxt,
    },
  ]
}
  
  mentorsArray.push(o)

  while (table.lastElementChild) {
    table.removeChild( table.lastElementChild );
}

    printMentorsTable();


document.querySelectorAll("input").forEach(input => {
  input.value = ""
})

})