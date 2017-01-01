const choo = require('choo')
const html = require('choo/html')
const app = choo()

app.router(['/', require('./listView')])
app.model(require('./model'))

const tree = app.start()

document.body.appendChild(tree)