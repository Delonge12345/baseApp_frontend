const fs = require('fs')
const stamp = new Date().toLocaleDateString()
fs.writeFileSync('./src/builddate.js', `export const STAMP = '${stamp}'`)
