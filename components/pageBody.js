class PageBody{
  constructor(main){
    this.main = main
    this.modifyPage = this.modifyPage.bind(this)
  }



  modifyPage(data){
    const mainKanji = this.main.querySelector("#kanji")
    mainKanji.textContent = data.kanji
    const kanjiTitle = this.main.querySelector("#kanji-title")
    kanjiTitle.textContent = data.meanings[0]
  }
}
