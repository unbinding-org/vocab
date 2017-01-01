const choo = require('choo')
const html = require('choo/html')

function dashboard (state, prev, send) {
  console.log(state)
  return html`
    <main>
      <h1>unbinding vocab</h1>
      <form>
        <h2>add relationship</h2>
        <span>subject</span><input name="subject" type="text">
        <span>predicate</span><select name="predicate"></select>
        <span>object</span><input name="object" type="text">
        <button onclick=${save(relationship)}>save</button>
      </form>
      <form>
        <h2>create vertex</h2>
        <span>vertex</span><input name="vertex" type="text">
        <button onclick=${save(vertex)}>save</button>
      </form>
      <form>
        <h2>create predicate type</h2>
        <span>predicate type</span><input name="predicateType" type="text">
        <button onclick=${save(predicateType)}>save</button>
      </form>
      <hr>
      <h2>predicate types</h2>
      <ol>
        ${state.predicateTypes.map(t => html`<li>${t}</li>`)}
      </ol>
      <h2>vertexes</h2>
      <button onclick=${getVertexes}>get all vertexes</button>
      <ol>
        ${state.vertexes.map(t => html`<li>${JSON.stringify(t)}</li>`)}
      </ol>
    </main>
  `

  function getVertexes (e) {
    send('getVertexes', {})
  }

  function save (fn) {
    return e => {
      e.preventDefault()
      fn(e, (err, res) => {
        if (err) return console.error('oops', err)

        console.log('saved', res)
      })
    }
  }

  function relationship (e, cb) {
    const triple = {
      subject: e.target.form.subject.value,
      predicate: e.target.form.predicate.value,
      object: e.target.form.object.value
    }

    send('dbPut', triple, cb)
  }

  function vertex (e, cb) {
    const vertex = e.target.form.vertex.value

    send('dbPut', vertex, cb)

  }

  function predicateType (e, cb) {
    const predicate = e.target.form.predicateType.value

    send('dbPut', predicate, cb)
  }
}

const app = choo()

app.router(['/', dashboard])

const levelup = require('level-browserify')
const levelgraph = require('levelgraph')

const db = levelgraph(levelup('unbinding-vocab'))

db.get({}, (err, res) => {
  console.log('all=', res)
})

app.model({
  state: {
    predicateTypes: [],
    vertexes: []
  },
  reducers: {
    setVertexes: function (state, data) {
      console.log('setVertexes=', data)
      return {
        vertexes: data
      }
    }
  },
  effects: {
    dbPut: function (state, data, send, done) {
      console.log('dbput!', data)
      db.put(data, done)
    },
    getVertexes: function (state, data, send, done) {
      db.search({
        subject: "aac"
      }, (err, res) => {
        if (err) return console.error(err)
        send('setVertexes', res, done)
      })
    }
  }
})

const tree = app.start()

document.body.appendChild(tree)