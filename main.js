const searchFormElement = document.querySelector("form")
const main = document.querySelector("main")

const searchForm = new SearchForm(searchFormElement)
const pageBody = new PageBody(main)
const app = new App(searchForm, pageBody)

app.start()
