const fs  = require('fs')

fs.appendFile('creado.txt', 'append word' , (err) =>{
    console.log('append');
})