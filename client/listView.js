const html = require('choo/html')
let b = 0

module.exports = function (state, prev, send) {
  console.log(b)

  return html`
    <main>
      <h2>list</h2>
      <ul>
        ${state.terms.map(item => html`<li>${JSON.stringify(item)}</li>`)}
      </ul>
      <button onclick=${listTerms}>list terms</button>
      <hr>
      <h2>add a term</h2>
      <form>
        <span>id: </span> <input name="id" type="text"><br>
        <span>label: </span> <input name="label" type="text"><br>
        <span>comment: </span> <textarea name="comment" rows="2"></textarea><br>
        <button onclick=${add}>add</button>
      </form>
    </main>
  `
  function listTerms (e) {
    e.preventDefault()
    send('listTerms')
  }

  function add (e) {
    e.preventDefault()

    send('addTerm', {
      id: e.target.form.id.value,
      doc: {
        label: e.target.form.label.value,
        comment: e.target.form.comment.value
      }
    })
  }
}
