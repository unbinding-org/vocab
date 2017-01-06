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
    addStatement: function (state, data, send, done) {
      http.post(`${baseUrl}/statement`, {
        body: JSON.stringify(data)
      }, (err, res) => {
        console.log(res)
      })
    },
    listClasses: function (state, data, send, done) {
      http.get(`${baseUrl}/class`, (err, res) => {
        send('setTerms', JSON.parse(res.body), done)
      })
    }
  },
  subscriptions: {
    init: (send, done) => {
      window.addEventListener('load', () => send('listClasses', done))
    }
  }
}