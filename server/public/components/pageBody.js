class PageBody{
  constructor(header, main){
    this.main = main
    this.header = header
    this.attribution = this.header.querySelector("p")
    this.modifyPage = this.modifyPage.bind(this)
    this.getContent = this.getContent.bind(this)
    this.displayError = this.displayError.bind(this)
    this.displayConnectionErrors = this.displayConnectionErrors.bind(this)
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

  displaySecondSearchError(lastSearch){
    this.main.insertAdjacentHTML('afterend',
    `
    <div class= "container">
      <div class="row justify-content-center align-items-center">
        <div class="border border-secondary mb-2 p-3">
          <p class="text-danger"> The Kanji "${lastSearch}" could not be found by KanjiAlive.</p>
          <p>This app is powered by Jisho. <br/> You can double check if your query exists
          here:
            <a target="_blank" href=https://jisho.org/search/${lastSearch}>Jisho</p>
        </div>
      </div>
    </div>
    `)
  }


  displayConnectionErrors(error) {
    this.clearPage()
    if(error === 'error'){
      this.main.insertAdjacentHTML('afterend',
        `
        <div class= "container">
          <div class="row justify-content-center align-items-center">
            <div class="border border-secondary mb-2 p-3">
              <p class="text-danger"> Kanji Dictionary could not communicate with the server</p>
              <p>Please check your connection and try again.</p>
            </div>
          </div>
        </div>
        `)
    }
    if(error === 'timeout'){
      this.main.insertAdjacentHTML('afterend',
      `
      <div class= "container">
        <div class="row justify-content-center align-items-center">
          <div class="border border-secondary mb-2 p-3">
            <p class="text-danger"> Kanji Dictionary could not connect with Jisho</p>
            <p>Please check your connection and try again.</p>
          </div>
        </div>
      </div>
      `)
    }

  }

  displayError(error, lastSearch){
    this.clearPage()
    this.main.insertAdjacentHTML('afterbegin',
    `
    <div class= "container">
      <div class="row justify-content-center align-items-center">
        <div class="border border-secondary p-3">
          <h4 class="text-danger"> Error: ${error}.</h4>
          <h4>This app is powered by Jisho. <br/> You can double check if your query exists
          here:
            <a target="_blank" href=https://jisho.org/search/${lastSearch}>Jisho</h4>
        </div>
      </div>
    </div>
    `
    )
  }

  getContent(data){
    const content =
      `<div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="d-flex flex-column align-items-center">
          <h1 class="display-3" id="kanji">${data.kanji}</h1>
          <div class="d-flex align-items-center">
            <h3>${data.meanings[0]}</h3>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-3">
          <h5>Other meanings:</h5>
          <p>${data.meanings.join(", ")}</p>
        </div>
        <div class="col-3 ml-3">
          <h5><a target="_blank" href="https://en.wikipedia.org/wiki/Remembering_the_Kanji_and_Remembering_the_Hanzi">Heisig meaning: </a></h5>
          <p><a target="_blank" href="https://kanji.koohii.com/study/kanji/${data.heisig_en}"> ${data.heisig_en}</a></p>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-3">
          <h5>Kun (Japanese) Reading:</h5>
          <p>${data.kun_readings.join(", ")}</p>
        </div>
        <div class="col-3 ml-3">
          <h5>On (Chinese) Reading:</h5>
          <p>${data.on_readings.join(", ")}</p>
        </div>
      </div>
      </div>`
      return content
  }

}
