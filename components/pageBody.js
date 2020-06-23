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

  getContent(data){
    const content =
    `<div class="row align-items-center flex-column">
      <h1 class="display-3" id="kanji">${data.kanji}</h1>
      <h3>${data.meaning[0]}</h3>
    </div>
      <div class="row justify-content-around">
        <p>Grade: ${data.grade}</p>
        <p>Strokes: ${data.stroke_count}</p>
        <p>Unicode: ${data.unicode}</p>
      </div>
      <div class="row">
        <div class="col-5">
          <h5>Other meanings:</h5>
          <p>${data.meanings.join(", ")}</p>
        </div>
        <div class="col-5">
          <h5><a target="_blank" href="https://en.wikipedia.org/wiki/Remembering_the_Kanji_and_Remembering_the_Hanzi">Heisig meaning: </a></h5>
          <p>${data.heisig_en}</p>
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
