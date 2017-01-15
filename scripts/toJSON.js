const rdf = require('rdf-ext')
const parser = require('rdf-parser-n3')
const serializer = require('rdf-serializer-jsonld')
const http = require('http')
const url = require('url')
const jsonld = require('jsonld')

if (!process.argv[2]) process.exit()

const context = {
  "rdf": {
    "@id": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "@type": "http://www.w3.org/2002/07/owl#Ontology",
    "dcmi:title": "The RDF Concepts Vocabulary (RDF)",
    "dcmi:description": "This is the RDF Schema for the RDF vocabulary terms in the RDF Namespace, defined in RDF 1.1 Concepts."
  },
  "dcmi": {
    "@id": "http://purl.org/dc/elements/1.1/"
  },
  "rdfs": {
    "@id": "http://www.w3.org/2000/01/rdf-schema#"
  },
  "owl": {
    "@id": "http://www.w3.org/2002/07/owl#"
  }
}

const addr = url.parse(process.argv[2])

http.get({host: addr.host, path: addr.path}, n3 =>
  parser.parse(n3, (err, graph) => {
    serializer.serialize(graph, (err, json) => {
        jsonld.compact(json, context, (err, compacted) => {
          process.stdout.write(JSON.stringify(compacted, null, 2))
        })

    })
  })
)

