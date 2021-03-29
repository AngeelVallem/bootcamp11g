
var  kodersList = [
    [
        "Fernanda",
        "Palacios Vera"
    ],
    [
        "jorge",
        "Ochoa"
    ],
    [
        "Naomi",
        "Puertos"
    ],
    [
        "Rurick",
        "Maqueo poissot"
    ]
]

var kodersNames= [];

for(let i= 0; i<kodersList.length;i++){
        let koderName = kodersList[i]
       kodersNames.push(koderName[0] + " " + koderName[1])
        
}

console.log(kodersNames);