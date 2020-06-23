class PageBody{
  constructor(main){
    this.main = main
    this.modifyPage = this.modifyPage.bind(this)
  }

  modifyPage(data){
    const mainKanji = this.main.querySelector("#kanji")
    mainKanji.textContent = data[0].kanji.character
  }
}
