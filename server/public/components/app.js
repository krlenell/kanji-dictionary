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
    if (error.statusText === 'error' || error.statusText === 'timeout'){
      this.pageBody.displayConnectionErrors(error.statusText)
    }
    this.pageBody.displayError(error.responseJSON.error, this.searchedKanji)
    console.error(error)
  }

  searchKanji(searchKey){
    this.searchForm.disableForm(true)
    this.pageBody.setloading()
    this.searchedKanji = searchKey
    $.ajax({
      async: true,
      timeout: 5000,
      crossDomain: true,
      method: "GET",
      url: `/api/kanji/${searchKey}`,
      success: this.handleSearchSuccess,
      error: this.handleSearchError
    })
  }

  sortSecondSearches(data){
    if(data.error){
      this.handleSecondSearchError(data.error)
    } else {
      this.handleSecondSearchSuccess(data)
    }
  }

  handleSecondSearchSuccess(data){
    this.searchForm.disableForm(false)
    this.pageBody.modifyPage(data)
  }

  handleSecondSearchError(data){
    this.searchForm.disableForm(false)
    this.pageBody.displaySecondSearchError(data)
  }

  handleSecondSearchFail(error){
    this.searchForm.disableForm(false)
    console.error(error)
    this.pageBody.displayError(`All Kanji Alive searches failed due to: <br> ${error}`,
    this.searchedKanji)
  }

  handleSecondSearch(data){
    const promises = data.map(kanji => {
      return fetch(`/api/kanjiAlive/${kanji}`).then(res => res.json())
    })
    Promise.all(promises)
      .then(data => data.map((item) => this.sortSecondSearches(item)))
      .catch(error => this.handleSecondSearchFail(error))
  }
}
