const http = require('http')
const parser = require('rdf-parser-n3')

const req = http.request('http://www.w3.org/2000/01/rdf-schema#', res => {
  let doc = []

  parser.parse(res, (err, triple) => {
    console.log(triple)
  })
})

req.end()