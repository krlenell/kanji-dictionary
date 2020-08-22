const searchFormElement = document.querySelector("form")
const main = document.querySelector("main")
const header = document.querySelector("header")


const searchForm = new SearchForm(searchFormElement)
const pageBody = new PageBody(header, main)
const app = new App(searchForm, pageBody)

app.start()

fetch(`http://localhost:3001/api/kanji/house`)
  .then(result => result.json())
  .then(data => console.log(data))

fetch(`http://localhost:3001/api/test`)
  .then(result=> result.json())
  .then(data => console.log(data))
