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
  }

  handleSearchSuccess(data){
    this.pageBody.clearPage()
    for(let i = 0; i < data.length; i++){
      this.searchedKanji = data[i]
      this.handleSecondSearch(this.searchedKanji)
    }
  }

  handleSearchError(error){
    console.error(error)
    console.log(error.responseJSON.error)
    this.searchForm.disableForm(false)
    this.pageBody.displayError(error.responseJSON.error)
  }

  searchKanji(searchKey){
    this.searchForm.disableForm(true)
    this.pageBody.setloading()
    this.searchedKanji = searchKey
    $.ajax({
      async: true,
      crossDomain: true,
      method: "GET",
      url: `http://localhost:3001/api/kanji/${searchKey}`,
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

  handleSecondSearch(searchedKanji){
    $.ajax({
      method: "GET",
      url: `https://kanjiapi.dev/v1/kanji/${searchedKanji}`,
      success: this.handleSecondSearchSuccess,
      error: this.handleSecondSearchError
    })
  }
}
