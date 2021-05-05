const fs = require('fs')

const deleteFile = (file) => {
    fs.unlink(file, (err) => {
        if (err) throw err
        console.log(`deleted ${file}`);
    })
}