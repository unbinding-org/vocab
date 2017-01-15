const rdfFetch = require('rdf-fetch')

module.exports = function (uri, cb) {
  rdfFetch(uri).then(res => cb(null, res)).catch(err => cb(err))
}