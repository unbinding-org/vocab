const parse = require('./scripts/loadVocab')

const uris = require('./context.jsonld')['@context']
uris.forEach((uri, i) => parse(uri, (err, triples) => {
  if (err) return console.error('oops', i, err)
  console.log('got', i)
}))