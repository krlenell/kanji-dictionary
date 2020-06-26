class PageBody{
  constructor(header, main){
    this.main = main
    this.header = header
    this.attribution = this.header.querySelector("p")
    this.modifyPage = this.modifyPage.bind(this)
    this.getContent = this.getContent.bind(this)
    this.displayError = this.displayError.bind(this)
    this.showAttribution = this.showAttribution.bind(this)
    this.hideAttribution = this.hideAttribution.bind(this)
    this.header.addEventListener("mouseover", this.showAttribution)
    this.header.addEventListener("mouseout", this.hideAttribution)

  }

  clearPage(){
    this.main.innerHTML = ""
  }


  showAttribution(){
    this.attribution.classList.remove("invisible")
  }

  hideAttribution(){
    this.attribution.classList.add("invisible")
  }

  setloading(){
    this.clearPage()
    this.main.insertAdjacentHTML('afterbegin',
    `<div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
    </div>
    </div>`)
  }

  modifyPage(data){
    this.main.insertAdjacentHTML('afterbegin', this.getContent(data))
  }

  displayError(error, lastSearch){
    this.clearPage()
    this.main.insertAdjacentHTML('afterBegin',
    `<h3 class="text-danger"> Error: ${error}.</h3>
    <h3>This app uses a limited public API.  Try searching
    <a target="_blank" href=https://jisho.org/search/${lastSearch}>Jisho</h3>`)
  }

  getContent(data){
    const dataJSON = JSON.stringify(data)
    const content =
      `<div class="row justify-content-center align-items-center">
        <div class="d-flex flex-column align-items-center">
          <h1 class="display-3" id="kanji">${data.kanji}</h1>
          <div class="d-flex align-items-center">
            <h3>${data.meanings[0]}</h3>
            <button class="btn d-inline btn-info btn-sm ml-2" data-kanjiData=${dataJSON}>
              <svg class="bi bi-heart-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-5">
          <h5>Other meanings:</h5>
          <p>${data.meanings.join(", ")}</p>
        </div>
        <div class="col-5">
          <h5><a target="_blank" href="https://en.wikipedia.org/wiki/Remembering_the_Kanji_and_Remembering_the_Hanzi">Heisig meaning: </a></h5>
          <p><a target="_blank" href="https://kanji.koohii.com/study/kanji/${data.heisig_en}"> ${data.heisig_en}</a></p>
        </div>
      </div>
      <div class="row">
        <div class="col-5">
          <h5>Kun (Japanese) Reading:</h5>
          <p>${data.kun_readings.join(", ")}</p>
        </div>
        <div class="col-5">
          <h5>On (Chinese) Reading:</h5>
          <p>${data.on_readings.join(", ")}</p>
        </div>
      </div>`
      return content
  }

}

// sample data
// grade: 6
// heisig_en: "timber-trees"
// jlpt: 1
// kanji: "樹"
// kun_readings: ["き"]
// meanings: (5)["timber", "trees", "wood", "establish", "set up"]
// name_readings: (9)["いつき", "うえ", "こ", "しげ", "じ", "たちき", "たつ", "たつる", "な"]
// on_readings: ["ジュ"]
// stroke_count: 16
// unicode: "6a39"
