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
    //If empty array returned from API
    console.log(data)
    if(!data.length){
      this.pageBody.clearPage()
      this.pageBody.displayError("Kanji not found in API", this.searchedKanji)
      this.searchForm.disableForm(false)
      return
    }
    this.pageBody.clearPage()
    for(let i = 0; i < data.length; i++){
      this.searchedKanji = data[i].kanji.character
      this.handleSecondSearch(this.searchedKanji)
    }
  }

  handleSearchError(error){
    console.error(error)
    this.searchForm.disableForm(false)
    this.pageBody.displayError("Kanji Alive is not Responding", this.searchedKanji)
  }

  //completes primary english-to-kanji search
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

  //handles second search for more information about kanji
  handleSecondSearch(searchedKanji){
    $.ajax({
      method: "GET",
      url: `https://kanjiapi.dev/v1/kanji/${searchedKanji}`,
      success: this.handleSecondSearchSuccess,
      error: this.handleSecondSearchError
    })
  }




}
