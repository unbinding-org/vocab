const levelup = require('level-browserify')
const levelgraph = require('levelgraph')
const http = require('xhr')

const opts = { valueEncoding: 'json' }
const dict = levelup('unb-vocab-dict', opts)
const relations = levelup('unb-vocab-relations', opts)
const graph = levelgraph(levelup('unb-vocab-graph'))

const baseUrl = 'http://localhost:1337'

module.exports = {
  state: {
    terms: []
  },
  reducers: {
    setTerms: function (state, data) {
      return {
        terms: data
      }
    }
  },
  effects: {
    addTerm: function (state, data, send, done) {
      http.post(`${baseUrl}/terms`, {
        body: JSON.stringify(data)
      }, (err, res) => {
        console.log(res)
      })
    },
    listTerms: function (state, data, send, done) {
      http.get(`${baseUrl}/terms`, (err, res) => {
        send('setTerms', JSON.parse(res.body), done)
      })
    }
  }
}