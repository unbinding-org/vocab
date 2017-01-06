const levelup = require('level')
const levelgraph = require('levelgraph')
const http = require('http')

const opts = { valueEncoding: 'json' }
const dict = levelup('./.db/unb-vocab-dict')
const relations = levelup('./.db/unb-vocab-relations', opts)
const graph = levelgraph(levelup('./.db/unb-vocab-graph'))

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })

  console.log(`${req.method} to ${req.url}`)

  switch (req.url) {
    case '/class':
      if (req.method === 'GET') {
        listClasses(res)
      }
      break
    case '/statement':
      if (req.method === 'POST') {
        addStatement(req, res)
      }
      break
    case '/terms':
      if (req.method === 'GET') {
        listTerms(res)
      }
      if (req.method === 'POST') {
        addTerm(req, res)
      }
      if (req.method === 'PUT') {
        putTerm(req, res)
      }
      break
    default:
      break
  }
})

server.listen(1337)

function listClasses (res) {
  const source = graph.getStream({predicate: 'type', object: 'class'})
  let results = []

  source.on('data', data => results.push(data))
  source.on('end', () => {
    console.log(results)
    res.write(JSON.stringify(results))
    res.end()
  })
}

function addStatement (req, res) {
  let body = ''

  req.on('data', chunk => {
    const str = chunk.toString('utf8')
    body += str
  })

  req.on('end', () => {
    console.log(body)
    body = JSON.parse(body)
    graph.put(body, err => {
      res.end()
    })
  })

}

function listTerms (res) {
  const source = dict.createKeyStream()
  let results = []

  source.on('data', data => results.push(data))
  source.on('end', () => {
    res.write(JSON.stringify(results))
    res.end()
  })
}

function addTerm (req, res) {
  let body = ''

  req.on('data', chunk => {
    const str = chunk.toString('utf8')
    body += str
  })

  req.on('end', () => {
    console.log(body)
    body = JSON.parse(body)
    dict.put(body.id, body.doc, err => {
      res.end()
    })
  })
}

function putTerm (source, dest) {
  dict.del(source.body.id, err => {
    dict.put(source.body.id, source.body.doc, err => {
      dest.end()
    })
  })
}