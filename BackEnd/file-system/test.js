const fs = require( 'fs' )

const createFile = (file) => {
fs.writeFile(file,`nuevo: ${file}`, 'utf8',(err) => {
    console.log('created');
})
}

createFile('creado.txt')

