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
    console.log(data)
    if(!data.length){
      this.pageBody.displayError("Kanji Not Found")
      return
    }
    this.pageBody.clearPage()
    for(let i = 0; i < data.length; i++){
      this.searchedKanji = data[i].kanji.character
      console.log("searchedKanji", this.searchedKanji)
      this.handleSecondSearch(this.searchedKanji)
    }
  }

  handleSearchError(error){
    console.error(error)
  }

  searchKanji(searchKey){
    $.ajax({
      async: true,
      crossDomain: true,
      method: "GET",
      url: `https://kanjialive-api.p.rapidapi.com/api/public/search/advanced/?kem=${searchKey}`,
      headers: {
        "x-rapidapi-host": "kanjialive-api.p.rapidapi.com",
        "x-rapidapi-key": "e5621e1b1cmshb91fb5e84b8bf97p17fb61jsn591afbc7b127"
      },
      success: this.handleSearchSuccess,
      error: this.handleSearchError
    })
  }

  handleSecondSearchSuccess(data){
    console.log(data)
    this.pageBody.modifyPage(data)
  }

  handleSecondSearchError(error){
    console.error(error)
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
