const searchFormElement = document.querySelector("form")
const main = document.querySelector("main")
const header = document.querySelector("header")


const searchForm = new SearchForm(searchFormElement)
const pageBody = new PageBody(header, main)
const app = new App(searchForm, pageBody)

app.start()
