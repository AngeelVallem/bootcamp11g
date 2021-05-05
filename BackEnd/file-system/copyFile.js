const fs = require('fs')

fs.copyFile('creado.txt', 'copia_creado.txt',(err) => {
    console.log('copiado');
})