class App{
  constructor(searchForm, pageBody){
    this.searchForm = searchForm
    this.pageBody = pageBody
    this.searchKanji = this.searchKanji.bind(this)
    this.handleSearchSuccess = this.handleSearchSuccess.bind(this)
    this.handleSearchError = this.handleSearchError.bind(this)
    this.searchedKanji = null
    this.handleSecondSearchSuccess = this.handleSecondSearchSuccess.bind(this)
    this.handleSecondSearchError = this.handleSecondSearchError.bind(this)
  }

  start(){
    this.searchForm.onSubmit(this.searchKanji)
    this.searchForm.disableButton()
  }

  handleSearchSuccess(data){
    this.pageBody.clearPage()
    this.handleSecondSearch(data)

  }

  handleSearchError(error){
    this.searchForm.disableForm(false)
    this.pageBody.displayError(error.responseJSON.error, this.searchedKanji)
    console.error(error)
  }

  searchKanji(searchKey){
    this.searchForm.disableForm(true)
    this.pageBody.setloading()
    this.searchedKanji = searchKey
    $.ajax({
      async: true,
      crossDomain: true,
      method: "GET",
      url: `/api/kanji/${searchKey}`,
      success: this.handleSearchSuccess,
      error: this.handleSearchError
    })
  }

  handleSecondSearchSuccess(data){
    this.searchForm.disableForm(false)
    this.pageBody.modifyPage(data)
  }

  handleSecondSearchError(error){
    console.error(error)
    this.searchForm.disableForm(false)
    this.pageBody.displayError("KanjiAPI is not Responding", this.searchedKanji)
  }

  handleSecondSearch(data){
    const promises = data.map(kanji => {
      console.log('kanji', kanji)
      return fetch(`https://kanjiapi.dev/v1/kanji/${kanji}`
      , {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )})
    console.log("promises", promises)
    Promise.all(promises)
      .then(values => values.map((response)=> (response.json())))
      .then(console.log(data))
  }
}


// $.ajax({
//   method: "GET",
//   url: `https://kanjiapi.dev/v1/kanji/${this.searchedKanji}`,
//   success: this.handleSecondSearchSuccess,
//   error: this.handleSecondSearchError
// })
