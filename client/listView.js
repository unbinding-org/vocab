const html = require('choo/html')
let b = 0

module.exports = function (state, prev, send) {
  return html`
    <main>
      <h2>list</h2>
      <ul>
        ${state.terms.map(t => t.subject).map(item => html`<li>${JSON.stringify(item)}</li>`)}
      </ul>
      <button onclick=${e => send('listClasses')}>list classes</button>
      <hr>
      <h2>add a statement</h2>
      <form>
        <span>subject: </span> <input name="subject" type="text"><br>
        <span>predicate: </span> <input name="predicate" type="text"><br>
        <span>object: </span> <textarea name="object" rows="2"></textarea><br>
        <button onclick=${add}>add</button>
      </form>
    </main>
  `

  function add (e) {
    e.preventDefault()

    send('addStatement', {
      subject: e.target.form.subject.value,
      predicate: e.target.form.predicate.value,
      object: e.target.form.object.value
    })
  }
}
