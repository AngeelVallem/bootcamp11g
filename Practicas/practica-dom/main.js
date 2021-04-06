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

let arrayTitles = ["Mentors", "HTML", "CSS", "JS", "ReactJS", "PROMEDIO"];

const printMentorsTable = () => {
  let table = document.createElement("table");

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

      avg = acc + cur.score / el.scores.length;

      return avg;
    }, 0);

    let td = document.createElement("td");
    let txt = document.createTextNode(avg);

    mentorRow.appendChild(td);
    td.appendChild(txt);
  });

  document.body.appendChild(table);
};

printMentorsTable();
