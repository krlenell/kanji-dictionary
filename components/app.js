class App{
  constructor(searchForm, pageBody){
    this.searchForm = searchForm
    this.pageBody = pageBody
    this.searchKanji = this.searchKanji.bind(this)
    this.handleGetSuccess = this.handleGetSuccess.bind(this)
    this.handleGetError = this.handleGetError.bind(this)
    this.lastKanji = null
  }

  start(){
    this.searchForm.onSubmit(this.searchKanji)
  }

  handleGetSuccess(data){
    console.log(data)
    this.pageBody.modifyPage(data)
  }

  handleGetError(error){
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
      success: this.handleGetSuccess,
      error: this.handleGetError
    })
  }

}
